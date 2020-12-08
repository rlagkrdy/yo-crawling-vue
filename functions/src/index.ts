import { Page } from 'puppeteer';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { switchMap, map, tap } from 'rxjs/operators';
import { EmulateBrowser } from './emulate-browser/emulate-browser';
// import { Firestore } from './firestore/firestore';
import { MetaService, CrawlingType } from './meta.service';
import { combineLatest } from 'rxjs';
import { vueBlogUrl, vueHrefSelector } from './meta/model';
import { MetaData } from './meta/types';

// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

//
// let adminApp: any;
//
// function initializeApp() {
//   return admin.initializeApp({
//     credential: admin.credential.cert(functions.config().admin),
//     storageBucket: functions.config().storage.bucket,
//     databaseURL: functions.config().database.url
//   });
// }
//
// function setAdminApp() {
//   if (!adminApp) {
//     adminApp = initializeApp();
//   }
// }
//
// const func = functions.region('asia-northeast1');


const emulateBrowser = new EmulateBrowser();
const metaService = new MetaService();

// MetaTagService();

function test() {
  emulateBrowser.goto(vueBlogUrl)
    .pipe(
      switchMap((page: Page) => from(emulateBrowser.autoScroll(page))),
      switchMap(() => from(emulateBrowser.getHrefs(vueHrefSelector))),
      tap((urls: string[]) => console.log('urls', urls)),
      map((urls: string[]) => urls.map(url => metaService.getMetaData(url, CrawlingType.VueBlog))),
      switchMap((data$: Observable<MetaData>[]) => combineLatest(data$))
    )
    .subscribe((result: MetaData[]) => {
      console.log('enter currentBrowser close start', result, result.length);
      emulateBrowser.currentBrowser.close().then(() => {
        console.log('enter currentBrowser close end');
      });

      //  TODO: firebase firestore NOSQL, 실시간 데이터데이스 create
      //  TODO: vue list 페이지에서 firestore의 db를 가지고 와서 rendering

      //  내가 새 게시글 올림
      //  크롤링 어플리케이션은 어제 한번 발생했어요
      //  몰라 몰라 아무도 몰라

      //  주기적? => 스케쥴(정의 어떻게)

      //  스케쥴

      //  또 다른 문제
      //  개발은 문제의 연속이다.

      // 처음에 가지고 오면 db create
      //  다음 또 처음부터 다시 크롤링 할거에요?
      // 다시 크롤링 했다고 하면?
      //  그걸 전부 다시 등록하나요?
      //  일일히 비교해서 없는것만 등록하나요?

      //  크롤링 업데이트에 대한 정의 필요하죠.
      //  언제 가지고 오고
      //  어떻것만 가지고 오고 저장 할것인지 결정해야 합니다.

    });
}

test();


//  TODO: DB 저장
//  TODO: DB에 데이터가 있을 시 최신 기준 필터링

//  Angular 작업 완료
//  React 작업 완료??  138 가지고 올때 느린 문제 해결 필요
