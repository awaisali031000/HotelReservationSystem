import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { fnCheckForm } from "@app/utils/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { finalize } from "rxjs";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";

import {
  CreateEditionDto,
  EditionDto,
  EditionDtoPagedResultDto,
  EditionServiceProxy,
  NameValue,
  SetFeatureDto,
} from "shared/service-proxies/service-proxies";

class PagedEditionRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: "edition-list",
  templateUrl: "./edition-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditionListPage
  extends PagedListingComponentBase<EditionDto>
  implements OnInit
{
  isCreateNewAdminEditionDrawerVisible1: boolean = false;
  isFeatureManagementDrawerVisible: boolean = false;
  isEditionFormSaving: boolean = false;
  isManageFeatureFormSaving: boolean = false;
  checked = true;
  editionForm: FormGroup;
  featureForm: FormGroup;
  confirmModal?: NzModalRef;
  editions = [];
  edition = new EditionDto();
  searchKeyword: string;
  editionId: number;
  editionFeatures: NameValue[] = [];
  permissionsMap: { [key: string]: boolean } = {};

  constructor(
    private injector: Injector,
    private _modalService: NzModalService,
    private _messageService: NzMessageService,
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _editionService: EditionServiceProxy
  ) {
    super(injector);
  }

  openFeatureManagementDrawer(editionId): void {
    this.isFeatureManagementDrawerVisible = true;
    this.editionId = editionId;
    this._editionService.getFeatures(this.editionId).subscribe((data) => {
      this.editionFeatures = data;
      this.initManageFeatureForm();
    });
  }

  openCreateNewAdminEditionDrawer(): void {
    this.isCreateNewAdminEditionDrawerVisible1 = true;
  }

  closeCreateNewAdminEditionDrawer(): void {
    this.isCreateNewAdminEditionDrawerVisible1 = false;
    this.editionForm.reset();
    this.isEditionFormSaving = false;
  }

  closeFeatureManagementDrawer(): void {
    this.isFeatureManagementDrawerVisible = false;
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataPage(1);
    this.initManageFeatureForm();
  }

  initForm(): void {
    this.editionForm = this._formBuilder.group({
      id: [this.edition.id],
      name: [this.edition.name, Validators.required],
      displayName: [this.edition.displayName, Validators.required],
    });
  }

  initManageFeatureForm(): void {
    var featuresFormGroupArray: FormGroup[] = [];

    Object.entries(this.editionFeatures || {}).forEach(([key, value]) => {
      featuresFormGroupArray.push(
        this._formBuilder.group({
          name: value.name,
          value: value.value,
        })
      );
    });

    this.featureForm = this._formBuilder.group({
      editionId: [this.editionId],
      features: this._formBuilder.array(featuresFormGroupArray),
    });
  }

  get featureFormControlItems() {
    return this.featureForm.controls["features"] as FormArray;
  }

  featureFormSubmit(): void {
    if (!fnCheckForm(this.featureForm)) {
      return;
    }
    this.isManageFeatureFormSaving = true;
    const setFeaturesDto = new SetFeatureDto();
    setFeaturesDto.init(this.featureForm.value);
    this._editionService
      .setFeatures(setFeaturesDto)
      .subscribe((data) => console.log(data));

    this.isManageFeatureFormSaving = false;
    this.closeFeatureManagementDrawer();
    this._messageService.success(this.l("FeatureUpadtedSuccessfully"));
    this.refresh();
  }

  editionFormSubmit(): void {
    if (!fnCheckForm(this.editionForm)) {
      return;
    }
    this.isEditionFormSaving = true;
    if (!this.editionForm.value.id) {
      this.createEdition();
    } else {
      this.update();
    }
  }

  showConfirm(editionId): void {
    this.confirmModal = this._modalService.confirm({
      nzTitle: this.l("DoYouWantToDeleteThisEdition"),
      nzOkText: this.l("OK"),
      nzCancelText: this.l("Cancel"),
      nzOnOk: () => this.delete(editionId),
    });
  }

  createEdition(): void {
    const edition = new CreateEditionDto();
    edition.init(this.editionForm.value);

    this._editionService.create(edition).subscribe(
      () => {
        this.isEditionFormSaving = false;
        this.closeCreateNewAdminEditionDrawer();
        this.editionForm.reset();
        this._messageService.success(this.l("EditionCreatedSuccessfully"));
        this.delay(3000);
        window.location.reload();
      },
      (error) => {
        this._cdr.markForCheck();
        this.isEditionFormSaving = false;
        this.closeCreateNewAdminEditionDrawer();
        this.editionForm.reset();
      }
    );
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
    request: PagedEditionRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.searchKeyword;
    this._editionService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: EditionDtoPagedResultDto) => {
        this.editions = result.items;
        this._cdr.markForCheck();
        this.showPaging(result, pageNumber);
      });
  }

  delete(editionId): void {
    this._editionService.delete(editionId).subscribe(
      () => {
        this._messageService.error(this.l("EditionDeletedSuccessfully"));
        this.refresh();
      },
      (error) => {
        this._cdr.markForCheck();
      }
    );
  }

  editEdition(edition: EditionDto): void {
    this.edition = edition;
    this.initForm();
    this.isCreateNewAdminEditionDrawerVisible1 = true;
  }

  update(): void {
    const editionDto = new EditionDto();
    editionDto.init(this.editionForm.value);
    console.log(this.editionForm.value);
    this._editionService.update(editionDto).subscribe(
      () => {
        this._messageService.success(this.l("EditionUpdatedSuccessfully"));
        this.refresh();
        this.closeCreateNewAdminEditionDrawer();
      },
      (error) => {
        this._cdr.markForCheck();
      }
    );
  }

  refreshPage(): void {
    this.refresh();
  }

  onPageIndexChange($event) {
    //do something here to go to next page
  }
}
