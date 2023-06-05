import { NgModule } from "@angular/core";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { AuditLogPageRoutingModule } from "./audit-log-routing.module";
import { AuditLogPage } from "./audit-log.component";

@NgModule({
  declarations: [AuditLogPage],
  imports: [AdminSharedModule, IconsProviderModule, AuditLogPageRoutingModule],
})
export class AuditLogPageModule {}
