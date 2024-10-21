import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../data.service';
import { ProfileImgSliderComponent } from '../img-slider-service-profile/profile-img-slider.component';
import { ReviewsComponent } from '../review-service-profile/reviews.component';
import { MapSectionComponent } from '../map-section/map-section.component';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ProfileImgSliderComponent,
    ReviewsComponent,MapSectionComponent
  ],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})
export class PlacesComponent implements OnInit {
  place: any;
  placeId: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.placeId = this.route.snapshot.paramMap.get('id');
    console.log(this.placeId);

    this.dataService.getpage(this.placeId).subscribe((data) => {
      this.place = data;
      console.log(this.place);
    });
  }
}
