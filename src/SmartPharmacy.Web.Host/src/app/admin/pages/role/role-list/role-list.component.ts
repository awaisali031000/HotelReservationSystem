import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  RoleServiceProxy,
  RoleDto,
  CreateRoleDto,
  RoleDtoPagedResultDto,
} from "shared/service-proxies/service-proxies";

class PagedRolesRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: "role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListPage
  extends PagedListingComponentBase<RoleDto>
  implements OnInit
{
  isDrawerVisible: boolean = false;
  isRoleFormSaving: boolean = false;
  roleForm: FormGroup;
  confirmModal?: NzModalRef;
  roles = [];
  role = new RoleDto();
  searchKeyword: string;
  permissionsMap: { [key: string]: boolean } = {};

  constructor(
    private injector: Injector,
    private _modalService: NzModalService,
    private _messageService: NzMessageService,
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _roleService: RoleServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataPage(1);
  }

  initForm(): void {
    this.roleForm = this._formBuilder.group({
      id: [this.role.id],
      displayName: [this.role.displayName, Validators.required],
      name: [this.role.name, Validators.required],
      grantedPermissions: [[]],
    });
  }

  roleFormSubmit(): void {
    if (!fnCheckForm(this.roleForm)) {
      return;
    }
    this.isRoleFormSaving = true;
    if (!this.roleForm.value.id) {
      this.createRole();
    } else {
      this.update();
    }
  }

  openDrawer(): void {
    this.isDrawerVisible = true;
  }

  closeDrawer(): void {
    this.isDrawerVisible = false;
    this.roleForm.reset();
    this.isRoleFormSaving = false;
  }

  showConfirm(roleId): void {
    this.confirmModal = this._modalService.confirm({
      nzTitle: this.l("DoYouWantToDeleteThisRole?"),
      nzOkText: this.l("OK"),
      nzCancelText: this.l("Cancel"),
      nzOnOk: () => this.delete(roleId),
    });
  }

  createRole(): void {
    const role = new CreateRoleDto();
    role.init(this.roleForm.value);

    this._roleService.create(role).subscribe(
      () => {
        this.isRoleFormSaving = false;
        this.closeDrawer();
        this.roleForm.reset();
        this._messageService.success(this.l("RoleCreatedSuccessfully"));
        this.delay(3000);
        window.location.reload();
      },
      (error) => {
        this._cdr.markForCheck();
        this.isRoleFormSaving = false;
        this.closeDrawer();
        this.roleForm.reset();
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
    request: PagedRolesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.searchKeyword;
    this._roleService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: RoleDtoPagedResultDto) => {
        this.roles = result.items;
        this._cdr.markForCheck();
        this.showPaging(result, pageNumber);
      });
  }

  delete(roleId): void {
    this._roleService.delete(roleId).subscribe(
      () => {
        this._messageService.success(this.l("RoleDeletedSuccessfully"));
        this.refresh();
      },
      (error) => {
        this._cdr.markForCheck();
      }
    );
  }

  editRole(role: RoleDto): void {
    this.role = role;
    this.initForm();
    this.isDrawerVisible = true;
  }

  update(): void {
    const roleDto = new RoleDto();
    roleDto.init(this.roleForm.value);
    this._roleService.update(roleDto).subscribe(
      () => {
        this._messageService.success(this.l("RoleUpdatedSuccessfully"));
        this.refresh();
        this.closeDrawer();
      },
      (error) => {
        this._cdr.markForCheck();
      }
    );
  }

  refreshPage(): void {
    this.refresh();
  }

  onPageIndexChange($event) {
    //do something here to go to next page
  }
}
