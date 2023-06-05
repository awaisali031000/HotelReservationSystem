import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QuicklinkStrategy } from "ngx-quicklink";
import { RouteGuard } from "../shared/auth/auth-route-guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [RouteGuard],
    loadChildren: () =>
      import("./user/layout/user-layout.module").then(
        (m) => m.UserLayoutModule
      ),
    data: {
      breadcrumb: "Dashboard",
    },
  },
  {
    path: "admin",
    canActivate: [RouteGuard],
    loadChildren: () =>
      import("./admin/layout/admin-layout.module").then(
        (m) => m.AdminLayoutModule
      ),
  },
  {
    path: "reset-password",
    loadChildren: () =>
      import("./pages/reset-password/reset-password.module").then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    path: "reset-password-detail",
    loadChildren: () =>
      import("./pages/reset-password-detail/reset-password-detail.module").then(
        (m) => m.ResetPasswordDetailPageModule
      ),
  },
  {
    path: "update-password",
    loadChildren: () =>
      import("./pages/update-password/update-password.module").then(
        (m) => m.UpdatePasswordPageModule
      ),
  },
  {
    path: "sign-up",
    loadChildren: () =>
      import("./pages/sign-up/sign-up.module").then((m) => m.SignUpPageModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
