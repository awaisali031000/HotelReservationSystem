import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditionListPage } from "./edition-list/edition-list.component";
const routes: Routes = [
  {
    path: "",
    component: EditionListPage,
    children: [
      {
        path: "edition/list",
        loadChildren: () =>
          import("./edition-list/edition-list.module").then(
            (m) => m.EditionListPageModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductRoutingModule {}
