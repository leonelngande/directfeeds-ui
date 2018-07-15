import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {Tweet} from '../../app/models/tweet.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tweets: Array<Tweet>;
  errorMessage: string;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public rest: RestProvider,
    public loadingController: LoadingController) {

  }

  ionViewDidLoad() {
    this.getTweets();
  }

  private getTweets() {
    let loader = this.loadingController.create({
      spinner: 'bubbles',
      content: 'Fetching...',
    });
    loader.present();
    this.rest.getTweets()
      .subscribe(
        tweets => {
          loader.dismiss();
          this.tweets = tweets;
          // console.log(tweets);
        },
        error =>  {
          loader.dismiss();
          this.errorMessage = <any>error;
          this.presentFetchingError();
        }
      );
  }

  presentFetchingError() {
    let alert = this.alertCtrl.create({
      title: 'Something went wrong',
      subTitle: 'Please reload.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  refresh() {
    this.getTweets();
  }
}
