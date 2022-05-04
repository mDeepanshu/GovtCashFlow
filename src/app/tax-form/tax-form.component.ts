import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaxField } from '../models/taxFields.model';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.css'],
})
export class TaxFormComponent implements OnInit {
  constructor() {}

  onSubmit() {}
  TaxForm: FormGroup;
  TaxFieldSet: TaxField;
  ngOnInit() {
    this.TaxForm = new FormGroup({
      partyName: new FormControl(null),
      setOne: new FormGroup({
        name: new FormControl(0, Validators.required),
        age: new FormControl(0, Validators.required),
        family_members: new FormControl(null, Validators.required),
      }),
      setTwo: new FormGroup({
        total_income: new FormControl(),
        total_sources: new FormControl(2),
        income_sources: new FormControl(2),
      }),
      setThree: new FormGroup({
        pan_number: new FormControl(null),
      }),
    });
  }
  logout(){}
}
