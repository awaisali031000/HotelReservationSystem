import { NgModule } from "@angular/core";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { EditionListPageRoutingModule } from "./edition-list-routing.module";
import { EditionListPage } from "./edition-list.component";

@NgModule({
  declarations: [EditionListPage],
  imports: [
    AdminSharedModule,
    IconsProviderModule,
    EditionListPageRoutingModule,
  ],
})
export class EditionListPageModule {}
