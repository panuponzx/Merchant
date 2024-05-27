import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseMessageModel, ResponseModel } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  post(url: string, data: any): Observable<ResponseMessageModel> {
    data.requestParam.reqId = self.crypto.randomUUID();
    data.requestParam.channelId = 1;
    const baseURL = environment.api + '/' + url;
    return this.httpClient.post<ResponseMessageModel>(baseURL, data);
  }

  postAddForJuristic(url: string, data: any, file: File): Observable<ResponseMessageModel> {
    data.requestParam.reqId = self.crypto.randomUUID();
    data.requestParam.channelId = 1;
    const baseURL = environment.apiBackOffice + '/' + url;
    const formData: FormData = new FormData();
    formData.append("file", file)
    formData.append("json", JSON.stringify(data))
    return this.httpClient.post<ResponseMessageModel>(baseURL, formData);
  }

  postBackOffice(endpoint: string, body: any): Observable<ResponseMessageModel>{
    body.requestParam.reqId = self.crypto.randomUUID();
    body.requestParam.channelId = 1;
    const url = environment.apiBackOffice + '/' + endpoint;
    return this.httpClient.post<ResponseMessageModel>(url, body)
  }

  getBackOffice(url: string): Observable<ResponseMessageModel> {
    const baseURL = environment.apiBackOffice + '/' + url;
    return this.httpClient.get<ResponseMessageModel>(baseURL);
  }

  getFileBackOffice(url: string) {
    const baseURL = environment.apiBackOffice + '/' + url;
    return this.httpClient.get(baseURL, { observe: 'response', responseType: 'blob' });
  }
  
  get(url: string): Observable<ResponseMessageModel> {
    const baseURL = environment.api + '/' + url;
    return this.httpClient.get<ResponseMessageModel>(baseURL);
  }

}
