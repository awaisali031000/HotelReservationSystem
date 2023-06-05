import { Injectable } from "@angular/core";
import { PermissionCheckerService } from "abp-ng2-module";
import { AppSessionService } from "../session/app-session-service";

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from "@angular/router";

@Injectable()
export class RouteGuard implements CanActivate, CanActivateChild {
  constructor(
    private _permissionChecker: PermissionCheckerService,
    private _router: Router,
    private _sessionService: AppSessionService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this._sessionService.user) {
      this._router.navigate([this.getLoginUrl(route)]);
      return false;
    }

    if (!route.data || !route.data["permission"]) {
      return true;
    }

    if (this._permissionChecker.isGranted(route.data["permission"])) {
      return true;
    }

    this._router.navigate([this.getAccessDeniedUrl()]);
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  private getLoginUrl(route: ActivatedRouteSnapshot) {
    if (route.routeConfig.path?.includes("admin")) {
      return "/admin/login";
    }

    return "/login";
  }

  getAccessDeniedUrl() {
    if (this._sessionService.tenantId) {
      return "/access-denied";
    }
    return "/admin/access-denied";
  }
}
