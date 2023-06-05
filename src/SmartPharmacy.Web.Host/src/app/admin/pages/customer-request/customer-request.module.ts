import { NgModule } from "@angular/core";
import { CustomerRequestPage } from "./customer-request.component";
import { CustomerRequestPageRoutingModule } from "./customer-request-routing.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";

@NgModule({
  declarations: [CustomerRequestPage],
  imports: [
    AdminSharedModule,
    CustomerRequestPageRoutingModule,
    IconsProviderModule,
  ],
})
export class CustomerRequestPageModule {}
