import { NgModule } from "@angular/core";
import { BrandingPage } from "./branding.component";
import { BrandingPageRoutingModule } from "./branding-routing.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { IconsProviderModule } from "@app/admin/shared/icons-provider.module";

@NgModule({
  declarations: [BrandingPage],
  imports: [AdminSharedModule, BrandingPageRoutingModule, IconsProviderModule],
})
export class BrandingPageModule {}
