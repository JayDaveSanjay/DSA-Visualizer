import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlgorithmsComponent } from './algorithms/algorithms.component';
import { DataStructuresComponent } from './data-structures/data-structures.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'algorithms', component: AlgorithmsComponent },
  { path: 'data-structures', component: DataStructuresComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];