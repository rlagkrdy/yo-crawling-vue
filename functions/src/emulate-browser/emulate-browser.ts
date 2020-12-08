import puppeteer, { Page, Browser, Response } from 'puppeteer';
import { Observable, from } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';



export class EmulateBrowser {
  private puppeteerBrowser: Browser | undefined;
  private puppeteerPage: Page | undefined;

  goto(url: string): Observable<Page> {
    return from(this.getLaunch())
      .pipe(
        tap((browser: Browser) => this.currentBrowser = browser),
        switchMap(() => from(this.getNewPage())),
        tap((page: Page) => this.currentPage = page),
        switchMap(() => from(this.setViewport())),
        switchMap(() => from(this.movePage(url))),
        map(() => this.currentPage)
      );
  }

  get currentBrowser(): Browser {
    return this.puppeteerBrowser as Browser;
  }

  set currentBrowser(browser: Browser) {
    this.puppeteerBrowser = browser;
  }

  get currentPage(): Page {
    return this.puppeteerPage as Page;
  }

  set currentPage(page: Page) {
    this.puppeteerPage = page;
  }

  getLaunch(): Promise<Browser> {
    return puppeteer.launch();
  }

  getNewPage(): Promise<Page> {
    return this.currentBrowser.newPage();
  }

  setViewport(): Promise<void> {
    return this.currentPage.setViewport({
      width: 1920, height: 1080
    });
  }

  movePage(url: string): Promise<Response | null> {
    return this.currentPage.goto(url);
  }

  getHrefs(selector: string): Promise<string[]> {
    return this.currentPage.$$eval(
      selector,
      (aElements: Element[]) => aElements.map((element: any) => {
        return element.href as string;
      })
    );
  }

  async autoScroll(page: any): Promise<void> {
    const result = await this.isScrollEnd(page);

    if (result) {
      return new Promise(resolve => {
        resolve();
      });
    } else {
      await this.autoScroll(page);
    }
  }

  async isScrollEnd(page: Page): Promise<boolean> {
    const scrollHeight = 'document.body.scrollHeight';
    let previousHeight = await page.evaluate(scrollHeight);

    await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
    await page.waitFor(3000);

    const currentHeight = await page.evaluate(scrollHeight);

    console.log('currentHeight === previousHeight', currentHeight, previousHeight);
    return currentHeight === previousHeight;
  }
}
