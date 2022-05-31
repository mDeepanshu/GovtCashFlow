import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private mainService: SharedService,
    private _snackBar: MatSnackBar
  ) {}
  SignupForm: FormGroup;

  ngOnInit() {
    this.SignupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      pan_number: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    let obj = this.SignupForm.value;
    obj.nodeAddress = uuidv4().split('-').join('');
    console.log(obj);
    this.mainService.signUp(obj).then((data) => {
      if (data == 'successful_added') {
        this._snackBar.open('Sign-Up Successful', 'close');
        this.closeNav();
      }
    });
  }
  async login(username, password, category) {
    const data: any = await this.mainService.login(
      username,
      password,
      category
    );
    console.log(data);

    if (data.status == 'Authentication Successful') {
      this.mainService.nodeAddress = data.nodeAddress;
      if (category != 'client') {
        this.mainService.registerBroadcastNode(this.mainService.nodeAddress);
      }
      switch (category) {
        case 'client':
          this.mainService.loginStatus.next(1);
          break;
        case 'department':
          this.mainService.loginStatus.next(2);
          break;
        case 'admin':
          this.mainService.loginStatus.next(3);
          break;
      }
    } else if (data == 'User not found') {
      this._snackBar.open('User not found', 'close');
    } else {
      this._snackBar.open('#@!$%^', 'close');
    }
  }
  openNav() {
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }
  closeNav() {
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }
}
