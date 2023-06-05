import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdatePasswordPage } from "./update-password.component";

const routes: Routes = [
  {
    path: "",
    component: UpdatePasswordPage,
    data: { title: "Update Password" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePasswordPageRoutingModule {}
