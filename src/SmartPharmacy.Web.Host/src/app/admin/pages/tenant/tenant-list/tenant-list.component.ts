import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
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
  CreateTenantDto,
  EditionDto,
  EditionServiceProxy,
  NameValue,
  SetTenantFeatureDto,
  TenantDto,
  TenantDtoPagedResultDto,
  TenantServiceProxy,
} from "shared/service-proxies/service-proxies";

class PagedTenantRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean;
}

@Component({
  selector: "tenant-list",
  templateUrl: "./tenant-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantListPage
  extends PagedListingComponentBase<TenantDto>
  implements OnInit
{
  checked = true;
  isCreateTenantDrawerVisible: boolean = false;
  isFeatureManagementDrawerVisible: boolean = false;
  isTenantFormSaving: boolean = false;
  isManageFeatureFormSaving: boolean = false;
  tenantForm: FormGroup;
  featureForm: FormGroup;
  confirmModal?: NzModalRef;
  tenants = [];
  tenant = new TenantDto();
  searchKeyword: string;
  isActive: boolean;
  tenantId: number;
  tenantFeatures: NameValue[] = [];
  permissionsMap: { [key: string]: boolean } = {};

  constructor(
    private injector: Injector,
    private _modalService: NzModalService,
    private _messageService: NzMessageService,
    private _formBuilder: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _editionService: EditionServiceProxy,
    private _tenantService: TenantServiceProxy
  ) {
    super(injector);
  }

  openFeatureManagementDrawer(tenantId): void {
    this.isFeatureManagementDrawerVisible = true;
    this.tenantId = tenantId;
    this._tenantService.getFeatures(this.tenantId).subscribe((data) => {
      this.tenantFeatures = data;
      this.initManageFeatureForm();
    });
  }

  openCreateTenantDrawer(): void {
    this.isCreateTenantDrawerVisible = true;
  }

  closeCreateTenantDrawer(): void {
    this.isCreateTenantDrawerVisible = false;
    this.tenantForm.reset();
    this.isTenantFormSaving = false;
  }

  closeFeatureManagementDrawer(): void {
    this.isFeatureManagementDrawerVisible = false;
  }

  editionList: EditionDto[] = [];

  ngOnInit(): void {
    this.initForm();
    this.getDataPage(1);
    this.initManageFeatureForm();
    this._editionService
      .getAllList()
      .subscribe((data) => (this.editionList = data));
  }

  initForm(): void {
    this.tenantForm = this._formBuilder.group({
      id: [this.tenant.id],
      name: [this.tenant.name, Validators.required],
      tenancyName: [this.tenant.name, Validators.required],
      adminEmailAddress: new FormControl("bad@", Validators.email),
      edition: [null, Validators.required],
      isActive: [this.tenant.isActive],
    });
  }

  initManageFeatureForm(): void {
    var featuresFormGroupArray: FormGroup[] = [];

    Object.entries(this.tenantFeatures || {}).forEach(([key, value]) => {
      featuresFormGroupArray.push(
        this._formBuilder.group({
          name: value.name,
          value: value.value,
        })
      );
    });

    this.featureForm = this._formBuilder.group({
      tenantId: [this.tenantId],
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
    const setFeaturesDto = new SetTenantFeatureDto();
    setFeaturesDto.init(this.featureForm.value);
    this._tenantService
      .setFeature(setFeaturesDto)
      .subscribe((data) => console.log(data));

    this.isManageFeatureFormSaving = false;
    this.closeFeatureManagementDrawer();
    this._messageService.success(this.l("FeatureUpdatedSuccessfully"));
    this.refresh();
  }

  tenantFormSubmit(): void {
    if (!fnCheckForm(this.tenantForm)) {
      return;
    }
    this.isTenantFormSaving = true;
    if (!this.tenantForm.value.id) {
      this.createTenant();
    } else {
      this.update();
    }
  }

  showConfirm(tenantId): void {
    this.confirmModal = this._modalService.confirm({
      nzTitle: this.l("DoYouWantToDeleteThisTenant"),
      nzOkText: this.l("OK"),
      nzCancelText: this.l("Cancel"),
      nzOnOk: () => this.delete(tenantId),
    });
  }

  createTenant(): void {
    const tenant = new CreateTenantDto();
    tenant.init(this.tenantForm.value);

    this._tenantService.create(tenant).subscribe(
      () => {
        this.isTenantFormSaving = false;
        this.closeCreateTenantDrawer();
        this.tenantForm.reset();
        this._messageService.success(this.l("TenantCreatedSuccessfully"));
        this.delay(3000);
        window.location.reload();
      },
      (error) => {
        this._cdr.markForCheck();
        this.isTenantFormSaving = false;
        this.closeCreateTenantDrawer();
        this.tenantForm.reset();
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

  activeTenantOnlyChangeHandler(value: boolean) {
    this.isActive = value;
    this.refresh();
  }

  searchValue(event: KeyboardEvent) {
    this.searchKeyword = (event.target as HTMLInputElement).value;
    this.refresh();
  }

  list(
    request: PagedTenantRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.searchKeyword;
    request.isActive = this.isActive;
    this._tenantService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: TenantDtoPagedResultDto) => {
        this.tenants = result.items;
        console.log(this.tenants);
        this._cdr.markForCheck();
        this.showPaging(result, pageNumber);
      });
  }

  delete(tenantId): void {
    this._tenantService.delete(tenantId).subscribe(
      () => {
        this._messageService.error(this.l("TenantDeletedSuccessfully"));
        this.refresh();
      },
      (error) => {
        this._cdr.markForCheck();
      }
    );
  }

  editTenant(tenant: TenantDto): void {
    this.tenant = tenant;
    this.initForm();
    this.isCreateTenantDrawerVisible = true;
  }

  update(): void {
    const tenantDto = new TenantDto();
    tenantDto.init(this.tenantForm.value);
    this._tenantService.update(tenantDto).subscribe(
      () => {
        this._messageService.success(this.l("TenantUpdatedSuccessfully"));
        this.refresh();
        this.closeCreateTenantDrawer();
      },
      (error) => {
        this._cdr.markForCheck();
      }
    );
  }

  refreshTable() {
    this.refresh();
  }

  refreshPage() {
    window.location.reload();
  }

  onPageIndexChange($event) {
    //do something here to go to next page
  }
}
