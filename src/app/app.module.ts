import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TimeAgoPipe} from 'time-ago-pipe';
import {Api} from '../providers/api/api';
import {InterceptorProvider} from '../providers/interceptor/interceptor';
import {FeedProvider} from '../providers/feed/feed';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    Api,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    FeedProvider,
  ]
})
export class AppModule {}
