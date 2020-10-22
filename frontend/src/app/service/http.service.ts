import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    get(url: string, value: any): Observable<any> {
        let headers = new Headers({ 'Content-type': 'application/json' })
        let options = new RequestOptions({ headers: headers })
        return this.http.post(url, value);
    }


    delete(url: string, value: any): Observable<any> {
        let headers = new Headers({ 'Content-type': 'application/json' })
        let options = new RequestOptions({ headers: headers })
        return this.http.post(url, value).map(this.extractData);
    }

}