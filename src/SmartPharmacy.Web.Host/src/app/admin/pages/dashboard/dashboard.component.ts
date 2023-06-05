import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "shared/app-component-base";
import { tenant, user } from "./data";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardPage extends AppComponentBase implements OnInit {
  today = new Date();
  monthName: string;
  isVisible = false;
  tenant: any[];
  user: any[];
  view: any[] = [700, 320];

  // options

  colorScheme = {
    domain: ["#1890ff"],
  };
  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.monthName = this.today.toLocaleString("default", { month: "long" });
  }
}
