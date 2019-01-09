import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'projects/named-routes-test-app/src/app/app-routing.module';
import { NgModule } from '@angular/core';
import { Router, RouteConfigLoadEnd, ChildrenOutletContexts } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgxNamedRoutesService } from 'ngx-named-routes';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NgxNamedRoutesService],
  bootstrap: [AppComponent]
})
export class AppModule {
    public constructor(
        private router: Router,
        private ngxNamedRoutesService: NgxNamedRoutesService,
    ) {
        router.events.pipe(filter(event => event instanceof RouteConfigLoadEnd)).subscribe(event => {
            ngxNamedRoutesService.loadRoutes();
        });
    }
}
