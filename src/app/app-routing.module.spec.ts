import { routes } from './app-routing.module';
import { HomeComponent } from './home/home.component';

describe('App routing test', () => {
  it('should have a home route', () => {
    expect(routes).toContain({ path: '', component: HomeComponent, pathMatch: 'full' });
  });
});

