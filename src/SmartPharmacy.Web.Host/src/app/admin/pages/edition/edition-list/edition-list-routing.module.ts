import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditionListPage } from "./edition-list.component";

const routes: Routes = [
  {
    path: "",
    component: EditionListPage,
    data: {
      title: "Edition List",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditionListPageRoutingModule {}
