import { MetaSelectorProperty } from './types';


export const angularBlogSelectors: MetaSelectorProperty[] = [
  { key: 'description', selector: 'meta[property=\'og:description\']' },
  { key: 'url', selector: 'meta[property=\'og:url\']' },
  { key: 'image', selector: 'meta[property=\'og:image\']' },
  { key: 'author', selector: 'meta[name=\'author\']' },
  { key: 'keywords', selector: 'meta[name=\'keywords\']' },
];

export const angularBlogUrl: string = 'https://blog.angular.io/latest';
export const angularHrefSelector: string = 'div.postArticle-content > a';
export const angularTagSelector: string = 'a[href*="/tagged/"]';

export const vueBlogUrl: string = 'https://medium.com/the-vue-point';
export const vueTagSelector: string = 'a[href*="/tag/"]';
export const vueHrefSelector: string = 'div.postArticle > div > a';

export const mediumDateSelector: string = 'meta[property=\'article:published_time\']';

export const reactBlogUrl: string = 'https://reactjs.org/blog/all.html';
export const reactHrefSelector: string = 'a.css-m6cbzp';
export const reactBlogSplit: string = 'https://reactjs.org/blog/';
