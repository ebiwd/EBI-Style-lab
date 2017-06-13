import { TaxTestPage } from './app.po';

describe('tax-test App', () => {
  let page: TaxTestPage;

  beforeEach(() => {
    page = new TaxTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
