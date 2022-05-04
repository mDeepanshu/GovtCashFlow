import { Injectable } from '@angular/core';
import { ResponseType } from './models/responseType';
import { ErrMsgModuleComponent } from './err-msg-module/err-msg-module.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // public url: string = 'http://192.168.1.8:3000';
  public url: string = 'http://localhost:3000';
  constructor(private http: HttpClient, public dialog: MatDialog) { }

  autoCompleteName(keyword, type) {
    // let result = await this.http.get(
    //   `${this.url}/party/autocomplete_name?keyword=${keyword}&limit=5&${type}`
    // );
    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/party/autocomplete_name?keyword=${keyword}&limit=5&${type}`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  checkForErr(statusCode, message) {
    console.log(statusCode, message);

    if (statusCode != 200) {
      this.dialog.open(ErrMsgModuleComponent, { data: message });
      return true;
    } else {
      return false;
    }
  }
}
