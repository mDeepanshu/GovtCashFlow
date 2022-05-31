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
  Fields = [];

  addField(category: string, field: string) {
    this.Fields.push(field);
    this.mainService.addFieldToCategory(category, field);
  }
  ngOnInit() {
    this.getCategoryFields('one');
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
  mineNewBlock() {
    this.mainService.mine().then((data) => {
      console.log('blockMined');
    });
  }
  logout() {
    this.mainService.loginStatus.next(3);
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
