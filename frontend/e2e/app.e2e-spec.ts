import { EgPage } from './app.po';

describe('eg App', () => {
  let page: EgPage;

  beforeEach(() => {
    page = new EgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
