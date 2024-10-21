import { Component } from '@angular/core';
import { FooterComponent } from '../../hame-page/footer/footer.component';
import { CategoriesSecComponent } from '../../hame-page/categoriesSec/categoriesSec.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoriesSecComponent,FooterComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
