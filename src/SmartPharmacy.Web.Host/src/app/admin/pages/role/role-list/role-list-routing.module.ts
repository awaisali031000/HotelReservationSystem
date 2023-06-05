import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleListPage } from "./role-list.component";

const routes: Routes = [
  {
    path: "",
    component: RoleListPage,
    data: { title: "Role List" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleListPageRoutingModule {}
