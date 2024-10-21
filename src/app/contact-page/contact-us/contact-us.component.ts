import { Component } from '@angular/core';
import { StartOfContactComponent } from '../start-of-contact/start-of-contact.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [StartOfContactComponent,RouterLink],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

}
