import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLayoutComponent implements OnInit {
  isCollapsed: boolean =false;
  constructor() { }

  ngOnInit(): void {
  }

}
