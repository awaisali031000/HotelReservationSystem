using Abp.AppFactory.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SmartPharmacy.Models.FileUploader;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartPharmacy.Extensions;
using Microsoft.AspNetCore.Http;
using System.IO;
using Abp.Authorization;

namespace SmartPharmacy.Controllers
{
    [Route("api/[controller]/[action]")]
    [AbpAuthorize]
    public class FileUploaderController : SmartPharmacyControllerBase
    {
        private readonly IBlobStorage _blobStorage;
        private const string ImageContainer = "images";
        private const string DocumentContainer = "documents";

        public FileUploaderController(IBlobStorage blobStorage)
        {
            _blobStorage = blobStorage;
        }

        [HttpPost]
        public async Task<UploadImageOutputModel> UploadImage(UploadImageInputModel model)
        {

            string imageUrl = await _blobStorage.UploadAsync(
                ImageContainer,
                GenerateFileName(model.File),
                await model.File.GetBytes());
            return new UploadImageOutputModel()
            {
                Url = imageUrl
            };

        }

        private string GenerateFileName(IFormFile file)
        {
            return $"{DateTime.Now.ToString("yyyyMMddhhmmss")}{Path.GetExtension(file.FileName)}";
        }

    }
}
