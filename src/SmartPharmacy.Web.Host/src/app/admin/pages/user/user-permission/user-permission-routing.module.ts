import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserPermissionPage } from "./user-permission.component";

const routes: Routes = [
  {
    path: "",
    component: UserPermissionPage,
    data: { title: "User Permission" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPermissionPageRoutingModule {}
