import { HomeComponent } from './hame-page/home/home.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './hame-page/navbar/navbar.component';
import { FooterComponent } from './hame-page/footer/footer.component';
import { FeedbackComponent } from './hame-page/feedback/feedback.component';
import { PlacesComponent } from './service-profile-page/service-profile/places.component';
import { ComercialComponent } from './add-listing-page/map/comercial.component';
import { PopularListingComponent } from './hame-page/popular-listing/popular-listing.component';
import { FeaturesComponent } from './hame-page/features/features.component';
import { Router, NavigationEnd } from '@angular/router';
import { DashboardComponent } from './add-listing-page/dashboard/dashboard.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    FeaturesComponent,
    NavbarComponent,
    FooterComponent,
    FeedbackComponent,
    PopularListingComponent,
    PlacesComponent,
    ComercialComponent,DashboardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
