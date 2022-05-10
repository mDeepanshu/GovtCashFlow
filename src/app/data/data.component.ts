import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaxField } from '../models/taxFields.model';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  constructor(private mainService: SharedService) {}
  onSubmit() {}
  TaxForm: FormGroup;
  TaxFieldSet: TaxField;
  items = ['lll', 'sdf'];
  addField(value: string) {
    this.items.push(value);
  }
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
  logout() {
    this.mainService.loginStatus.next(3);
  }
}
