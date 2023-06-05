import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { AppSessionService } from "shared/session/app-session-service";
import { AuthService } from "shared/auth/app-auth.service";

@Component({
  selector: "app-head-right-menu",
  templateUrl: "./head-right-menu.component.html",
  styleUrls: ["./head-right-menu.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadRightMenuComponent implements OnInit {
  loginName: string;

  constructor(
    private _authService: AuthService,
    private _sessionService: AppSessionService
  ) {}

  ngOnInit(): void {
    this.loginName = this._sessionService.getShownLoginName();
  }

  logout(): void {
    this._authService.logout(true);
  }
}
