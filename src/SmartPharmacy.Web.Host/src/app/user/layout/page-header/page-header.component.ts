import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";

export interface PageHeaderType {
  breadcrumb: { path: string; title: string }[];
}

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent implements OnInit {
  @Input() pageHeaderInfo: Partial<PageHeaderType> = {};

  constructor() {}

  ngOnInit(): void {}
}
