import { NgModule } from "@angular/core";
import { RoomPage } from "./room.component";
import { RoomPageRoutingModule } from "./room-routing.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";

@NgModule({
  declarations: [RoomPage],
  imports: [AdminSharedModule, RoomPageRoutingModule, IconsProviderModule],
})
export class RoomPageModule {}
