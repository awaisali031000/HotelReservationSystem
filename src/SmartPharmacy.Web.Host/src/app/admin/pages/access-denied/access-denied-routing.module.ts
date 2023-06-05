import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccessDeniedPage } from "./access-denied.component";

const routes: Routes = [
  {
    path: "",
    component: AccessDeniedPage,
    data: { title: "AccessDeniedPage" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessDeniedPageRoutingModule {}
