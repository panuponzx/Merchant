import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseMessageModel } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  post(url: string, data: any): Observable<ResponseMessageModel> {
    const baseURL = environment.api + '/' + url;
    return this.httpClient.post<ResponseMessageModel>(baseURL, data);
  }

  get(url: string): Observable<ResponseMessageModel> {
    const baseURL = environment.api + '/' + url;
    return this.httpClient.get<ResponseMessageModel>(baseURL);
  }

}
