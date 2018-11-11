import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import {Tweet} from '../../app/models/tweet.model';

@Injectable()
export class RestProvider {

  private apiUrl = 'https://immense-wildwood-76766.herokuapp.com/api';

  constructor(public http: HttpClient) {
    // console.log('Hello RestProvider Provider');
  }

  getTweets(): Observable<Array<Tweet>> {
    return this.http.get(`${this.apiUrl}/feeds`)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
