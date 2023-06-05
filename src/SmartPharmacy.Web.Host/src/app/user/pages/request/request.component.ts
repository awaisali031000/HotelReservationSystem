import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  OnInit,
  Optional,
} from "@angular/core";
import * as XLSX from "xlsx";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PageHeaderType } from "@app/user/layout/page-header/page-header.component";
import { fnCheckForm } from "@app/utils/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { finalize, Observable, Observer } from "rxjs";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";

import {
  CreateRequestDto,
  FileParameter,
  FileUploaderServiceProxy,
  RequestDto,
  RequestDtoPagedResultDto,
  RequestServiceProxy,
  RoomDtoPagedResultDto,
  RoomServiceProxy,
} from "shared/service-proxies/service-proxies";

class PagedRequestRequestDto extends PagedRequestDto {
  keyword: string;
}

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

class PagedRoomRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: "request",
  templateUrl: "./request.component.html",
  styles: [
    `
      nz-table ::ng-deep .ant-table-tbody > tr > td {
        padding: 0.3rem;
        text-align: center;
      }
      nz-table ::ng-deep .ant-table-thead > tr > th {
        padding: 0.3rem;
        text-align: center;
      }
    `,
  ],
  styleUrls: ["./request.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestPage
  extends PagedListingComponentBase<RequestDto>
  implements OnInit
{
  protected delete(entity: RequestDto): void {
    throw new Error("Method not implemented.");
  }
  checked = false;
  loading = false;
  indeterminate = false;
  listOfCurrentPageData: readonly [] = [];
  setOfCheckedId = new Set<number>();

  visible = false;
  isDrawerVisible: boolean = false;
  isRequestFormSaving: boolean = false;
  requestForm: FormGroup;
  confirmModal?: NzModalRef;
  requests = [];
  rooms = [];
  request = new RequestDto();
  searchKeyword: string;
  file: NzUploadFile;
  fileList: NzUploadFile[] = [];
  permissionsMap: { [key: string]: boolean } = {};
  previewImage: string | undefined = "";
  previewVisible = false;
  pageHeaderInfo: Partial<PageHeaderType> = {
    breadcrumb: [
      {
        path: "dashboard",
        title: "Home",
      },
      {
        path: "/",
        title: "Request",
      },
    ],
  };

  fallback =
    "data:image/png;base64,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";

  constructor(
    private injector: Injector,
    private _modalService: NzModalService,
    private _messageService: NzMessageService,
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _requestService: RequestServiceProxy,
    private _fileUploader: FileUploaderServiceProxy,
    private _roomService: RoomServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataPage(1);

    var request = new PagedRoomRequestDto();
    request.maxResultCount = 5;
    this._roomService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .subscribe((result: RoomDtoPagedResultDto) => {
        this.rooms = result.items;
        this._cdr.markForCheck();
      });
  }

  initForm(): void {
    this.requestForm = this._formBuilder.group({
      id: [this.request.id],
      roomNumber: [this.request.roomNumber, Validators.required],
      roomName: [this.request.roomName],
      categoryName: [this.request.categoryName],
      price: [this.request.price],
    });
  }

  showConfirm(requestId): void {
    this.confirmModal = this._modalService.confirm({
      nzTitle: this.l("DoYouWantToDeleteThisRequest"),
      nzOkText: this.l("OK"),
      nzCancelText: this.l("Cancel"),
      nzOnOk: () => this.delete(requestId),
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.pageNumber = pageIndex;
    this.pageSize = pageSize;
    this.refresh();
  }

  searchValue(event: KeyboardEvent) {
    this.searchKeyword = (event.target as HTMLInputElement).value;
    this.refresh();
  }

  list(
    request: PagedRequestRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.searchKeyword;
    this._requestService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: RequestDtoPagedResultDto) => {
        this.requests = result.items;
        this._cdr.markForCheck();
        this.showPaging(result, pageNumber);
      });
  }

  refreshPage() {
    this.refresh();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly []): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;

    const requestData = this.rooms.filter((data) =>
      this.setOfCheckedId.has(data.id)
    );
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 10);

    const createRequestData = new CreateRequestDto();

    requestData.forEach((item) => {
      createRequestData.categoryName = item.categoryName;
      createRequestData.price = item.price;
      createRequestData.roomName = item.roomName;
      createRequestData.roomNumber = item.roomNumber;
    });

    console.log(createRequestData);

    this._requestService.create(createRequestData).subscribe(
      () => {
        this.loading = false;
        this._messageService.success(this.l("RequestCreatedSuccessfully"));
        window.location.reload();
      },
      (error) => {
        this._cdr.markForCheck();
        this.loading = false;
      }
    );
  }

  handleFileUpload(event: any) {
    console.log("Hello");
    const fileList = event.fileList;
    const file = fileList[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      console.log(data);
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("Hello");
      console.log(jsonData);
    };
    reader.readAsBinaryString(file.originFileObj);
  }
}
