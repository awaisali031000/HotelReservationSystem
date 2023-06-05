import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SHARED_ZORRO_MODULES } from "./shared-zorro.module";
import { PageHeaderModule } from "../layout/page-header/page-header.module";
import { AppSessionService } from "shared/session/app-session-service";
import { SharedModule } from "shared/shared.module";

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  PageHeaderModule,
  ...SHARED_ZORRO_MODULES,
  SharedModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class UserSharedModule {}
