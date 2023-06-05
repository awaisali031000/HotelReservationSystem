import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserLayoutComponent } from "./user-layout.component";

const routes: Routes = [
  {
    path: "",
    component: UserLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../pages/dashboard/user-dashboard.module").then(
            (m) => m.UserDashboardPageModule
          ),
      },
      {
        path: "user/dashboard",
        loadChildren: () =>
          import("../pages/dashboard/user-dashboard.module").then(
            (m) => m.UserDashboardPageModule
          ),
      },
      {
        path: "user/request-list",
        loadChildren: () =>
          import("../pages/request/request.module").then(
            (m) => m.RequestPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserLayoutRoutingModule {}
