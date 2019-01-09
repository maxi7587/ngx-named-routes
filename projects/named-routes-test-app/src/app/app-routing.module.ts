import { NgModule, ModuleWithProviders } from '@angular/core';
import { INamedRoute } from 'ngx-named-routes';
import { RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';

export const app_routes: Array<INamedRoute> = [
    {
        path: 'lazy',
        name: 'lazy',
        loadChildren: './lazy/lazy.module#LazyModule'
    },
    {
        path: '**',
        redirectTo: 'lazy'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(app_routes, {
            preloadingStrategy: PreloadAllModules,
            onSameUrlNavigation: 'reload',
            paramsInheritanceStrategy: 'always'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
