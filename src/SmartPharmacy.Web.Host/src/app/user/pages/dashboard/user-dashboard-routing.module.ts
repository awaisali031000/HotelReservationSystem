import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserDashboardPage } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: UserDashboardPage,
    data: { title: "User Dashboard" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardPageRoutingModule {}
