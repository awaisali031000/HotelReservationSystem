import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserDashboardPage } from "./dashboard.component";
const routes: Routes = [
  {
    path: "",
    component: UserDashboardPage,
    children: [
      {
        path: "/dashboard",
        loadChildren: () =>
          import("../dashboard/user-dashboard.module").then(
            (m) => m.UserDashboardPageModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
