import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  ngOnInit() {
    this.SignupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      pan_number: new FormControl(null, Validators.required),
    });
  }
  SignupForm: FormGroup;
  onSubmit() {
    this.mainService.signUp(this.SignupForm.value).then((data) => {
      if (data == 'successful_added') {
        this._snackBar.open('Sign-Up Successful', 'close');
        this.closeNav();
      }
    });
  }
  login(username, password) {
    this.mainService.login(username, password).then((data) => {
      if (data == 'Authentication Successful') {
        // this.loginEvent.emit(true);
        this.mainService.loginStatus.next(true);
      } else if (data == 'User not found') {
        this._snackBar.open('User not found', 'close');
      } else {
        this._snackBar.open('#@!$%^', 'close');
      }
    });
  }
  signup() {}
  openNav() {
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }
  closeNav() {
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }
}
