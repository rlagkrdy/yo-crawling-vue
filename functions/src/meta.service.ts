import { default as axios, AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { angularBlogSelectors, angularTagSelector, mediumDateSelector, reactBlogSplit, vueTagSelector } from './meta/model';
import { MetaData, MetaSelectorProperty } from './meta/types';
import Cheerio = cheerio.Cheerio;
import Root = cheerio.Root;


export enum CrawlingType {
  AngularBlog = 1,
  ReactBlog = 10,
  VueBlog = 20,
}

export class MetaService {
  private tagSelectors = {
    [CrawlingType.AngularBlog]: angularTagSelector,
    [CrawlingType.VueBlog]: vueTagSelector,
  };

  getMetaData(url: string, type: CrawlingType): Observable<MetaData> {
    return from(this.getHTML(url))
      .pipe(
        map((html: AxiosResponse<any>) => cheerio.load(html.data)),
        map(($: Root) => {
          let data: any = this.setMetaData();

          data.title = $('title').text();
          const selector: MetaSelectorProperty[] = angularBlogSelectors;

          selector.forEach((metaSelectorProperty: MetaSelectorProperty) => {
            data[metaSelectorProperty.key] = $(metaSelectorProperty.selector).attr('content');
          });

          if (type !== CrawlingType.ReactBlog) {
            // @ts-ignore
            data.date = new Date($(mediumDateSelector).attr('content')) || undefined;
          } else {
            const urlParse = url.split(reactBlogSplit)[1].split('/');
            data.date = new Date(parseInt(urlParse[0]), parseInt(urlParse[1]) - 1, parseInt(urlParse[2]) + 1);
          }

          // react
          // @ts-ignore
          const keywordSelector = this.tagSelectors[type];

          if (keywordSelector) {
            const elements: Cheerio = $(keywordSelector);

            if (elements) {
              const keywordArr: string[] = [];
              elements.map((index, element) => {
                // @ts-ignore
                keywordArr.push(element.children[0].data);
              });

              data.keywords = keywordArr;
            }
          }

          return data;
        })
      );
  }

  getHTML(url: string) {
    return axios.get(url);
  }

  private setMetaData(): MetaData {
    return {
      title: '',
      description: '',
      url: '',
      image: '',
      author: '',
      keywords: [],
      date: undefined
    };
  }
}
