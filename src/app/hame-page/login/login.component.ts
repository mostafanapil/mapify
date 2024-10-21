import { CommonModule } from '@angular/common';
import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [CommonModule, FormsModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit {

  @ViewChild('container') container!: ElementRef;
  @ViewChild('register') registerBtn!: ElementRef;
  @ViewChild('login') loginBtn!: ElementRef;

  isSignUpActive: boolean = false;
  userRole: string = '';

  constructor(private renderer: Renderer2, private _Dataservice: DataService, private _Router: Router) {}

  loginform: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this._Dataservice.islogined.next(true);
    }
  }

  logindata(x: any) {
    this._Dataservice.loginUser(x.value).subscribe((y) => {
      if (y.error === undefined) {
        localStorage.setItem('isLoggedIn', 'true'); // Store login state
        this._Dataservice.islogined.next(true); // Update the subject
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.container && this.registerBtn && this.loginBtn) {
      this.renderer.listen(this.registerBtn.nativeElement, 'click', () => {
        this.isSignUpActive = true;
        this.renderer.addClass(this.container.nativeElement, 'active');
        this.renderer.setStyle(this.container.nativeElement, 'z-index', '15');
      });

      this.renderer.listen(this.loginBtn.nativeElement, 'click', () => {
        this.isSignUpActive = false;
        this.renderer.removeClass(this.container.nativeElement, 'active');
        this.renderer.setStyle(this.container.nativeElement, 'z-index', '5');
      });
    } else {
      console.error('Elements not found!');
    }
  }

  onCreateAccountClick(event: Event): void {
    event.preventDefault();
    this.registerBtn.nativeElement.click();
  }

  onHaveAccountClick(event: Event): void {
    event.preventDefault();
    this.loginBtn.nativeElement.click();
  }
}