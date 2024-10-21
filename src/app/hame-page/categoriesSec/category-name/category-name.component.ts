import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-name',
  standalone: true,
  imports: [CommonModule,RouterLink,CommonModule],
  templateUrl: './category-name.component.html',
  styleUrls: ['./category-name.component.css']
})
export class CategoryNameComponent implements OnInit {
  categoryName: any[] = [];
  heartedStates: boolean[] = [];
  categories: any[] = [];  
  currentCategory: any;    
  constructor(private _DataService: DataService, private _ActivatedRoute: ActivatedRoute) {}

ngOnInit(): void {
 

  this._ActivatedRoute.params.subscribe((params) => {
    let wordOfPath = params['categoryName'];
    console.log("Word of path: ", wordOfPath);

   
    this._DataService.getData(wordOfPath).subscribe((x) => {
      this.categoryName = x;
      console.log("Category Name: ", this.categoryName);

      this.heartedStates = new Array(this.categoryName.length).fill(false);
      const savedStates = localStorage.getItem('heartedStates');
      if (savedStates) {
        this.heartedStates = JSON.parse(savedStates);
      }
    });

 
    this._DataService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log("Categories: ", this.categories);

        this.currentCategory = this.categories.find(category => 
        category.name.toLowerCase() === wordOfPath.toLowerCase()
      );
    });
  });
}

  toggleHeart(index: number) {
    this.heartedStates[index] = !this.heartedStates[index];
    localStorage.setItem('heartedStates', JSON.stringify(this.heartedStates)); 
  }
  isActive = false;

  toggleClass() {
    this.isActive = !this.isActive;
  }

  selectedItem: string = 'Popularity'; 
  showItem(itemName: string) {
    this.selectedItem = itemName; 
    this.isActive = false; 
  }

  currentSlide: number = 1; 

  previousSlide() {
    if (this.currentSlide === 1) {
      this.currentSlide = 2; 
    } else {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.currentSlide === 2) {
      this.currentSlide = 1; 
    } else {
      this.currentSlide++;
    }
  }

  goToSlide(slideNumber: number) {
    this.currentSlide = slideNumber;
  }


}
