import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews: any[] = [];
  displayedReviews: any[] = [];
  selectedStars: number = 0;
  newName: string = '';
  newEmail: string = '';
  newComment: string = '';
  reviewsPerPage: number = 3;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { this.loadDefaultReviews();
    if (this.isBrowser()) { 
      this.loadReviews();
    }}
    place: any;
    placeId: any;
  
   
  
 ngOnInit() {
      this.placeId = this.route.snapshot.paramMap.get('id');
      console.log('Place ID:', this.placeId);

      this.dataService.getpage(this.placeId).subscribe((data) => {
        this.place = data;
        console.log('Place Data:', this.place); 
      });
    }
  
  

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  loadDefaultReviews() {
    this.reviews = [

    ];
  }
  loadReviews() {
    if (this.isBrowser()) {
      const storedReviews = localStorage.getItem('reviews');
      if (storedReviews) {
        const loadedReviews = JSON.parse(storedReviews);
        this.reviews = [...this.reviews, ...loadedReviews];
      }
      this.displayedReviews = this.reviews.slice(0, this.reviewsPerPage);
    }
  }

  selectStar(star: number) {
    this.selectedStars = star;
  }

  submitReview() {
    if (this.newName && this.newComment && this.selectedStars > 0) {
      const newReview = {
        name: this.newName,
        image: '../../assets/1 (1).jpg',
        stars: Array(this.selectedStars).fill('fa-solid fa-star').concat(Array(5 - this.selectedStars).fill('fa-regular fa-star')),
        comment: this.newComment,
        timeAgo: 'Just now'
      };

      this.reviews.unshift(newReview);

      if (this.isBrowser()) {
        this.saveReviews();
      }

      this.displayedReviews = this.reviews.slice(0, this.reviewsPerPage);
      this.newName = '';
      this.newEmail = '';
      this.newComment = '';
      this.selectedStars = 0;
    } else {
      alert('Please fill in all the fields and select a rating.');
    }
  }

  saveReviews() {
    if (this.isBrowser()) {
      localStorage.setItem('reviews', JSON.stringify(this.reviews));
    }
  }

  deleteReview(index: number) {
    this.reviews.splice(index, 1);
    if (this.isBrowser()) {
      this.saveReviews();
    }
    this.displayedReviews = this.reviews.slice(0, this.reviewsPerPage);
  }

  loadMoreReviews() {
    const nextIndex = this.displayedReviews.length;
    const moreReviews = this.reviews.slice(nextIndex, nextIndex + this.reviewsPerPage);
    this.displayedReviews = this.displayedReviews.concat(moreReviews);
  }
}
