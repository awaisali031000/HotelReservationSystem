import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordPage } from "./change-password.component";

const routes: Routes = [
  {
    path: "",
    component: ChangePasswordPage,
    data: { title: "Change Password" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePasswordPageRoutingModule {}
