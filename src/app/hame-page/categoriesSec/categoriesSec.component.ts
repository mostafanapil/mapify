import { Component , OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoriesSec',
  standalone: true,
  imports: [RouterOutlet , CategoriesSecComponent,RouterLink,CommonModule],
  templateUrl: './categoriesSec.component.html',
  styleUrl: './categoriesSec.component.css'
})
export class CategoriesSecComponent implements OnInit{
  categories: any[] = [];
  constructor(private _DataService: DataService) {}

  ngOnInit(): void {
    this._DataService.getCategories().subscribe((x) => {
      this.categories = x;
      console.log(this.categories);

    })

}
}
