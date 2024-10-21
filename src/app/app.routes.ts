import { Routes } from '@angular/router';
import { HomeComponent } from './hame-page/home/home.component';
import { CategoryNameComponent } from './hame-page/categoriesSec/category-name/category-name.component';
import { CategoriesComponent } from './categories-page/categories/categories.component';
import { PricingComponent } from './pricing-page/pricing.component';
import { ContAboutComponent } from './about-page/cont-about/cont-about.component';
import { ContactUsComponent } from './contact-page/contact-us/contact-us.component';
import { PlacesComponent } from './service-profile-page/service-profile/places.component';
import { DashboardComponent } from './add-listing-page/dashboard/dashboard.component';
import { GbrBookListComponent } from './add-listing-page/advertisment/gbr-book-list.component';
import { LeftsideComponent } from './add-listing-page/profile-links/leftside.component';
import { FirstHalfComponent } from './add-listing-page/first-half-add-listing/first-half.component';
import { GbrProfileEdit } from './add-listing-page/gbr-profile-edit/gbr-profile-edit.component';
import { MapSectionComponent } from './service-profile-page/map-section/map-section.component';
import { MygyardGuard } from './mygyard.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: ContAboutComponent },
  { path: 'category/:categoryName', component: CategoryNameComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'contacts', component: ContactUsComponent },
  {path:'map', component:MapSectionComponent},
  { path: 'serviceProvider/:id', component: PlacesComponent },


  {
    path: 'profile',
    component: LeftsideComponent,canActivate:[MygyardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent ,canActivate:[MygyardGuard]},
      { path: 'ads', component: GbrBookListComponent ,canActivate:[MygyardGuard]},
      { path: 'first-add', component: FirstHalfComponent ,canActivate:[MygyardGuard]},
      { path: 'profile-edit', component: GbrProfileEdit ,canActivate:[MygyardGuard]},

      { path: '',redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },


  { path: '**', component: HomeComponent },
];
