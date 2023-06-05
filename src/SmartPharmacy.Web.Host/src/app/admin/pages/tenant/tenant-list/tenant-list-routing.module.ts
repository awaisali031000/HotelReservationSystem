import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TenantListPage } from "./tenant-list.component";

const routes: Routes = [
  {
    path: "",
    component: TenantListPage,
    data: {
      title: "Tenant List",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantListPageRoutingModule {}
