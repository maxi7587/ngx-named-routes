import { NgModule } from '@angular/core';
import { TestComponent } from 'projects/named-routes-test-app/src/app/lazy/test/test.component';
import { CommonModule } from '@angular/common';
import { LazyRoutingModule } from 'projects/named-routes-test-app/src/app/lazy/lazy-routing.module';
import { LazyComponent } from 'projects/named-routes-test-app/src/app/lazy/lazy.component';

@NgModule({
    declarations: [LazyComponent, TestComponent],
    imports: [
        CommonModule,
        LazyRoutingModule
    ]
})
export class LazyModule {
    // public constructor() {
    //     console.log('inside lazy module');
    // }
}
