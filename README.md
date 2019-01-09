# NgxNamedRoutes

Easily add named routes to your Angular 7 projects.

## Features

- Use named routes with angular router
- Supports lazy loaded routes

## Project requirements

**IMPORTANT:** To use this library in projects with lazy loaded modules, you must enable `PreloadAllModules` preloading strategy the app router.

```
import { RouterModule, PreloadAllModules } from '@angular/router';

...

@NgModule({
    imports: [
        RouterModule.forRoot(app_routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
```

## Quick start

### 1 - Install NgxNamedRoutes

Using **npm**:

`npm install --save ngx-named-routes`

Using **yarn**:

`yarn add ngx-named-routes`

### 2 - Import NgxNamedRoutesService in your app module

```
import { NgxNamedRoutesService } from 'ngx-named-routes';

import: [
    ...
    NgxNamedRoutesService,
    ...
]
```

### 3 - Load named routes in your AppModule class constructor

Remember to do it after RouterConfigLoadEnd router event:

```
import { RouterConfigLoadEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

...

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
```

### 4 - Add names to your routes

You can add the route name directly in the routes array inside the routing module. Notice that you'll need to change the routes array type:


```
export const app_routes: Array<INamedRoute> = [
    {
        path: 'lazy',
        name: 'lazy',
        loadChildren: './lazy/lazy.module#LazyModule'
    },
    {
        path: 'login',
        name: 'login',
        children: [
            {
                path: 'reset_password',
                name: 'login.reset_password',
                loadChildren: './lazy/lazy.module#LazyModule'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'lazy'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(app_routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
```

**NOTE:** You don't need to add a name to all the routes defined in your router, just the ones you want to call by their name.

### 5 - You are ready to start calling your routes by their name

To call a route by its name, just import NgxNamedRoutesService in the component you are working on and call `getRoute` method:

```
import { Router } from '@angular/router';
import { NgxNamedRoutesService } from 'ngx-named-routes';

...

export class SomeComponent {
    public constructor(
        private router: Router,
        private ngxNamedRoutesService: NgxNamedRoutesService
    ) {}

    public goToTestView() {
        this.router.navigate([this.ngxNamedRoutesService.getRoute('lazy.test')]);
    }
}
```

Thats all, you can get any of your named routes using this method, **no matter if it's in an aeger or lazy loaded module**.

Hope you enjoy it! Issues and PRs are welcome!!!
