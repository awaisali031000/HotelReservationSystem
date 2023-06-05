import { NgModule } from "@angular/core";
import { RolePermissionPage } from "./role-permission.component";
import { RolePermissionPageRoutingModule } from "./role-permission-routing.module";
import { NzTreeModule } from "ng-zorro-antd/tree";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";

@NgModule({
  declarations: [RolePermissionPage],
  imports: [AdminSharedModule, RolePermissionPageRoutingModule, NzTreeModule],
})
export class RolePermissionPageModule {}
