export class AdminRoutes {
  static readonly BasePath: "/admin/dashboard";
  static readonly Login: "/admin/login";
  static readonly AccessDenied: "/admin/access-denied";
  static readonly Dashboard: "dashboard";
  static readonly UserList = "user-list";
  /* params
  @param userId: int
  */
  static readonly UserManagePermissions = "/admin/user/manage-permission";
}
