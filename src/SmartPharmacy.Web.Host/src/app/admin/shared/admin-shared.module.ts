import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SHARED_ZORRO_MODULES } from "./shared-zorro.module";
import { SharedModule } from "shared/shared.module";

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ...SHARED_ZORRO_MODULES,
  SharedModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class AdminSharedModule {}
