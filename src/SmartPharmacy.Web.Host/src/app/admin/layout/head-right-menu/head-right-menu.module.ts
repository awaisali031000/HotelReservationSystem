import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";
import { SHARED_ZORRO_MODULES } from "@app/admin/shared/shared-zorro.module";
import { HeadRightMenuComponent } from "./head-right-menu.component";

@NgModule({
  declarations: [HeadRightMenuComponent],
  imports: [
    CommonModule,
    SHARED_ZORRO_MODULES,
    IconsProviderModule,
    RouterModule,
  ],
  exports: [HeadRightMenuComponent],
})
export class HeadRightMenuModule {}
