import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { fnCheckForm } from "@app/utils/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { finalize } from "rxjs";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";

import {
  CreateUserDto,
  ResetPasswordDto,
  RoleListDto,
  RoleServiceProxy,
  UserDto,
  UserDtoPagedResultDto,
  UserServiceProxy,
} from "shared/service-proxies/service-proxies";

class PagedUserRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean;
  tenantId: number;
}

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPage
  extends PagedListingComponentBase<UserDto>
  implements OnInit
{
  showCreateOrEditUserDrawer: boolean = false;
  isUserFormSaving: boolean = false;
  searchKeyword: string;
  userForm: FormGroup;
  userId: number;
  confirmModal?: NzModalRef;
  userList: UserDto[] = [];
  roleList: RoleListDto[] = [];
  user = new UserDto();
  permissionsMap: { [key: string]: boolean } = {};

  isResetPasswordVisible: boolean = false;
  isResetPasswordFormSaving: boolean = false;
  resetPasswordForm: FormGroup;

  constructor(
    private _injector: Injector,
    private _modalService: NzModalService,
    private _messageService: NzMessageService,
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _roleService: RoleServiceProxy,
    private _userService: UserServiceProxy
  ) {
    super(_injector);
  }

  ngOnInit(): void {
    this.initUserForm();
    this.initresetPasswordForm();
    this.getDataPage(1);
    this._roleService
      .getRoles("")
      .subscribe((data) => (this.roleList = data.items));
  }

  initUserForm(): void {
    this.userForm = this._formBuilder.group({
      id: [this.user.id],
      name: [this.user.name, Validators.required],
      userName: [this.user.userName, Validators.required],
      emailAddress: new FormControl("bad@", Validators.email),
      surname: [this.user.surname, Validators.required],
      isActive: [this.user.isActive, Validators.required],
      password: ["", Validators.required],
      role: [this.user.roleNames, Validators.required],
      grantedPermissions: [[]],
    });
  }

  submitUserForm(): void {
    if (!fnCheckForm(this.userForm)) {
      return;
    }
    this.isUserFormSaving = true;
    if (!this.userForm.value.id) {
      this.createUser();
    } else {
      this.update();
    }
  }

  openCreateOrEditUserDrawer(): void {
    this.showCreateOrEditUserDrawer = true;
  }

  resetPassword(userId: number): void {
    this.isResetPasswordVisible = true;
    this.userId = userId;
  }

  closeCreateOrEditUserDrawer(): void {
    this.showCreateOrEditUserDrawer = false;
    this.userForm.reset();
    this.isUserFormSaving = false;
  }

  closeResetPasswordDrawer(): void {
    this.isResetPasswordVisible = false;
  }

  createUser(): void {
    const user = new CreateUserDto();
    user.init(this.userForm.value);

    this._userService.create(user).subscribe(
      () => {
        this.isUserFormSaving = false;
        this.closeCreateOrEditUserDrawer();
        this.userForm.reset();
        this._messageService.success(this.l("UserCreatedSuccessfully"));
        this.delay(3000);
        window.location.reload();
      },
      (error) => {
        this._cdr.markForCheck();
        this.isUserFormSaving = false;
        this.closeCreateOrEditUserDrawer();
        this.userForm.reset();
      }
    );
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.pageNumber = pageIndex;
    this.pageSize = pageSize;
    this.refresh();
  }

  searchValue(event: KeyboardEvent) {
    this.searchKeyword = (event.target as HTMLInputElement).value;
    this.refresh();
  }

  list(
    request: PagedUserRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.searchKeyword;
    this._userService
      .getAll(
        request.keyword,
        request.isActive,
        request.tenantId,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: UserDtoPagedResultDto) => {
        this.userList = result.items;
        this._cdr.markForCheck();
        this.showPaging(result, pageNumber);
      });
  }

  showDeleteConfirmModal(userId): void {
    this.confirmModal = this._modalService.warning({
      nzTitle: this.l("DoYouWantToDeleteThisUser"),
      nzOkText: this.l("OK"),
      nzCancelText: this.l("Cancel"),

      nzOnOk: () => {
        return this.delete(userId);
      },
    });
  }

  delete(userId): void {
    this._userService.delete(userId).subscribe(
      () => {
        this._messageService.error(this.l("UserDeletedSuccessfully"));
        this.refresh();
      },
      (error) => {
        this._cdr.markForCheck();
      }
    );
  }
  editUser(user: UserDto): void {
    this.user = user;
    this.initUserForm();
    this.showCreateOrEditUserDrawer = true;
    console.log(this.user);
  }

  update(): void {
    const userDto = new UserDto();
    userDto.init(this.userForm.value);
    this._userService.update(userDto).subscribe(
      () => {
        this.isUserFormSaving = false;
        this.closeCreateOrEditUserDrawer();
        this.userForm.reset();
        this._messageService.success(this.l("UserUpdatedSuccessfully"));
        this.refresh();
        this.closeCreateOrEditUserDrawer();
      },
      (error) => {
        this._cdr.markForCheck();
      }
    );
  }

  private initresetPasswordForm(): void {
    this.resetPasswordForm = this._formBuilder.group({
      userId: [null],
      adminPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [
        null,
        [Validators.required, this.confirmationValidator],
      ],
    });
  }

  resetPasswordFormSubmit(): void {
    if (!fnCheckForm(this.resetPasswordForm)) {
      return;
    }

    const resetPasswordDto = new ResetPasswordDto();

    resetPasswordDto.init(this.resetPasswordForm?.value);

    resetPasswordDto.userId = this.userId;

    console.log(resetPasswordDto);

    this._userService
      .resetPassword(resetPasswordDto)
      .subscribe((response) => console.log(response));
    this.resetPasswordForm.reset();
    this._messageService.success(this.l("PasswordChangedSuccessfully"));
    this.isResetPasswordFormSaving = false;
    this.closeResetPasswordDrawer();
    this.resetPasswordForm.reset();
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.resetPasswordForm.controls.confirmPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control?.value) {
      return { required: true };
    } else if (
      control?.value !== this.resetPasswordForm.controls.newPassword?.value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // [disabled]="!userForm.valid"
}
