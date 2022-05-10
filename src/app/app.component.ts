import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'GovtCashFlow';
  loginStatus = 0;
  constructor(private mainService: SharedService) {}
  login(e: any) {
    this.loginStatus = 0;
  }
  ngOnInit() {
    this.mainService.loginStatus.subscribe((value) => {
      this.loginStatus = value;
    });
  }
}
