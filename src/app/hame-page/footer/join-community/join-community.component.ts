import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-join-community',
  standalone: true,
  imports: [LoginComponent, CommonModule],
  templateUrl: './join-community.component.html',
  styleUrls: ['./join-community.component.css'] // تصحيح الاسم من styleUrl إلى styleUrls
})
export class JoinCommunityComponent implements OnInit { // إضافة OnInit
  logined: boolean = false; // تعيين قيمة افتراضية

  constructor(private _Dataservice: DataService, private _Router: Router) {}

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.logined = isLoggedIn === 'true'; // تعيين حالة تسجيل الدخول مباشرة
    this._Dataservice.islogined.subscribe((x) => {
      this.logined = x; // الاشتراك في تحديثات حالة تسجيل الدخول
    });
  }

  logindata(x: any) {
    this._Dataservice.loginUser(x.value).subscribe((y) => {
      if (y.error === undefined) {
        localStorage.setItem('isLoggedIn', 'true'); // تخزين حالة تسجيل الدخول
        this._Dataservice.islogined.next(true); 
      }
    });
  }

  Open = false;
  
  togglePopupp() {
    this.Open = !this.Open;
  }

  openSignUpPopup() {
    this.Open = true; 
  }
}