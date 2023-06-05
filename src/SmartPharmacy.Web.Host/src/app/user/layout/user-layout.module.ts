import { NgModule } from "@angular/core";
import { UserLayoutComponent } from "./user-layout.component";
import { UserLayoutRoutingModule } from "./user-layout-routing.module";
import { UserSharedModule } from "../shared/user-shared.module";
import { NzNoAnimationModule } from "ng-zorro-antd/core/no-animation";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { HeadRightMenuModule } from "./head-right-menu/head-right-menu.module";
import { IconsProviderModule } from "../shared/icons-provider.module";

@NgModule({
  declarations: [UserLayoutComponent, SideBarComponent, ToolBarComponent],
  imports: [
    UserLayoutRoutingModule,
    NzNoAnimationModule,
    IconsProviderModule,
    UserSharedModule,
    HeadRightMenuModule,
  ],
})
export class UserLayoutModule {}
