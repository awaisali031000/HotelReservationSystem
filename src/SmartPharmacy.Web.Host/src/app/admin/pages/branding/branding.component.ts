import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  OnInit,
  Optional,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PageHeaderType } from "@app/admin/layout/page-header/page-header.component";
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
  BrandingDto,
  BrandingDtoPagedResultDto,
  BrandingServiceProxy,
  CreateBrandingDto,
  FileParameter,
  FileUploaderServiceProxy,
} from "shared/service-proxies/service-proxies";

class PagedBrandingRequestDto extends PagedRequestDto {
  keyword: string;
}

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: "branding",
  templateUrl: "./branding.component.html",
  styleUrls: ["./branding.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandingPage
  extends PagedListingComponentBase<BrandingDto>
  implements OnInit
{
  visible = false;
  isDrawerVisible: boolean = false;
  isBrandingFormSaving: boolean = false;
  brandingForm: FormGroup;
  confirmModal?: NzModalRef;
  brandings = [];
  branding = new BrandingDto();
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
        title: "Branding",
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
    private _brandingService: BrandingServiceProxy,
    private _fileUploader: FileUploaderServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataPage(1);
  }

  initForm(): void {
    this.brandingForm = this._formBuilder.group({
      id: [this.branding.id],
      hotelName: [this.branding.hotelName, Validators.required],
      phoneNumber: [this.branding.phoneNumber],
      hotelAddress: [this.branding.hotelAddress],
      hotelDescription: [this.branding.hotelDescription],
      image: [this.branding.image],
    });
  }

  brandingFormSubmit(): void {
    if (!fnCheckForm(this.brandingForm)) {
      return;
    }
    this.isBrandingFormSaving = true;
    if (!this.brandingForm.value.id) {
      this.createBranding();
    } else {
      this.update();
    }
  }

  showConfirm(brandingId): void {
    this.confirmModal = this._modalService.confirm({
      nzTitle: this.l("DoYouWantToDeleteThisBranding"),
      nzOkText: this.l("OK"),
      nzCancelText: this.l("Cancel"),
      nzOnOk: () => this.delete(brandingId),
    });
  }

  closeDrawer() {
    this.isDrawerVisible = false;
  }

  openDrawer() {
    this.isDrawerVisible = true;
  }

  createBranding(): void {
    const branding = new CreateBrandingDto();
    branding.init(this.brandingForm.value);

    this._brandingService.create(branding).subscribe(
      () => {
        this.isBrandingFormSaving = false;
        this.isDrawerVisible = false;
        this.brandingForm.reset();
        this._messageService.success(this.l("BrandingCreatedSuccessfully"));
        this.refresh();
      },
      (error) => {
        this._cdr.markForCheck();
        this.isBrandingFormSaving = false;
      }
    );
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.pageNumber = pageIndex;
    this.pageSize = pageSize;
    this.refresh();
  }

  searchValue(event: any) {
    this.searchKeyword = event.target?.value;
    this.refresh();
  }

  list(
    request: PagedBrandingRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.searchKeyword;
    this._brandingService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: BrandingDtoPagedResultDto) => {
        this.brandings = result.items;
        this._cdr.markForCheck();
        this.showPaging(result, pageNumber);
      });
  }

  delete(brandingId): void {
    this._brandingService.delete(brandingId).subscribe(
      () => {
        this.brandingForm.reset();
        this._messageService.error(this.l("BrandingDeletedSuccessfully"));
        this.refresh();
      },
      (error) => {
        this._cdr.markForCheck();
      }
    );
  }

  editBranding(branding: BrandingDto): void {
    this.isDrawerVisible = true;
    this.brandingForm.get("id").setValue(branding.id);
    this.brandingForm.get("hotelName").setValue(branding.hotelName);
    this.brandingForm.get("phoneNumber").setValue(branding.phoneNumber);
    this.brandingForm.get("hotelAddress").setValue(branding.hotelAddress);
    this.brandingForm
      .get("hotelDescription")
      .setValue(branding.hotelDescription);

    if (branding.image) {
      this.fileList = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: branding.image,
        },
      ];
    } else {
      this.fileList = [];
    }

    this.brandingForm.get("image").setValue(this.fileList);
  }

  update(): void {
    const brandingDto = new BrandingDto();
    brandingDto.init(this.brandingForm.value);
    this._brandingService.update(brandingDto).subscribe(
      () => {
        this.isBrandingFormSaving = false;
        this.isDrawerVisible = false;
        this.brandingForm.reset();
        this._messageService.success(this.l("BrandingUpdatedSuccessfully"));
        this.refresh();
        this.isDrawerVisible = false;
      },
      (error) => {
        this._cdr.markForCheck();
        this.isBrandingFormSaving = false;
        this.isDrawerVisible = false;
        this.brandingForm.reset();
      }
    );
  }

  refreshPage() {
    this.refresh();
  }

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this._messageService.error("You can only upload JPG file!");
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this._messageService.error("Image must smaller than 2MB!");
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      this.file = file;
      observer.complete();
    });

  getFileUrl({ file }): void {
    const status = file.status;
    if (status === "done") {
      this.brandingForm.get("image").setValue(file.response.result.url);
    } else if (status === "error") {
      this._messageService.error(`${file.name} file upload failed.`);
    }
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  handleRemove = (file: any) =>
    new Observable<boolean>((obs) => {
      file.url = "";

      this.brandingForm.get("image").setValue(file.url);
      obs.next(false);
    });
}
