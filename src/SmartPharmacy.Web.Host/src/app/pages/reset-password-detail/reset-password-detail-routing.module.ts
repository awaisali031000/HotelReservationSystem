import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResetPasswordDetailPage } from "./reset-password-detail.component";

const routes: Routes = [
  {
    path: "",
    component: ResetPasswordDetailPage,
    data: { title: "Reset Password Detail" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordDetailPageRoutingModule {}
