using Abp.Application.Features;
using Abp.Localization;
using Abp.Runtime.Validation;
using Abp.UI.Inputs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPharmacy.Features
{
    public class AppFeatureProvider : FeatureProvider
    {
        public override void SetFeatures(IFeatureDefinitionContext context)
        {
            context.Create(
             AppFeatures.MaxUserCreationAllowed,
             defaultValue: "10",
             displayName: L(AppFeatures.MaxUserCreationAllowed),
             inputType: new SingleLineStringInputType(new NumericValueValidator(1, 500))
             );

            context.Create(
             AppFeatures.ImportDataThroughExcel,
             defaultValue: "false",
             displayName: L(AppFeatures.ImportDataThroughExcel),
             inputType: new CheckboxInputType()
             );

            context.Create(
             AppFeatures.ExportDataThroughExcel,
             defaultValue: "false",
             displayName: L(AppFeatures.ExportDataThroughExcel),
             inputType: new CheckboxInputType()
             );
        }

        private ILocalizableString L(string name)
        {
            return new LocalizableString(name, SmartPharmacyConsts.LocalizationSourceName);
        }
    }
}
