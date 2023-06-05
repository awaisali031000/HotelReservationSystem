import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  Input,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { fnCheckForm } from "@app/utils/forms";
import { NzModalRef } from "ng-zorro-antd/modal";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { finalize } from "rxjs";
import {
  PagedListingComponentBase,
  PagedRequestDto,
  PagedResultDto,
} from "shared/paged-listing-component-base";

import {
  AuditLogServiceProxy,
  PagedAuditLogResultResponseDto,
} from "shared/service-proxies/service-proxies";

class PagedAuditLogRequestDto extends PagedRequestDto {
  keyword: string;
  tenantId: number;
  userId: number;
  exceptionOnly: boolean;
}

@Component({
  selector: "audit-log",
  templateUrl: "./audit-log.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditLogPage
  extends PagedListingComponentBase<PagedAuditLogResultResponseDto>
  implements OnInit
{
  protected delete(entity: PagedAuditLogResultResponseDto): void {
    throw new Error("Method not implemented.");
  }
  isDrawerVisible: boolean = false;
  isAuditLogFormSaving: boolean = false;
  auditLogForm: FormGroup;
  confirmModal?: NzModalRef;
  auditLogs = [];
  auditLog = new PagedAuditLogResultResponseDto();
  forTenant = new PagedAuditLogRequestDto();
  searchKeyword: string;
  tenantMode: number;
  userMode: number;
  @Input() data: number;

  constructor(
    private injector: Injector,
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _auditLogService: AuditLogServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataPage(1);

    this.tenantMode = Number(
      this.route.snapshot.queryParamMap.get(this.l("tenantId"))
    );
    this.userMode = Number(
      this.route.snapshot.queryParamMap.get(this.l("userId"))
    );
  }

  initForm(): void {
    this.auditLogForm = this._formBuilder.group({
      // id: [this.auditLog.id],
    });
  }

  categoryFormSubmit(): void {
    if (!fnCheckForm(this.auditLogForm)) {
      return;
    }
    this.isAuditLogFormSaving = true;
  }

  openDrawer(): void {
    this.isDrawerVisible = true;
  }

  closeDrawer(): void {
    this.isDrawerVisible = false;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.pageNumber = pageIndex;
    this.pageSize = pageSize;
    this.refresh();
  }

  exceptionOnlyAnswer: boolean;

  exceptionOnlyChangeHandler(e) {
    if (e.target.checked) {
      this.exceptionOnlyAnswer = true;
    } else {
      this.exceptionOnlyAnswer = false;
    }
    this.refresh();
  }

  list(
    request: PagedAuditLogRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.searchKeyword;
    request.exceptionOnly = this.exceptionOnlyAnswer;
    request.tenantId = this.tenantMode;
    request.userId = this.userMode;
    this._auditLogService
      .getAll(
        request.keyword,
        request.exceptionOnly,
        request.tenantId,
        request.userId,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDto) => {
        this.auditLogs = result.items;
        this._cdr.markForCheck();
        this.showPaging(result, pageNumber);
      });
  }

  showException(auditLog: PagedAuditLogResultResponseDto): void {
    this.isDrawerVisible = true;
    this.auditLog = auditLog;
  }

  refreshPage(): void {
    this.refresh();
  }

  onPageIndexChange($event) {
    //do something here to go to next page
  }
}
