import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from "./admin-layout.component";
import { AdminLayoutRoutingModule } from "./admin-layout-routing.module";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { NzNoAnimationModule } from "ng-zorro-antd/core/no-animation";
import { AdminSharedModule } from "../shared/admin-shared.module";
import { HeadRightMenuModule } from "./head-right-menu/head-right-menu.module";
import { IconsProviderModule } from "../shared/icons-provider.module";

@NgModule({
  declarations: [AdminLayoutComponent, SideBarComponent, ToolBarComponent],
  imports: [
    AdminLayoutRoutingModule,
    NzNoAnimationModule,
    AdminSharedModule,
    IconsProviderModule,
    HeadRightMenuModule,
  ],
})
export class AdminLayoutModule {}
