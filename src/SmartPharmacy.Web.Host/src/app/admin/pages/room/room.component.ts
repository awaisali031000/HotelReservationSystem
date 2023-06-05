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
  BrandDto,
  BrandDtoPagedResultDto,
  BrandServiceProxy,
  CreateBrandDto,
  CreateRoomDto,
  FileParameter,
  FileUploaderServiceProxy,
  RoomDto,
  RoomDtoPagedResultDto,
  RoomServiceProxy,
} from "shared/service-proxies/service-proxies";

class PagedRoomRequestDto extends PagedRequestDto {
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
  selector: "room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomPage
  extends PagedListingComponentBase<RoomDto>
  implements OnInit
{
  visible = false;
  isDrawerVisible: boolean = false;
  isRoomFormSaving: boolean = false;
  roomForm: FormGroup;
  confirmModal?: NzModalRef;
  rooms = [];
  room = new RoomDto();
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
        title: "Room",
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
    private _roomService: RoomServiceProxy,
    private _fileUploader: FileUploaderServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataPage(1);
  }

  initForm(): void {
    this.roomForm = this._formBuilder.group({
      id: [this.room.id],
      roomNumber: [this.room.roomNumber, Validators.required],
      roomName: [this.room.roomName, Validators.required],
      categoryName: [this.room.categoryName, Validators.required],
      price: [this.room.price, Validators.required],
      image: [this.room.image],
    });
  }

  roomFormSubmit(): void {
    if (!fnCheckForm(this.roomForm)) {
      return;
    }
    this.isRoomFormSaving = true;
    if (!this.roomForm.value.id) {
      this.createRoom();
    } else {
      this.update();
    }
  }

  showConfirm(roomId): void {
    this.confirmModal = this._modalService.confirm({
      nzTitle: this.l("DoYouWantToDeleteThisRoom"),
      nzOkText: this.l("OK"),
      nzCancelText: this.l("Cancel"),
      nzOnOk: () => this.delete(roomId),
    });
  }

  closeDrawer() {
    this.isDrawerVisible = false;
  }

  openDrawer() {
    this.isDrawerVisible = true;
  }

  createRoom(): void {
    const room = new CreateRoomDto();
    room.init(this.roomForm.value);

    this._roomService.create(room).subscribe(
      () => {
        this.isRoomFormSaving = false;
        this.isDrawerVisible = false;
        this.roomForm.reset();
        this._messageService.success(this.l("RoomCreatedSuccessfully"));
        this.refresh();
      },
      (error) => {
        this._cdr.markForCheck();
        this.isRoomFormSaving = false;
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
    request: PagedRoomRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.searchKeyword;
    this._roomService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: RoomDtoPagedResultDto) => {
        this.rooms = result.items;
        this._cdr.markForCheck();
        this.showPaging(result, pageNumber);
      });
  }

  delete(roomId): void {
    this._roomService.delete(roomId).subscribe(
      () => {
        this.roomForm.reset();
        this._messageService.error(this.l("RoomDeletedSuccessfully"));
        this.refresh();
      },
      (error) => {
        this._cdr.markForCheck();
      }
    );
  }

  editRoom(room: RoomDto): void {
    this.isDrawerVisible = true;
    this.roomForm.get("id").setValue(room.id);
    this.roomForm.get("roomNumber").setValue(room.roomNumber);
    this.roomForm.get("roomName").setValue(room.roomName);
    this.roomForm.get("categoryName").setValue(room.categoryName);
    this.roomForm.get("price").setValue(room.price);

    if (room.image) {
      this.fileList = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: room.image,
        },
      ];
    } else {
      this.fileList = [];
    }

    this.roomForm.get("image").setValue(this.fileList);
  }

  update(): void {
    const roomDto = new RoomDto();
    roomDto.init(this.roomForm.value);
    this._roomService.update(roomDto).subscribe(
      () => {
        this.isRoomFormSaving = false;
        this.isDrawerVisible = false;
        this.roomForm.reset();
        this._messageService.success(this.l("RoomUpdatedSuccessfully"));
        this.refresh();
        this.isDrawerVisible = false;
      },
      (error) => {
        this._cdr.markForCheck();
        this.isRoomFormSaving = false;
        this.isDrawerVisible = false;
        this.roomForm.reset();
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
      this.roomForm.get("image").setValue(file.response.result.url);
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

      this.roomForm.get("image").setValue(file.url);
      obs.next(false);
    });
}
