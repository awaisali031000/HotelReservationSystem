import { NgModule } from "@angular/core";
import { UserPermissionPage } from "./user-permission.component";
import { UserPermissionPageRoutingModule } from "./user-permission-routing.module";
import { NzTreeModule } from "ng-zorro-antd/tree";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";

@NgModule({
  declarations: [UserPermissionPage],
  imports: [AdminSharedModule, UserPermissionPageRoutingModule, NzTreeModule],
})
export class UserPermissionPageModule {}
