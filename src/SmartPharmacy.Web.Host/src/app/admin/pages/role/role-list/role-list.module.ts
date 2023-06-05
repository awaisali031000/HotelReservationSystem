import { NgModule } from "@angular/core";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { RoleListPageRoutingModule } from "./role-list-routing.module";
import { RoleListPage } from "./role-list.component";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [RoleListPage],
  imports: [
    AdminSharedModule,
    IconsProviderModule,
    RoleListPageRoutingModule,
    NgxPaginationModule,
  ],
})
export class RoleListPageModule {}
