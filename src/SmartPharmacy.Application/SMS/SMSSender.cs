using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SmartPharmacy.Configuration;
using SmartPharmacy.SMS.Dto;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace SmartPharmacy.SMS
{
    public class SMSSender : ISMSSender
    {
        private readonly IConfigurationRoot _appConfiguration;
        private readonly IWebHostEnvironment _env;

        public SMSSender(
            IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName, env.IsDevelopment());
        }
        public async Task SendBrandedAsync(string receiver, string messageData)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");

                var response = httpClient.PostAsync($"https://pk.eocean.us/APIManagement/API/RequestAPI?user={_appConfiguration["EOcean:Branded:User"]}&pwd={_appConfiguration["EOcean:Branded:Password"]}&sender={_appConfiguration["EOcean:Branded:Sender"]}&reciever={receiver}&response=json&msg-data={messageData}", null).Result;

                if (response.IsSuccessStatusCode)
                {
                    var output = JsonConvert.DeserializeObject<SendBrandedResponseDto>(await response.Content.ReadAsStringAsync());
                }
            }
        }
        public async Task SendShortCodeAsync(string reciever, string messageData)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");

                var response = httpClient.GetAsync($"http://smsctp3.eocean.us:24555/api?action=sendmessage&username={_appConfiguration["EOcean:ShortCode:Username"]}&password={_appConfiguration["EOcean:ShortCode:Password"]}&recipient={reciever}&originator={_appConfiguration["EOcean:ShortCode:Originator"]}&messagedata={messageData}").Result;

                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    XmlSerializer serializer = new XmlSerializer(typeof(acceptreport));
                    StringReader rdr = new StringReader(await response.Content.ReadAsStringAsync());
                    acceptreport resultingMessage = (acceptreport)serializer.Deserialize(rdr);
                }
            }
        }
    }
}
