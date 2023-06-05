import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { fnCheckForm } from "@app/utils/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "shared/auth/app-auth.service";

///<reference path="../../../../typings.d.ts"/>
@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styles: [
    `
      .login-form {
        width: 400px;
      }
      .login-form-password-margin {
        margin-bottom: -16px;
      }
      .login-form-margin {
        margin-bottom: 16px;
      }
      .login-form-forgot {
        float: right;
      }
      .login-form-button {
        width: 48%;
      }
      .signUp-form {
        width: 24%;
        margin-top: 410px;
        margin-left: -200px;
        margin-bottom: 141px;
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
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoginFormSubmitted: Boolean = false;
  usernameValue: string;

  submitForm(): void {
    if (!fnCheckForm(this.loginForm)) {
      return;
    }

    this.isLoginFormSubmitted = true;

    this._authService.authenticateModel.userNameOrEmailAddress =
      this.loginForm.value.userName;
    this._authService.authenticateModel.password =
      this.loginForm.value.password;
    this._authService.authenticate(() => (this.isLoginFormSubmitted = false));

    console.log(this._authService);
  }

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
