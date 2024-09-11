import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IResponseModel, ResponseMessageModel, ResponseModel } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private requestParamChannelId = 4;

  constructor(
    private httpClient: HttpClient
  ) { }

  generateUUID(): string {
    // This implementation follows the UUID v4 standard
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  generateRequestParam() {
    return {
      // reqId: self.crypto.randomUUID(),h
      reqId: this.generateUUID(),
      channelId: this.requestParamChannelId
    }
  }

  post(url: string, data: any): Observable<ResponseMessageModel> {
    const requestParam = {
      // reqId: self.crypto.randomUUID(),
      reqId: this.generateUUID(),
      channelId: this.requestParamChannelId
    }
    data['requestParam'] = requestParam;
    const baseURL = environment.api + '/' + url;
    return this.httpClient.post<ResponseMessageModel>(baseURL, data);
  }

  postAddForJuristic(url: string, data: any, file?: File): Observable<ResponseMessageModel> {
    const requestParam = {
      // reqId: self.crypto.randomUUID(),
      reqId: this.generateUUID(),
      channelId: this.requestParamChannelId
    }
    data['requestParam'] = requestParam;
    const baseURL = environment.apiBackOffice + '/' + url;
    const formData: FormData = new FormData();
    // formData.append("file", file)
    formData.append("json", JSON.stringify(data))
    return this.httpClient.post<ResponseMessageModel>(baseURL, data);
  }

  postBackOffice(endpoint: string, body: any): Observable<ResponseMessageModel> {
    console.log('postBackOffice', endpoint, body)
    const requestParam = {
      // reqId: self.crypto.randomUUID(),
      reqId: this.generateUUID(),
      channelId: this.requestParamChannelId
    }
    body['requestParam'] = requestParam;
    const url = environment.apiBackOffice + '/' + endpoint;
    console.log(url, body)
    return this.httpClient.post<ResponseMessageModel>(url, body)
  }

  postBackOfficeFile(endpoint: string, body: any): Observable<Blob> {
    const requestParam = this.generateRequestParam();
    body['requestParam'] = requestParam;
    const url = environment.apiBackOffice + '/' + endpoint;

    // Set responseType to 'blob' for binary data
    return this.httpClient.post(url, body, { responseType: 'blob' });
  }

  getBackOffice(url: string): Observable<ResponseMessageModel> {
    const baseURL = environment.apiBackOffice + '/' + url;
    return this.httpClient.get<ResponseMessageModel>(baseURL);
  }

  getFileBackOffice(url: string) {
    const baseURL = environment.apiBackOffice + '/' + url;
    return this.httpClient.get(baseURL, { observe: 'response', responseType: 'blob' });
  }

  getPostFile(url: string, body: any) {
    const baseURL = environment.api + '/' + url;
    return this.httpClient.post(baseURL, body, { observe: 'response', responseType: 'blob' });
  }

  get(url: string): Observable<ResponseMessageModel> {
    const baseURL = environment.api + '/' + url;
    return this.httpClient.get<ResponseMessageModel>(baseURL);
  }

  getWithModel<res>(url: string): Observable<IResponseModel<res>> {
    const baseURL = environment.api + '/' + url;
    return this.httpClient.get<IResponseModel<res>>(baseURL);
  }

  getBackOfficeWithModel<res>(url: string): Observable<IResponseModel<res>> {
    const baseURL = `${environment.apiBackOffice}/${url}`;
    return this.httpClient.get<IResponseModel<res>>(baseURL);
  }

  postBackOfficeWithModelWithRequestParam<Req, Res>(endpoint: string, body: Req | null): Observable<IResponseModel<Res>> {
    const requestParam = {
      reqId: this.generateUUID(),
      channelId: this.requestParamChannelId
    };
    const payload = {
      requestParam,
      ...body
    };
    const url = `${environment.apiBackOffice}/${endpoint}`;
    return this.httpClient.post<IResponseModel<Res>>(url, payload);
  }

  postBackOfficeWithModel<Req, Res>(endpoint: string, body: Req | null): Observable<IResponseModel<Res>> {
    const url = `${environment.apiBackOffice}/${endpoint}`;
    return this.httpClient.post<IResponseModel<Res>>(url, body);
  }

  postBackOfficeFileFormDataWithModel<Req, Res>(endpoint: string, formData: FormData): Observable<IResponseModel<Res>> {
    const url = `${environment.apiBackOffice}/${endpoint}`;
    return this.httpClient.post<IResponseModel<Res>>(url, formData);
  }
  openFile(url: string) {
    const baseURL = environment.apiBackOffice + '/' + url;
    const newWindow = window.open(baseURL, '_blank');
    // if (newWindow) {
    //   setTimeout(() => {
    //     newWindow.close();
    //   }, 2000);
    // }
  }

}
