import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-profile-img-slider',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './profile-img-slider.component.html',
  styleUrl: './profile-img-slider.component.css',
})
export class ProfileImgSliderComponent implements AfterViewInit, OnInit {
  slides: any[] = [];
  slideSmallImages: any[] = [];

  curSlide: number = 0;
  maxSlide: number = 0;

  get maxSlides() {
    return this.slides.length - 1;
  }

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }
    place: any;
    placeId: any;
  
   
  
    ngOnInit() {
      this.placeId = this.route.snapshot.paramMap.get('id');
      console.log(this.placeId);
  
      this.dataService.getpage(this.placeId).subscribe((data) => {
        this.place = data;
        console.log(this.place);
      });
    }
  

  ngAfterViewInit(): void {
    // assign values after loading the DOM
    this.slides = Array.from(document.querySelectorAll('.gbr__slide'));
    this.goToSlide(0);

    this.slideSmallImages = Array.from(
      document.querySelectorAll('.gbr__slide_img_small')
    );
    this.maxSlide = this.slides.length - 1;

    this.updateSlideBrightness(this.slideSmallImages);
  }

  goToSlide(curSlide: number): void {
    this.updateSlideBrightness(this.slideSmallImages);
    this.slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - curSlide) * 100}%)`;
    });
  }

  updateSlideBrightness(slides: any[]): void {
    slides.forEach((img, i) => {
      if (i == this.curSlide) {
        img.style.filter = 'brightness(100%)';
      } else {
        img.style.filter = 'brightness(50%)';
      }
    });
  }

  nextSlide(): void {
    if (this.curSlide == this.maxSlides) {
      this.curSlide = 0;
    } else {
      this.curSlide++;
    }
    this.goToSlide(this.curSlide);
  }

  prevSlide(): void {
    if (this.curSlide == 0) {
      this.curSlide = this.maxSlides;
    } else {
      this.curSlide--;
    }
    this.goToSlide(this.curSlide);
  }

  onSmallSlideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('gbr__slide_img_small')) {
      this.curSlide = this.slideSmallImages.indexOf(event.target);
      this.goToSlide(this.curSlide);
    } else {
      return;
    }
  }
}
