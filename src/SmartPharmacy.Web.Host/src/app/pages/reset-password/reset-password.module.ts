import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzMessageService } from "ng-zorro-antd/message";
import { ResetPasswordPageRoutingModule } from "./reset-password-routing.module";
import { ResetPasswordPage } from "./reset-password.component";

@NgModule({
  declarations: [ResetPasswordPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ResetPasswordPageRoutingModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzCheckboxModule,
    NzCardModule,
    NzImageModule,
  ],
  exports: [ResetPasswordPage],
})
export class ResetPasswordPageModule {}
