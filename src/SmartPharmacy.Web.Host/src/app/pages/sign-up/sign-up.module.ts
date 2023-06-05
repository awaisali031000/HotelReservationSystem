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
import { NzSelectModule } from "ng-zorro-antd/select";
import { SignUpPageRoutingModule } from "./sign-up-routing.module";
import { SignUpPage } from "./sign-up.component";

@NgModule({
  declarations: [SignUpPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SignUpPageRoutingModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzCheckboxModule,
    NzImageModule,
  ],
  exports: [SignUpPage],
})
export class SignUpPageModule {}
