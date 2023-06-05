import { NgModule } from "@angular/core";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { TenantListPageRoutingModule } from "./tenant-list-routing.module";
import { TenantListPage } from "./tenant-list.component";

@NgModule({
  declarations: [TenantListPage],
  imports: [
    AdminSharedModule,
    IconsProviderModule,
    TenantListPageRoutingModule,
  ],
})
export class TenantListPageModule {}
