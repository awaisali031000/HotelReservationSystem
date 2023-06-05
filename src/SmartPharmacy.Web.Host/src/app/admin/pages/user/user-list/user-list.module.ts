import { NgModule } from "@angular/core";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { UserListPageRoutingModule } from "./user-list-routing.module";
import { UserListPage } from "./user-list.component";

@NgModule({
  declarations: [UserListPage],
  imports: [AdminSharedModule, IconsProviderModule, UserListPageRoutingModule],
})
export class UserListPageModule {}
