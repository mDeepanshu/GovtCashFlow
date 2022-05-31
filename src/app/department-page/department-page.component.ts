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
  items: DepartmentTransaction[] = [];
  ngOnInit() {
    this.newTransactionForm = new FormGroup({
      transaction_amount: new FormControl(null, Validators.required),
      transaction_details: new FormControl(null, Validators.required),
      reciever: new FormControl(null, Validators.required),
      sender: new FormControl(null),
      transaction_datetime: new FormControl(null),
    });
    //
    this.mainService
      .departmentPreviousTransactions()
      .then((data: DepartmentTransaction[]) => {
        this.items = data;
      });
  }
  onSubmit() {
    console.log(this.newTransactionForm.value);
    this.items.push(this.newTransactionForm.value);
    this.newDepartmentTransaction();
    // this.mainService.transactionBroadcast(
    //   this.newTransactionForm.value.transaction_amount
    // );
  }
  logout() {
    this.mainService.loginStatus.next(2);
  }
  verifyReciepient() {
    this.mainService
      .verifyReciepient(this.newTransactionForm.value.reciever)
      .then((data: any) => {
        if (data) {
          this._snackBar.open('User Found', 'close');
          this.mainService.receiverAddress = data.nodeAddress;
        } else {
          this._snackBar.open('User Not Found', 'close');
        }
      });
  }
  newDepartmentTransaction() {
    this.newTransactionForm.patchValue({
      transaction_datetime: new Date(),
      sender: this.mainService.nodeAddress,
    });
    let obj = this.newTransactionForm.value;
    obj.reciever = this.mainService.receiverAddress;
    this.mainService.newDepartmentTransaction(obj).then((data) => {
      console.log(data);
    });
  }
}
