import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RequestPage } from "./request.component";

const routes: Routes = [
  {
    path: "",
    component: RequestPage,
    data: { title: "Request" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestPageRoutingModule {}
