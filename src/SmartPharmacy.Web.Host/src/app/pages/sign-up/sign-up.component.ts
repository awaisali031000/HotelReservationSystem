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
  CreateTenantDto,
  EditionDto,
  EditionServiceProxy,
  TenantServiceProxy,
  UpdatePasswordInputDto,
  UserServiceProxy,
} from "shared/service-proxies/service-proxies";

@Component({
  selector: "sign-up",
  templateUrl: "./sign-up.component.html",
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
export class SignUpPage extends AppComponentBase implements OnInit {
  selectedValue = null;
  currentPasswordVisible = false;

  isSignUpFormSaving: boolean = false;
  currentPassword?: string;
  checked = true;
  newPasswordVisible = false;
  newPassword?: string;
  userEmail: string;
  editionList: EditionDto[] = [];
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

  signUpForm: FormGroup;

  constructor(
    private injector: Injector,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private _tenantService: TenantServiceProxy,
    private _editionService: EditionServiceProxy,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();

    this._editionService.getAllList().subscribe((data) => {
      this.editionList = data;
    });

    this.userEmail = String(this.route.snapshot.queryParamMap.get("userEmail"));
    this.token = String(this.route.snapshot.queryParamMap.get("token"));
  }

  private initForm(): void {
    this.signUpForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      tenancyName: [null, Validators.required],
      adminEmailAddress: [null, Validators.required],
      edition: [null, Validators.required],
      isActive: [null],
    });
  }

  submitSignUpForm(): void {
    if (!fnCheckForm(this.signUpForm)) {
      return;
    }

    const signUpDto = new CreateTenantDto();

    signUpDto.init(this.signUpForm?.value);

    console.log(signUpDto);

    this._tenantService
      .create(signUpDto)
      .subscribe((response) => console.log(response));

    this.isSignUpFormSaving = false;
    this.signUpForm.reset();
  }
}
