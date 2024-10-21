import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-popular-listing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './popular-listing.component.html',
  styleUrls: ['./popular-listing.component.css']
})
export class PopularListingComponent implements OnInit {
  
  listing: any[] = [];
  currentIndex = 0;
  itemsPerPage = 3; // الافتراضي
  hovered = false;

  constructor(private _DataService: DataService) {}

  ngOnInit(): void {
    this._DataService.getinfo().subscribe((x) => {
      this.listing = x;
      this.loadFavorites();
      this.updateItemsPerPage();
      window.addEventListener('resize', this.updateItemsPerPage.bind(this)); // تحديث عند تغيير حجم الشاشة
    });
  }

  updateItemsPerPage() {
    const width = window.innerWidth;
    if (width < 768) {
      this.itemsPerPage = 1; // إذا كانت الشاشة أقل من 768
    } else if (width < 1200) {
      this.itemsPerPage = 2; // إذا كانت الشاشة أقل من 1200
    } else {
      this.itemsPerPage = 3; // الافتراضي
    }
    this.currentIndex = 0; // إعادة تعيين الفهرس إلى الصفر عند تغيير عدد العناصر المعروضة
  }

  loadFavorites() {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const favoriteItems = JSON.parse(favorites);
      this.listing.forEach(item => {
        item.isFavorite = favoriteItems.includes(item.title);
      });
    }
  }

  saveFavorites() {
    const favoriteItems = this.listing.filter(item => item.isFavorite).map(item => item.title);
    localStorage.setItem('favorites', JSON.stringify(favoriteItems));
  }

  get displayedItems() {
    const totalItems = this.listing.length;
    
    if (window.innerWidth < 768) {
      return [this.listing[this.currentIndex]]; // عرض عنصر واحد فقط للشاشات الصغيرة
    }
    
    return this.listing.slice(this.currentIndex, this.currentIndex + this.itemsPerPage).concat(
      this.listing.slice(0, Math.max(0, this.currentIndex + this.itemsPerPage - totalItems))
    );
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.listing.length) % this.listing.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.listing.length;
  }

  toggleFavorite(item: any): void {
    item.isFavorite = !item.isFavorite;
    this.saveFavorites();
  }

  onMouseEnter() {
    this.hovered = true;
  }

  onMouseLeave() {
    this.hovered = false;
  }
}
