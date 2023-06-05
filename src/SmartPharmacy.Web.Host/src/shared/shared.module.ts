import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "shared/auth/app-auth.service";
import { RouteGuard } from "shared/auth/auth-route-guard";

import { AppSessionService } from "shared/session/app-session-service";
import { LocalizePipe } from "./pipes/localize.pipe";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LocalizePipe],
  exports: [LocalizePipe],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AppSessionService, AuthService, RouteGuard],
    };
  }
}
