import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardPage } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardPage,
    data: { title: "Dashboard" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
