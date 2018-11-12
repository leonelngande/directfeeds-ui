import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {ITweet} from '../../app/models/tweet.model';
import {FeedProvider} from '../../providers/feed/feed';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tweets: Array<ITweet>;
  errorMessage: string;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public rest: FeedProvider,
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
      subTitle: 'Please try again.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //
          }
        },
        {
          text: 'Reload',
          handler: data => {
            this.refresh();
          }
        }
      ]
    });
    alert.present();
  }

  refresh() {
    this.getTweets();
  }
}
