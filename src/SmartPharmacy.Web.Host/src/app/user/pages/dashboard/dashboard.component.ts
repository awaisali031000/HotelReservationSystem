import { ChangeDetectorRef, Component, Injector, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { PageHeaderType } from "@app/user/layout/page-header/page-header.component";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalService } from "ng-zorro-antd/modal";
import { AppComponentBase } from "shared/app-component-base";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";
import { RoleDto } from "shared/service-proxies/service-proxies";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
})
export class UserDashboardPage extends AppComponentBase implements OnInit {
  today = new Date();
  monthName: string;
  isVisible = false;
  view: any[] = [900, 320];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = this.l("Products");
  showYAxisLabel: boolean = true;
  yAxisLabel: string = this.l("Sales");

  colorScheme = {
    domain: ["#1890ff"],
  };
  constructor(
    private injector: Injector,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.monthName = this.today.toLocaleString("default", { month: "long" });
  }
}
