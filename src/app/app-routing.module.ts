import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'animal/:id',
    component: ProfileComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [
            RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule
           ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
