import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { PageHeaderType } from "@app/user/layout/page-header/page-header.component";
import { fnCheckForm } from "@app/utils/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalService } from "ng-zorro-antd/modal";
import { AppComponentBase } from "shared/app-component-base";
import {
  ChangePasswordDto,
  UserServiceProxy,
} from "shared/service-proxies/service-proxies";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordPage extends AppComponentBase implements OnInit {
  selectedValue = null;
  currentPasswordVisible = false;

  isChangePasswordFormSaving: boolean = false;
  currentPassword?: string;
  newPasswordVisible = false;
  newPassword?: string;
  confirmPasswordVisible = false;
  confirmPassword?: string;
  cardPadding = { padding: "20px 24px 8px" };
  pageHeaderInfo: Partial<PageHeaderType> = {
    breadcrumb: [
      {
        path: "/dashboard",
        title: "Home",
      },
      {
        path: "/",
        title: "Change Password",
      },
    ],
  };

  validateForm: FormGroup;

  constructor(
    private injector: Injector,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _messageService: NzMessageService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder,
    private _modalService: NzModalService,
    private _userService: UserServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.validateForm = this.formBuilder.group({
      currentPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [
        null,
        [Validators.required, this.confirmationValidator],
      ],
    });
  }

  submitForm(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }

    const changePasswordDto = new ChangePasswordDto();

    changePasswordDto.init(this.validateForm?.value);

    console.log(changePasswordDto);

    this._userService
      .changePassword(changePasswordDto)
      .subscribe((response) => console.log(response));

    this.isChangePasswordFormSaving = false;
    this.validateForm.reset();
    this._messageService.success(this.l("PasswordChangedSuccessfully"));
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.confirmPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control?.value) {
      return { required: true };
    } else if (
      control?.value !== this.validateForm.controls.newPassword?.value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
