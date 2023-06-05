import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzInputModule } from "ng-zorro-antd/input";
import { LoginPageRoutingModule } from "./login-routing.module";
import { LoginPage } from "./login.component";

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoginPageRoutingModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzCheckboxModule,
    RouterModule,
    NzImageModule,
  ],
  exports: [LoginPage],
})
export class LoginPageModule {}
