import { NgModule } from "@angular/core";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { AccessDeniedPageRoutingModule } from "./access-denied-routing.module";
import { AccessDeniedPage } from "./access-denied.component";

@NgModule({
  declarations: [AccessDeniedPage],
  imports: [
    AdminSharedModule,
    IconsProviderModule,
    AccessDeniedPageRoutingModule,
  ],
})
export class AccessDeniedPageModule {}
