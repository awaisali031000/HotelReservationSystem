import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzMessageModule } from "ng-zorro-antd/message";
import { UpdatePasswordPageRoutingModule } from "./update-password-routing.module";
import { UpdatePasswordPage } from "./update-password.component";

@NgModule({
  declarations: [UpdatePasswordPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UpdatePasswordPageRoutingModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzCheckboxModule,
    NzMessageModule,
    NzImageModule,
  ],
  exports: [UpdatePasswordPage],
})
export class UpdatePasswordPageModule {}
