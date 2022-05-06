import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'GovtCashFlow';
  loginStatus = false;
  constructor(private mainService: SharedService) {}
  login(e: any) {
    this.loginStatus = true;
  }
  ngOnInit() {
    this.mainService.loginStatus.subscribe((value) => {
      this.loginStatus = value;
    });
  }
}
