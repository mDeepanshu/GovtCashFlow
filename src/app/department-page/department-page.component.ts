import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentTransaction } from '../models/departmentTransaction.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.css'],
})
export class DepartmentPageComponent implements OnInit {
  constructor(private mainService: SharedService) {}
  newTransaction: FormGroup;
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
    this.newTransaction = new FormGroup({
      transaction_to: new FormControl(0, Validators.required),
      transaction_id: new FormControl(0, Validators.required),
      transaction_amount: new FormControl(0, Validators.required),
      transaction_details: new FormControl(0, Validators.required),
      transaction_datetime: new FormControl(0, Validators.required),
    });
  }
  onSubmit() {
    console.log(this.newTransaction.value);
    this.items.push(this.newTransaction.value);
  }
  logout() {
    this.mainService.loginStatus.next(2);
  }
}
