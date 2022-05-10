import { Injectable } from '@angular/core';
import { ResponseType } from './models/responseType';
import { ErrMsgModuleComponent } from './err-msg-module/err-msg-module.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // public url: string = 'http://192.168.1.8:3000';
  public url: string = 'http://localhost:3000';
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  loginStatus = new Subject<number>();
  logedInId;
  login(userid, password, category) {
    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/client/login?username=${userid}&password=${password}&category=${category}`
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
  submitClientForm(form) {
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/client/formSubmit`, form)
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
  signUp(form) {
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/client/signupform`, form)
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
  fetchForm(type) {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/client/fetchForm?formType=${type}`)
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
  departmentPreviousTransactions(id) {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/department/previousTransactions?id=${id}`)
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
  verifyReciepient(username) {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/department/verifyReciepient?username=${username}`)
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
  newDepartmentTransaction(object) {
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/department/newDepartmentTransaction`, object)
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
  fetchDepartmentTransactions() {
    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/department/fetchDepartmentTransactions?id=${this.logedInId}`
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
}
