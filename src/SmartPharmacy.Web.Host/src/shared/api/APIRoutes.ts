import { Inject } from "@angular/core";
import { API_BASE_URL } from "shared/service-proxies/service-proxies";

export class APIRoutes {
  baseUrl: string;
  constructor(@Inject(API_BASE_URL) baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  get FileUploader_UploadImage() {
    return this.baseUrl + "/api/FileUploader/UploadImage";
  }
}
