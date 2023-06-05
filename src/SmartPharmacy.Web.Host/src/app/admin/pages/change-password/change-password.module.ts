import { NgModule } from "@angular/core";
import { ChangePasswordPage } from "./change-password.component";
import { ChangePasswordPageRoutingModule } from "./change-password-routing.module";
import { AdminSharedModule } from "@app/admin/shared/admin-shared.module";
import { NzInputGroupComponent, NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";

@NgModule({
  declarations: [ChangePasswordPage],
  imports: [AdminSharedModule, ChangePasswordPageRoutingModule, NzIconModule],
})
export class ChangePasswordPageModule {}
