import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuditLogPage } from "./audit-log.component";

const routes: Routes = [
  {
    path: "",
    component: AuditLogPage,
    data: { title: "AuditLog" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditLogPageRoutingModule {}
