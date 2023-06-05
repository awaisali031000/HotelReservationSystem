using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Authorization
{
    public static class PermissionNames
    {
        public const string Permission = "Permission";

        public const string Dashboard = "Permission.Dashboard";

        public const string Reports = "Permission.Reports";

        public const string AuditLog = "Permission.AuditLog";

        //User Permissions

        public const string UserManagement = "Permission.UserManagement";
        public const string UserManagement_CreateUser = "Permission.UserManagement.CreateUser";
        public const string UserManagement_EditUser = "Permission.UserManagement.EditUser";
        public const string UserManagement_DeleteUser = "Permission.UserManagement.DeleteUser";
        public const string UserManagement_ManageUserPermissions = "Permission.UserManagement.ManageUserPermissions";
        public const string UserManagement_ImportDataThroughExcel = "Permissions.UserManagement.ImportDataThroughExcel";
    }
}
