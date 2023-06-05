import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpPage } from "./sign-up.component";

const routes: Routes = [
  {
    path: "",
    component: SignUpPage,
    data: { title: "Sign Up" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpPageRoutingModule {}
