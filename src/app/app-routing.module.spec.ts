import { routes } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';

describe('App routing test', () => {
  it('should have a home route', () => {
    expect(routes).toContain({ path: '', component: HomeComponent, pathMatch: 'full' });
  });
  it('should have a profile route', () => {
    expect(routes).toContain({ path: 'animal/:id', component: ProfileComponent })
  });
  it('should have an about route', () => {
    expect(routes).toContain({ path: 'about', component: AboutComponent })
  });
});

