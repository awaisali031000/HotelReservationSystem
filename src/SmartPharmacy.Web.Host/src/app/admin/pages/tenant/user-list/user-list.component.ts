import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NzModalRef } from "ng-zorro-antd/modal";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { finalize } from "rxjs";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";

import {
  RoleListDto,
  RoleServiceProxy,
  UserDto,
  UserDtoPagedResultDto,
  UserServiceProxy,
} from "shared/service-proxies/service-proxies";

class PagedUserRequestDto extends PagedRequestDto {
  keyword: string;
  tenantId: number;
  isActive: boolean;
}

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPage
  extends PagedListingComponentBase<UserDto>
  implements OnInit
{
  protected delete(entity: UserDto): void {
    throw new Error("Method not implemented.");
  }
  isUserFormSaving: boolean = false;
  userForm: FormGroup;
  confirmModal?: NzModalRef;
  users = [];
  user = new UserDto();
  searchKeyword: string;
  tenantId: number;

  constructor(
    private injector: Injector,
    private _cdr: ChangeDetectorRef,
    private _roleService: RoleServiceProxy,
    private _userService: UserServiceProxy,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    super(injector);
  }

  roleList: RoleListDto[] = [];

  ngOnInit(): void {
    this.getDataPage(1);
    this._roleService
      .getRoles("")
      .subscribe((data) => (this.roleList = data.items));

    this.tenantId = Number(this.route.snapshot.queryParamMap.get("tenantId"));
    if (this.tenantId <= 0) {
      this._router.navigate(["tenant-list"]);
    }

    console.log(this.tenantId);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.pageNumber = pageIndex;
    this.pageSize = pageSize;
    this.refresh();
  }

  isActive: boolean;

  activeUserOnlyChangeHandler(e) {
    if (e.target.checked) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
    this.refresh();
  }

  list(
    request: PagedUserRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.searchKeyword;
    request.tenantId = this.tenantId;
    request.isActive = this.isActive;
    this._userService
      .getAll(
        request.keyword,
        request.isActive,
        request.tenantId,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: UserDtoPagedResultDto) => {
        this.users = result.items;
        this._cdr.markForCheck();
        this.showPaging(result, pageNumber);
      });
  }

  refreshPage(): void {
    this.refresh();
  }

  onPageIndexChange($event) {
    //do something here to go to next page
  }
}
