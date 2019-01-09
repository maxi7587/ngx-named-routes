import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxNamedRoutesService } from 'ngx-named-routes';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.css']
})
export class LazyComponent implements OnInit {
    public constructor(
        private ngxNamedRoutesService: NgxNamedRoutesService,
        private router: Router
    ) {
        console.log('inside lazy component constructor');
        let route = ngxNamedRoutesService.getRoute('lazy.test');
    }

    public ngOnInit() {
        console.log('in lazy component on init');
        this.router.navigate([this.ngxNamedRoutesService.getRoute('lazy.test')]);
    }
}
