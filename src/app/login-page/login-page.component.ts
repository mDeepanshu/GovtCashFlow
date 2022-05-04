import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SharedService} from '../shared.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private mainService: SharedService) { }
  @Output() loginEvent = new EventEmitter<boolean>();

  ngOnInit(): void {}

  login() {
    this.loginEvent.emit(true);
  }
}
