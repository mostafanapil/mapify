import { Component, OnInit } from '@angular/core';
import { ComercialComponent } from '../map/comercial.component';
import { AllPropertiesComponent } from '../sec-half-add-listing/all-properties.component';
import { RouterLink } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-first-half',
  standalone: true,
  imports: [ComercialComponent, AllPropertiesComponent,RouterLink
  ],
  templateUrl: './first-half.component.html',
  styleUrls: ['./first-half.component.css']
})
export class FirstHalfComponent implements OnInit {

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  displayDate(): void {
    const dateElement = document.getElementById("date");
    if (dateElement) {
      dateElement.textContent = this.getCurrentDate();
    }
  }

  ngOnInit(): void {
    this.displayDate();

  }
}
