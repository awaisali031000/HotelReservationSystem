import { SmartPharmacyTemplatePage } from './app.po';

describe('SmartPharmacy App', function() {
  let page: SmartPharmacyTemplatePage;

  beforeEach(() => {
    page = new SmartPharmacyTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
