import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentTransaction } from '../models/departmentTransaction.model';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.css'],
})
export class DepartmentPageComponent implements OnInit {
  constructor(
    private mainService: SharedService,
    private _snackBar: MatSnackBar
  ) {}
  newTransactionForm: FormGroup;
  reciepientID;
  items: DepartmentTransaction[] = [
    {
      transaction_to: 'Deepanshu',
      transaction_id: '5dtdtyds',
      transaction_amount: 100,
      transaction_details:
        'Sjkhskdhfk khlSDF lkjHKSDK HJKLASHKLH lkjHLKJDS LkhKJFK KJHKHUISD kjHUHK kjHUIDL',
      transaction_datetime: '03/08/2021:12:02:23',
    },
    {
      transaction_to: 'Deepanshu',
      transaction_id: '5dtdtyds',
      transaction_amount: 100,
      transaction_details:
        'Sjkhskdhfk khlSDF lkjHKSDK HJKLASHKLH lkjHLKJDS LkhKJFK KJHKHUISD kjHUHK kjHUIDL',
      transaction_datetime: '03/08/2021:12:02:23',
    },
    {
      transaction_to: 'Deepanshu',
      transaction_id: '5dtdtyds',
      transaction_amount: 100,
      transaction_details:
        'Sjkhskdhfk khlSDF lkjHKSDK HJKLASHKLH lkjHLKJDS LkhKJFK KJHKHUISD kjHUHK kjHUIDL',
      transaction_datetime: '03/08/2021:12:02:23',
    },
  ];
  ngOnInit() {
    this.newTransactionForm = new FormGroup({
      transaction_id: new FormControl(null, Validators.required),
      transaction_amount: new FormControl(null, Validators.required),
      transaction_details: new FormControl(),
      transaction_datetime: new FormControl(),
    });
    //
    // this.mainService
    //   .fetchDepartmentTransactions()
    //   .then((data: DepartmentTransaction[]) => {
    //     this.items = data;
    //   });
  }
  onSubmit() {
    console.log(this.newTransactionForm.value);
    this.items.push(this.newTransactionForm.value);
  }
  logout() {
    this.mainService.loginStatus.next(2);
  }
  verifyReciepient() {
    console.log(this.newTransactionForm.value.transaction_id);
    this.mainService
      .verifyReciepient(this.newTransactionForm.value.transaction_id)
      .then((data) => {
        console.log(data);
        if (data) {
          this._snackBar.open('User Found', 'close');
        } else {
          this._snackBar.open('User Not Found', 'close');
        }
      });
  }
  newDepartmentTransaction() {
    this.newTransactionForm.setValue({
      transaction_datetime: new Date(),
    });
    this.mainService
      .newDepartmentTransaction(this.newTransactionForm.value)
      .then((data) => {
        console.log(data);
      });
  }
}
