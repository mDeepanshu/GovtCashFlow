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
  nodeAddress;
  receiverAddress;

  async login(userid, password, category) {
    // this.logedInId = userid;
    // return new Promise((response, reject) => {
    //   this.http
    //     .get(
    //       `${this.url}/networkNode/login?username=${userid}&password=${password}&category=${category}`
    //     )
    //     .subscribe((responseData: ResponseType) => {
    //       let isError = this.checkForErr(
    //         responseData.status,
    //         responseData.message
    //       );
    //       if (isError) {
    //         reject('http request failed' + responseData.message);
    //       } else {
    //         response(responseData.message);
    //       }
    //     });
    // });
    //
    let b;
    let a = await this.http.get(
      `${this.url}/networkNode/login?username=${userid}&password=${password}&category=${category}`
    );
    await a.subscribe(async (data) => {
      b = data;
    });
    console.log(b);

    //
  }
  submitClientForm(form) {
    // this.transactionBroadcast();

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
  departmentPreviousTransactions() {
    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/department/previousTransactions?id=${this.nodeAddress}`
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
  //
  transactionBroadcast(amt) {
    let obj = {
      receiver: this.receiverAddress,
      sender: this.nodeAddress,
      amt: amt,
    };
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/networkNode/transaction/broadcast`, obj)
        .subscribe((responseData: ResponseType) => {
          // let isError = this.checkForErr(
          //   responseData.status,
          //   responseData.message
          // );
          // if (isError) {
          //   reject('http request failed' + responseData.message);
          // } else {
          //   response(responseData.message);
          // }
          response(responseData);
        });
    });
  }
  mine() {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/admin/mineblock`)
        .subscribe((responseData: ResponseType) => {
          // let isError = this.checkForErr(
          //   responseData.status,
          //   responseData.message
          // );
          // if (isError) {
          //   reject('http request failed' + responseData.message);
          // } else {
          //   response(responseData.message);
          // }
          response(responseData.message);
        });
    });
  }
  registerBroadcastNode(newNodeUrl) {
    console.log(newNodeUrl);
    let obj = {
      newNodeUrl: 'http://localhost:3000/networkNode',
    };
    return new Promise((response, reject) => {
      this.http
        .post(`http://localhost:3003/register-and-broadcast-node`, obj)
        .subscribe((responseData: ResponseType) => {
          // let isError = this.checkForErr(
          //   responseData.status,
          //   responseData.message
          // );
          // if (isError) {
          //   reject('http request failed' + responseData.message);
          // } else {
          //   response(responseData.message);
          // }
          response(responseData.message);
        });
    });
  }
  address(address) {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/address/${address}`)
        .subscribe((responseData: ResponseType) => {
          // let isError = this.checkForErr(
          //   responseData.status,
          //   responseData.message
          // );
          // if (isError) {
          //   reject('http request failed' + responseData.message);
          // } else {
          //   response(responseData.message);
          // }
          response(responseData.message);
        });
    });
  }
  addFieldToCategory(category, field) {
    console.log(field);

    return new Promise((response, reject) => {
      this.http
        .get(
          `${this.url}/admin/addFieldToCategory?category=${category}&field=${field}`
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
  getFieldsoFCaterory(category) {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/admin/getFieldsoFCaterory?category=${category}`)
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
