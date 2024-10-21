import { Component, OnInit } from '@angular/core';
import { ComercialComponent } from '../map/comercial.component';
import { AllPropertiesComponent } from '../sec-half-add-listing/all-properties.component';
import { DataService } from '../../data.service';
import { Router, RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-leftside',
  standalone: true,
  imports: [ComercialComponent,AllPropertiesComponent,RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './leftside.component.html',
  styleUrl: './leftside.component.css'
})
//////////////////////////////////////////
export class LeftsideComponent implements OnInit {
  logined: any;

  constructor(private _DataService: DataService, private _Router: Router) {}

  logout() {
    localStorage.removeItem('isLoggedIn');
    this._DataService.islogined.next(false); 
    this._Router.navigate(['/login']); 
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
  return `${day}-${month}-${year} ` ;
  }

  name: any[] = [];

  displayDate(): void {
    const dateElement = document.getElementById("date");
    if (dateElement) {
      dateElement.textContent = this.getCurrentDate();
    }
  }

  ngOnInit(): void {
      this._DataService.getownername().subscribe((x:any) => {
      this.name = x;
      console.log(this.name);

    })
    this.displayDate();
    

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
    const popoverButton = document.getElementById('popoverButton') as HTMLButtonElement;
    const popover = document.getElementById('popover') as HTMLDivElement;

    if (popoverButton && popover) {
      popoverButton.addEventListener('click', () => {
          if (popover.classList.contains('hidden')) {
              popover.classList.remove('hidden');
              popover.style.visibility = 'visible';
              popover.style.opacity = '1';
              const rect = popoverButton.getBoundingClientRect();
              popover.style.top = `${rect.bottom + window.scrollY+15}px`; 
              popover.style.left = `${rect.left + window.scrollX-52}px`; 
          } else {
              popover.classList.add('hidden');
              popover.style.visibility = 'hidden';
              popover.style.opacity = '0';
          }
      });
      
    }
  }
}
