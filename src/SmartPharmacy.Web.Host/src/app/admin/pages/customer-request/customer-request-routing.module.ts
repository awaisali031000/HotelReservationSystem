import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerRequestPage } from "./customer-request.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerRequestPage,
    data: { title: "CustomerRequest" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRequestPageRoutingModule {}
