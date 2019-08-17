import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FilterSelectComponent } from './home/filter-select/filter-select.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown,
         faSearch,
         faMars,
         faVenus,
         faQuestion,
         faHome,
         faPhoneAlt,
         faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from './home/card/card.component';
import { ProfileComponent } from './profile/profile.component';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterSelectComponent,
    CardComponent,
    ProfileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    VirtualScrollerModule,
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
    library.add(faHome);
    library.add(faPhoneAlt);
    library.add(faAngleLeft);
  }
}
