import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaxField } from '../models/taxFields.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.css'],
})
export class TaxFormComponent implements OnInit {
  constructor(private mainService: SharedService) {}

  TaxForm: FormGroup;
  TaxFieldSet: TaxField;
  Fields = [];
  ngOnInit() {
    this.getCategoryFields('one');
    this.TaxForm = new FormGroup({});
  }
  logout() {
    this.mainService.loginStatus.next(1);
  }
  onSubmit() {
    console.log(this.TaxForm.value);
    let obj = {
      transaction_amount: this.TaxForm.value.Total_Income,
      transaction_details: JSON.stringify(this.TaxForm.value),
      transaction_datetime: new Date(),
      reciever: this.mainService.nodeAddress,
      sender: '',
    };
    console.log(obj);
    this.mainService.submitClientForm(obj).then((value) => {
      console.log(value);
    });
    // this.mainService.transactionBroadcast(
    //   this.TaxForm.value.setTwo.total_income
    // );
  }
  getCategoryFields(category) {
    console.log('getCategoryFields');

    this.mainService.getFieldsoFCaterory(category).then((arr: any) => {
      console.log(arr);

      this.Fields = arr.fields;
      this.Fields.forEach((element) => {
        this.TaxForm.addControl(
          element,
          new FormControl('', Validators.required)
        );
      });
      console.log(this.TaxForm.value);
    });
  }
}
