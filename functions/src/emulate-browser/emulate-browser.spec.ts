import { EmulateBrowser } from './emulate-browser';
import puppeteer, { Response, Page, ElementHandle, Browser } from 'puppeteer';


jest.setTimeout(30000);

export const stubPage = {
  goto(url: string) {
    return Promise.resolve();
  },
  $$(selector: string): Promise<ElementHandle[]> {
    return Promise.resolve([]);
  },
  $(selector: string) {
    return Promise.resolve(stubElementHandle);
  },
  $eval(selector: string, pageFunction: any) {
    return Promise.resolve();
  },
  evaluate(pageFunction: string) {
    return Promise.resolve();
  }
} as unknown as Page;

export const stubElementHandle = {
  $eval() {
    return Promise.resolve();
  }
} as unknown as ElementHandle;

describe('EmulateBrowser', () => {
  let emulateBrowser: EmulateBrowser;

  beforeEach(async () => {
    emulateBrowser = new EmulateBrowser();
  });


  it('created', () => {
    expect(emulateBrowser instanceof EmulateBrowser).toBeTruthy();
  });


  it('getLaunch() => call: puppeteer.launch()', async () => {
    const launchFn = spyOn<any>(puppeteer, 'launch');
    await emulateBrowser.getLaunch();

    expect(launchFn).toHaveBeenCalled();
  });


  describe('getNewPage()', () => {
    it('call: currentBrowser.newPage()', async () => {
      const browser = await emulateBrowser.getLaunch();
      emulateBrowser.currentBrowser = browser;

      const newPageFn = spyOn(emulateBrowser.currentBrowser, 'newPage');
      await emulateBrowser.getNewPage();

      expect(newPageFn).toHaveBeenCalled();

      await browser.close();
    });
  });

  describe('setViewport()', () => {
    let browser, page;

    beforeEach(async () => {
      browser = await emulateBrowser.getLaunch();
      emulateBrowser.currentBrowser = browser;
      page = await emulateBrowser.getNewPage();
      emulateBrowser.currentPage = page;
    });


    afterEach(async () => {
      await emulateBrowser.currentPage.close();
      await emulateBrowser.currentBrowser.close();
    });

    it('call: currentPage.setViewport()', async () => {
      const setViewportFn = spyOn(emulateBrowser.currentPage, 'setViewport');
      await emulateBrowser.setViewport();
      expect(setViewportFn).toHaveBeenCalled();
    });

    it('viewport => width: 1920, height: 1000', async () => {
      await emulateBrowser.setViewport();

      const viewport = emulateBrowser.currentPage.viewport();
      expect(viewport.width).toEqual(1920);
      expect(viewport.height).toEqual(1080);
    });
  });

  describe('movePage(url: string): Promise<Response | null>', () => {
    let browser: Browser, page: Page;

    beforeEach(async () => {
      browser = await emulateBrowser.getLaunch();
      emulateBrowser.currentBrowser = browser;
      page = await emulateBrowser.getNewPage();
      emulateBrowser.currentPage = page;
    });

    afterEach(async () => {
      if (emulateBrowser.currentPage && !emulateBrowser.currentPage.isClosed()) {
        await emulateBrowser.currentPage.close();
      }

      if (emulateBrowser.currentBrowser) {
        await emulateBrowser.currentBrowser.close();
      }
    });

    it('call: currentPage.setViewport()', async () => {
      const gotoFn = spyOn(emulateBrowser.currentPage, 'goto');
      await emulateBrowser.movePage('https://naver.com');
      expect(gotoFn).toHaveBeenCalled();
    });

    it('is HTTPResponse', async () => {
      const response: Response = await emulateBrowser.movePage('https://naver.com') as Response;
      expect(response.constructor.name).toEqual('HTTPResponse');
    });

    it('getHrefs(selector: string) => call: currentPage.$$eval()', async () => {
      const evalFn = spyOn(emulateBrowser.currentPage, '$$eval');
      await emulateBrowser.getHrefs('a[tag]');

      expect(evalFn).toHaveBeenCalled();
    });
  });

  describe('autoScroll() : ', () => {
    let browser: Browser, page: Page;

    beforeEach(async () => {
      browser = await emulateBrowser.getLaunch();
      emulateBrowser.currentBrowser = browser;
      page = await emulateBrowser.getNewPage();
      emulateBrowser.currentPage = page;
    });

    afterEach(async () => {
      if (emulateBrowser.currentPage && !emulateBrowser.currentPage.isClosed()) {
        await emulateBrowser.currentPage.close();
      }

      if (emulateBrowser.currentBrowser) {
        await emulateBrowser.currentBrowser.close();
      }
    });

    it('if: isScrollEnd true => call: 1 time', async () => {
      await emulateBrowser.movePage('https://naver.com');

      const isScrollEndFn = spyOn(emulateBrowser, 'isScrollEnd').and.returnValue(true);
      await emulateBrowser.autoScroll(emulateBrowser.currentPage);
      expect(isScrollEndFn).toHaveBeenCalledTimes(1);
    });

    it('if: isScrollEnd false, true => call: 2 times', async () => {
      await emulateBrowser.movePage('https://blog.angular.io/latest');

      const isScrollEndFn = spyOn(emulateBrowser, 'isScrollEnd').and.returnValues(false, true);

      await emulateBrowser.autoScroll(emulateBrowser.currentPage);

      expect(isScrollEndFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('async isScrollEnd(page: Page) : ', () => {
    let browser: Browser, page: Page;

    beforeEach(async () => {
      browser = await emulateBrowser.getLaunch();
      emulateBrowser.currentBrowser = browser;
      page = await emulateBrowser.getNewPage();
      emulateBrowser.currentPage = page;
    });

    afterEach(async () => {
      if (emulateBrowser.currentPage && !emulateBrowser.currentPage.isClosed()) {
        await emulateBrowser.currentPage.close();
      }

      if (emulateBrowser.currentBrowser) {
        await emulateBrowser.currentBrowser.close();
      }
    });

    it('call: page.evaluate() 2times, page.waitFor() 1time', async () => {
      const evaluateFn = spyOn(emulateBrowser.currentPage, 'evaluate');
      const waitForFn = spyOn(emulateBrowser.currentPage, 'waitFor');

      await emulateBrowser.isScrollEnd(emulateBrowser.currentPage);

      expect(evaluateFn).toHaveBeenCalledTimes(3);
      expect(waitForFn).toHaveBeenCalledTimes(1);
    });


    it('if: naver.com => return true', async () => {
      await emulateBrowser.movePage('https://naver.com');

      const result = await emulateBrowser.isScrollEnd(emulateBrowser.currentPage);
      expect(result).toBeTruthy();
    });
  });
});
