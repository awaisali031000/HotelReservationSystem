using Abp.AppFactory.Interfaces;
using Abp.Net.Mail;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Abp.Extensions;
using SmartPharmacy.Configuration;
using Microsoft.Extensions.Hosting;

namespace SmartPharmacy.SendGrid
{
    public class SendGridEmailSender : IEmailSender
    {
        private readonly IConfigurationRoot _appConfiguration;
        private readonly IWebHostEnvironment _env;

        public SendGridEmailSender(
            IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName, env.IsDevelopment());
        }

        public void Send(string to, string subject, string body, bool isBodyHtml = true)
        {
            throw new NotImplementedException();
        }

        public void Send(string from, string to, string subject, string body, bool isBodyHtml = true)
        {
            throw new NotImplementedException();
        }

        public void Send(MailMessage mail, bool normalize = true)
        {
            throw new NotImplementedException();
        }

        public async Task SendAsync(string to, string subject, string body, bool isBodyHtml = true)
        {
            var client = new SendGridClient(_appConfiguration["SendGrid:Key"]);
            var fromMail = new EmailAddress("noreply@instacare.pk", "InstaCare Smart Pharmacy");
            var toEmail = new EmailAddress(to, "InstaCare");
            var msg = MailHelper.CreateSingleEmail(fromMail, toEmail, subject, string.Empty, isBodyHtml ? body : string.Empty);
            var response = await client.SendEmailAsync(msg);
        }

        public Task SendAsync(string from, string to, string subject, string body, bool isBodyHtml = true)
        {
            throw new NotImplementedException();
        }

        public Task SendAsync(MailMessage mail, bool normalize = true)
        {
            throw new NotImplementedException();
        }
    }
}
