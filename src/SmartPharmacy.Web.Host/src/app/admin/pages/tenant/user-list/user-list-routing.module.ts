import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListPage } from "./user-list.component";

const routes: Routes = [
  {
    path: "",
    component: UserListPage,
    data: { title: "User List" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListPageRoutingModule {}
