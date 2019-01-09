import { NgModule, ModuleWithProviders } from '@angular/core';
import { TestComponent } from 'projects/named-routes-test-app/src/app/lazy/test/test.component';
import { INamedRoute } from 'ngx-named-routes';
import { RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { LazyComponent } from 'projects/named-routes-test-app/src/app/lazy/lazy.component';

export const routes: Array<INamedRoute> = [
    {
        path: '',
        // redirectTo: 'test',
        component: LazyComponent,
    },
    {
        path: 'test',
        name: 'lazy.test',
        component: TestComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class LazyRoutingModule {
    public static components = [LazyComponent];

    public constructor() { console.log('inside lazy routing module'); }
}
