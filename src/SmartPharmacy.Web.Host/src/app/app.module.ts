import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { QuicklinkModule } from "ngx-quicklink";
import { PasswordStrengthMeterModule } from "angular-password-strength-meter";
import { NZ_I18N, en_US } from "ng-zorro-antd/i18n";
import { ServiceProxyModule } from "shared/service-proxies/service-proxies.module";
import { AbpHttpInterceptor } from "abp-ng2-module";
import { AppInitializer } from "app-initializer";
import { API_BASE_URL } from "shared/service-proxies/service-proxies";
import { AppConsts } from "shared/AppConsts";
import { AppSessionService } from "shared/session/app-session-service";
import { SharedModule } from "shared/shared.module";

export function getCurrentLanguage(): string {
  if (abp.localization.currentLanguage.name) {
    return abp.localization.currentLanguage.name;
  }

  // todo: Waiting for https://github.com/angular/angular/issues/31465 to be fixed.
  return "en";
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PasswordStrengthMeterModule.forRoot(),
    QuicklinkModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule.forRoot(),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializer) => appInitializer.init(),
      deps: [AppInitializer],
      multi: true,
    },
    { provide: API_BASE_URL, useFactory: () => AppConsts.remoteServiceBaseUrl },
    {
      provide: LOCALE_ID,
      useFactory: getCurrentLanguage,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
