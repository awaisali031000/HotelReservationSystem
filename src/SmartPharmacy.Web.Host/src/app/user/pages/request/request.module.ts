import { NgModule } from "@angular/core";
import { RequestPage } from "./request.component";
import { RequestPageRoutingModule } from "./request-routing.module";
import { UserSharedModule } from "@app/user/shared/user-shared.module";
import { IconsProviderModule } from "@app/user/shared/icons-provider.module";

@NgModule({
  declarations: [RequestPage],
  imports: [UserSharedModule, RequestPageRoutingModule, IconsProviderModule],
})
export class RequestPageModule {}
