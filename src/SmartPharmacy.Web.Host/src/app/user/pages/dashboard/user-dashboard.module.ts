import { NgModule } from "@angular/core";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { UserDashboardPageRoutingModule } from "@app/user/pages/dashboard/user-dashboard-routing.module";
import { UserDashboardPage } from "./dashboard.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,
    IconsProviderModule,
    UserDashboardPageRoutingModule,
    NgxChartsModule,
  ],
  declarations: [UserDashboardPage],
})
export class UserDashboardPageModule {}
