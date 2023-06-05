import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RolePermissionPage } from "./role-permission.component";

const routes: Routes = [
  {
    path: "",
    component: RolePermissionPage,
    data: { title: "Role Permission" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolePermissionPageRoutingModule {}
