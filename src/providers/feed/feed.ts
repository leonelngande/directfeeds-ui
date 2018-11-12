import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {ITweet} from '../../app/models/tweet.model';
import {Api} from '../api/api';

@Injectable()
export class FeedProvider {

  constructor(public api: Api) {}

  getTweets(): Observable<ITweet[]> {
    return this.api.get('/feeds')
      .pipe(
        map(res => this.adaptTweets(res)),
      );
  }

  private adaptTweets(tweetsArray: any) {
    return tweetsArray.map(tweet => {
      return {
        createdAt: tweet.createdAt,
        tweet: tweet.tweet,
        tweetUrls: tweet.tweetUrls,
        username: tweet.username,
        userScreenName: tweet.userScreenName,
        userProfileUrl: tweet.userProfileUrl,
        userFollowersCount: tweet.userFollowersCount,
        userFriendsCount: tweet.userFriendsCount,
        userListedCount: tweet.userListedCount,
      };
    })
  }

}
