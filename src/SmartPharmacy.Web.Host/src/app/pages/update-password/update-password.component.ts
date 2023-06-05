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
import { ActivatedRoute, Router } from "@angular/router";
import { PageHeaderType } from "@app/user/layout/page-header/page-header.component";
import { fnCheckForm } from "@app/utils/forms";
import { AppComponentBase } from "shared/app-component-base";
import {
  AccountServiceProxy,
  ChangePasswordDto,
  UpdatePasswordInputDto,
  UserServiceProxy,
} from "shared/service-proxies/service-proxies";

@Component({
  selector: "update-password",
  templateUrl: "./update-password.component.html",
  styles: [
    `
      .login-form {
        width: 400px;
      }
      .login-form-margin {
        margin-bottom: 16px;
      }
      .buttonCss {
        width: 100%;
      }
      .backgroundCss {
        /* background: #010041; */
        background: #23108f;
      }
      img {
        width: 330px;
        height: 65px;
        margin-top: 35px;
        margin-left: -35px;
      }
      .exploringCss {
        color: white;
        font-size: 22px;
        margin-left: 35px;
        margin-top: 130px;
      }
      .exploringContentCss {
        color: white;
        margin-left: 35px;
        margin-top: 30px;
      }
      .patentCss {
        color: white;
        margin-left: 35px;
        margin-top: 210px;
      }
      .legalCss {
        color: white;
        margin-top: 210px;
      }
      .privacyCss {
        color: white;
        margin-top: 210px;
      }
      .legalCss:hover {
        text-decoration: underline;
      }
      .privacyCss:hover {
        text-decoration: underline;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePasswordPage extends AppComponentBase implements OnInit {
  selectedValue = null;
  currentPasswordVisible = false;

  isUpdatePasswordFormSaving: boolean = false;
  currentPassword?: string;
  newPasswordVisible = false;
  newPassword?: string;
  userEmail: string;
  token: string;
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
        title: "Update Password",
      },
    ],
  };

  updatePasswordForm: FormGroup;

  constructor(
    private injector: Injector,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private _accountService: AccountServiceProxy,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();

    this.userEmail = String(this.route.snapshot.queryParamMap.get("userEmail"));
    this.token = String(this.route.snapshot.queryParamMap.get("token"));
  }

  private initForm(): void {
    this.updatePasswordForm = this.formBuilder.group({
      userEmail: [null],
      token: [null],
      newPassword: [null, Validators.required],
      confirmPassword: [
        null,
        [Validators.required, this.confirmationValidator],
      ],
    });
  }

  submitUpdatePasswordForm(): void {
    if (!fnCheckForm(this.updatePasswordForm)) {
      return;
    }

    const updatePasswordDto = new UpdatePasswordInputDto();

    updatePasswordDto.init(this.updatePasswordForm?.value);

    updatePasswordDto.userEmail = this.userEmail;
    updatePasswordDto.token = this.token;

    console.log(updatePasswordDto);

    this._accountService
      .updatePassword(updatePasswordDto)
      .subscribe((response) => console.log(response));

    this.isUpdatePasswordFormSaving = false;
    this.updatePasswordForm.reset();
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.updatePasswordForm.controls.confirmPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control?.value) {
      return { required: true };
    } else if (
      control?.value !== this.updatePasswordForm.controls.newPassword?.value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
