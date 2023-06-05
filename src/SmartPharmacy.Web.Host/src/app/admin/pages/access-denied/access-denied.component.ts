import { Component, Injector } from "@angular/core";
import { AppComponentBase } from "shared/app-component-base";

@Component({
  selector: "access-denied",
  templateUrl: "./access-denied.component.html",
  styleUrls: ["./access-denied.component.less"],
})
export class AccessDeniedPage extends AppComponentBase {
  constructor(private _injector: Injector) {
    super(_injector);
  }
}
