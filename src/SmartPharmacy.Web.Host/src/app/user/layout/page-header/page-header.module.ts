import { NgModule } from "@angular/core";
import { PageHeaderComponent } from "./page-header.component";
import { CommonModule } from "@angular/common";
import { NzOutletModule } from "ng-zorro-antd/core/outlet";
import { SHARED_ZORRO_MODULES } from "@app/user/shared/shared-zorro.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [CommonModule, SHARED_ZORRO_MODULES, NzOutletModule, RouterModule],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
