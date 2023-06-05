import { NgModule } from "@angular/core";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { DashboardPageRoutingModule } from "@app/admin/pages/dashboard/dashboard-routing.module";
import { DashboardPage } from "./dashboard.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,
    IconsProviderModule,
    DashboardPageRoutingModule,
    NgxChartsModule,
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
