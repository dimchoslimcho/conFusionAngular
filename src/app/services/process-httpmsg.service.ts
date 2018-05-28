import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  public extractData(res: Response){
    let body = res.json();

    return body || { };
  }

  public handleError(error: Response | any) {
    let errMsg: string;

    if(error instanceof Response){     //The server side responded with error
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`; //inside this string we can use variables the status is the response status value
    } else {  //the error could be of other reasons
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

}
