import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { Router } from "@angular/router";

export interface PageHeaderType {
  title: string;
  desc: string | TemplateRef<NzSafeAny>;
  extra: string | TemplateRef<NzSafeAny>;
  breadcrumb: { path: string; title: string }[];
}

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent implements OnInit {
  @Input() backTpl!: TemplateRef<NzSafeAny> | null;
  @Input() pageHeaderInfo: Partial<PageHeaderType> = {};
  @Input() backUrl = "";

  constructor(private router: Router) {}

  back(): void {
    this.router.navigateByUrl(this.backUrl);
  }

  ngOnInit(): void {}
}
