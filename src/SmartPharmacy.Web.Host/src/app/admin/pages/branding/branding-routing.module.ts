import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrandingPage } from "./branding.component";

const routes: Routes = [
  {
    path: "",
    component: BrandingPage,
    data: { title: "Branding" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandingPageRoutingModule {}
