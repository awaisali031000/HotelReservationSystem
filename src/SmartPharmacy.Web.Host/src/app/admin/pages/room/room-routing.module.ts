import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoomPage } from "./room.component";

const routes: Routes = [
  {
    path: "",
    component: RoomPage,
    data: { title: "Room" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomPageRoutingModule {}
