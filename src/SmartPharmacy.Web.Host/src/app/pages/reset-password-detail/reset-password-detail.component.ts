import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { fnCheckForm } from "@app/utils/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "shared/auth/app-auth.service";
import {
  AccountServiceProxy,
  ResetPasswordInputDto,
} from "shared/service-proxies/service-proxies";

///<reference path="../../../../typings.d.ts"/>
@Component({
  selector: "reset-password-detail",
  templateUrl: "./reset-password-detail.component.html",
  styles: [
    `
      .reset-form {
        width: 400px;
      }
      .reset-form-margin {
        margin-bottom: 16px;
      }
      .reset-form-forgot {
        float: right;
      }
      .reset-form-button {
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
})
export class ResetPasswordDetailPage implements OnInit {
  resetForm: FormGroup;
  isResetFormSubmitted: Boolean = false;
  emailValue: string;
  resetPasswordInput: ResetPasswordInputDto;

  submitForm(): void {
    if (!fnCheckForm(this.resetForm)) {
      return;
    }
  }

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _accountService: AccountServiceProxy,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {}
}
