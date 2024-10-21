import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    LoginComponent,
    CommonModule,RouterOutlet
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  logined: any;

  lists: any[] = [];
  constructor(private _DataService: DataService, private _Router: Router) {}

  ngOnInit(): void {
    this._DataService.getwishlistitems().subscribe((x) => {
      this.lists = x;
      console.log(this.lists);
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      this.logined = isLoggedIn === 'true';

      this._DataService.islogined.subscribe((x) => {
        this.logined = x;
      });
    });
  }
  logout() {
    localStorage.removeItem('isLoggedIn');
    this._DataService.islogined.next(false);
  }

  isOpen = false;
  Open = false;
  togglePopup() {
    this.isOpen = !this.isOpen;
  }

  confirm() {
    this.togglePopup();
  }
  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  togglePopupp() {
    this.Open = !this.Open;
  }
}
