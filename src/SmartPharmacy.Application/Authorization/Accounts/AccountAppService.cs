using System;
using System.Threading.Tasks;
using Abp.Configuration;
using Abp.Domain.Uow;
using Abp.Net.Mail;
using Abp.UI;
using Abp.Zero.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using SmartPharmacy.Authorization.Accounts.Dto;
using SmartPharmacy.Authorization.Users;
using SmartPharmacy.Configuration;

namespace SmartPharmacy.Authorization.Accounts
{
    public class AccountAppService : SmartPharmacyAppServiceBase, IAccountAppService
    {
        // from: http://regexlib.com/REDetails.aspx?regexp_id=1923
        public const string PasswordRegex = "(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s)[0-9a-zA-Z!@#$%^&*()]*$";

        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly IEmailSender _emailSender;
        private readonly IConfigurationRoot _appConfiguration;
        private readonly IWebHostEnvironment _env;

        public AccountAppService(
            UserRegistrationManager userRegistrationManager, IEmailSender emailSender, IWebHostEnvironment env)
        {
            _userRegistrationManager = userRegistrationManager;
            _emailSender = emailSender;
            _env = env;
            _appConfiguration = AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName, env.IsDevelopment());
        }

        public async Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input)
        {
            var tenant = await TenantManager.FindByTenancyNameAsync(input.TenancyName);
            if (tenant == null)
            {
                return new IsTenantAvailableOutput(TenantAvailabilityState.NotFound);
            }

            if (!tenant.IsActive)
            {
                return new IsTenantAvailableOutput(TenantAvailabilityState.InActive);
            }

            return new IsTenantAvailableOutput(TenantAvailabilityState.Available, tenant.Id);
        }

        public async Task<RegisterOutput> Register(RegisterInput input)
        {
            var user = await _userRegistrationManager.RegisterAsync(
                input.Name,
                input.Surname,
                input.EmailAddress,
                input.UserName,
                input.Password,
                true // Assumed email address is always confirmed. Change this if you want to implement email confirmation.
            );

            var isEmailConfirmationRequiredForLogin = await SettingManager.GetSettingValueAsync<bool>(AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin);

            return new RegisterOutput
            {
                CanLogin = user.IsActive && (user.IsEmailConfirmed || !isEmailConfirmationRequiredForLogin)
            };
        }

        public async Task ResetPassword(ResetPasswordInputDto resetPasswordInput)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                var user = await UserManager.FindByEmailAsync(resetPasswordInput.Email);
                if (user == null)
                    return;

                if (user.TenantId.HasValue)
                {
                    //string resetToken = Uri.EscapeDataString(await UserManager.GeneratePasswordResetTokenAsync(user));
                    user.SetNewPasswordResetCode();

                    string link = $"{_appConfiguration["App:ClientRootAddress"]}update-password?userEmail={user.EmailAddress}&token={user.PasswordResetCode}";

                    string html = $"Hi, <br/> Your password reset link is: <a href='{link}'>Link</a>";

                    await _emailSender.SendAsync(resetPasswordInput.Email, "ResetPassword", html, true);


                }
            }

        }

        public async Task UpdatePassword(UpdatePasswordInputDto updatePasswordInput)
        {

            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                var user = await UserManager.FindByEmailAsync("haseeb@instacare.software");

                if(user.PasswordResetCode == updatePasswordInput.Token)
                {
                    var resetPassword = await UserManager.ChangePasswordAsync(user, updatePasswordInput.NewPassword);

                    if (resetPassword.Succeeded)
                    {
                        user.PasswordResetCode = null;
                    }
                }
                //var resetPassword = await UserManager.ResetPasswordAsync(user, updatePasswordInput.Token, updatePasswordInput.NewPassword);

            }

        }
    }
}
