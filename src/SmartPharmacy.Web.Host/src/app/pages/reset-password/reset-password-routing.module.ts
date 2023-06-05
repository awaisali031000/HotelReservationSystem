import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResetPasswordPage } from "./reset-password.component";

const routes: Routes = [
  {
    path: "",
    component: ResetPasswordPage,
    data: { title: "Reset Password" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordPageRoutingModule {}
