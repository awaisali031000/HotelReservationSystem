import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IconsProviderModule } from "@app/user/shared/icons-provider.module";
import { UserSharedModule } from "@app/user/shared/user-shared.module";
import { HeadRightMenuComponent } from "./head-right-menu.component";

@NgModule({
  declarations: [HeadRightMenuComponent],
  imports: [UserSharedModule, IconsProviderModule, RouterModule],
  exports: [HeadRightMenuComponent],
})
export class HeadRightMenuModule {}
