import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Injector,
} from "@angular/core";
import { AppComponentBase } from "shared/app-component-base";
import { MenuItem } from "shared/layout/menu-item";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent extends AppComponentBase implements OnInit {
  @Input() isCollapsed: boolean = false;
  menuItems: abp.nav.IMenuItem[] = [];

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.menuItems = abp.nav.menus["MainMenu"].items;
  }
}
