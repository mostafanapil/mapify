import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Typed from 'typed.js';
import { CategoriesSecComponent } from '../categoriesSec/categoriesSec.component';
import { PopularListingComponent } from '../popular-listing/popular-listing.component';
import { FeaturesComponent } from '../features/features.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { OwnerOfBusinessComponent } from '../owner-of-business/owner-of-business.component';
import { JoinCommunityComponent } from '../footer/join-community/join-community.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CategoriesSecComponent,PopularListingComponent,FeaturesComponent,FeedbackComponent,OwnerOfBusinessComponent,JoinCommunityComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 200; 
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
  // typing animation initialization
  ngOnInit() {
    setTimeout(() => {
      const options = {
        strings: [
          'Malls',
          'Restaurants',
          'Carpenters',
          'Mechanicals',
          'Schools',
          'Hospitals',
          'Hotels',
          'Museums',
          'Places',
        ],
        typeSpeed: 80,
        backSpeed: 80,
        backDelay: 1500,
        startDelay: 2000,
        loop: true,
      };

      const typed = new Typed('.places-animation', options);
    }, 2000);
  }

  // toggle menu
  isActive = false;
  toggleClass() {
    this.isActive = !this.isActive;
  }

  // hide menu when click on document
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.looking-for')) {
      this.isActive = false;
    }
  }

  // current location
  location: string = '';
  
  requestLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // التحقق من الإحداثيات
          console.log('Latitude:', latitude, 'Longitude:', longitude);

          // استدعاء API لتحويل الإحداثيات إلى عنوان
          this.getLocationAddress(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Permission denied for location access.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("Request for location timed out.");
              break;
            default:
              alert("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  // تحويل الإحداثيات إلى عنوان باستخدام OpenStreetMap API
  getLocationAddress(latitude: number, longitude: number) {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    // استدعاء Fetch API لتحويل الإحداثيات إلى عنوان
    fetch(nominatimUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const address = data.display_name;
        if (address) {
          this.location = address; // عرض العنوان الحالي
          console.log('Current Location:', this.location);
        } else {
          console.log('No address found for the provided coordinates.');
        }
      })
      .catch((error) => {
        console.error('Error fetching location address:', error);
        alert('Failed to fetch location address. Please try again later.');
      });
  }

  // البحث
  searchQuery: string = ''; 

  setSearchQuery(value: string) {
    this.searchQuery = value; // تحديث قيمة الـ searchQuery
    this.isActive = false; // إغلاق القائمة بعد الاختيار
  }
}
