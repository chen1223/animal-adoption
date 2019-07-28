import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
            RouterModule.forRoot(routes),
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule
           ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
