import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteGuard } from "../../../shared/auth/auth-route-guard";
import { AdminLayoutComponent } from "./admin-layout.component";

const routes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "dashboard",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/dashboard/dashboard.module").then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: "role-list",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/role/role-list/role-list.module").then(
            (m) => m.RoleListPageModule
          ),
      },
      {
        path: "tenant-list",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/tenant/tenant-list/tenant-list.module").then(
            (m) => m.TenantListPageModule
          ),
      },
      {
        path: "edition-list",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/edition/edition-list/edition-list.module").then(
            (m) => m.EditionListPageModule
          ),
      },
      {
        path: "user-list",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/user/user-list/user-list.module").then(
            (m) => m.UserListPageModule
          ),
      },
      {
        path: "audit-log",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/audit-log/audit-log.module").then(
            (m) => m.AuditLogPageModule
          ),
      },
      {
        path: "tenant-user-list",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/tenant/user-list/user-list.module").then(
            (m) => m.UserListPageModule
          ),
      },
      {
        path: "role-permission",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/role/role-permission/role-permission.module").then(
            (m) => m.RolePermissionPageModule
          ),
      },
      {
        path: "user-permission",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/user/user-permission/user-permission.module").then(
            (m) => m.UserPermissionPageModule
          ),
      },
      {
        path: "change-password",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/change-password/change-password.module").then(
            (m) => m.ChangePasswordPageModule
          ),
      },
      {
        path: "access-denied",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/access-denied/access-denied.module").then(
            (m) => m.AccessDeniedPageModule
          ),
      },
      {
        path: "room",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/room/room.module").then((m) => m.RoomPageModule),
      },
      {
        path: "branding",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/branding/branding.module").then(
            (m) => m.BrandingPageModule
          ),
      },
      {
        path: "customer-request",
        canActivate: [RouteGuard],
        loadChildren: () =>
          import("../pages/customer-request/customer-request.module").then(
            (m) => m.CustomerRequestPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
