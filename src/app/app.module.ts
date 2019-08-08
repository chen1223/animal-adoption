import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FilterSelectComponent } from './home/filter-select/filter-select.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faSearch, faMars, faVenus, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from './home/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterSelectComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faCaretDown);
    library.add(faSearch);
    library.add(faMars);
    library.add(faVenus);
    library.add(faQuestion);
  }
}
