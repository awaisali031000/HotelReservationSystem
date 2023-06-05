﻿using System.Threading.Tasks;
using SmartPharmacy.Models.TokenAuth;
using SmartPharmacy.Web.Controllers;
using Shouldly;
using Xunit;

namespace SmartPharmacy.Web.Tests.Controllers
{
    public class HomeController_Tests: SmartPharmacyWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}