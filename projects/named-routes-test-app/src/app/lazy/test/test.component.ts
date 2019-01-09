import { Component, OnInit } from '@angular/core';
import { NgxNamedRoutesService } from 'ngx-named-routes';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    public constructor(private ngxNamedRoutesService: NgxNamedRoutesService) {
        console.log('inside lazy TEST component constructor');
        let route = ngxNamedRoutesService.getRoute('lazy.test');
    }

    public ngOnInit() {}
}
