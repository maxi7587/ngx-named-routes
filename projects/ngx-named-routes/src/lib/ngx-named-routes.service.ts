import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';
import { cloneDeep } from 'lodash';

export interface IChildRoute {
    routes: Array<{[key: string]: any}>;
    parent_path: string;
}

export interface INamedRoute extends Route {
    name?: string;
    children?: Array<INamedRoute>;
    _loadedConfig?: {routes: Array<INamedRoute>; [key: string]: any};
}


@Injectable({
  providedIn: 'root'
})
export class NgxNamedRoutesService {

    public counter = 0;

    private __named_routes: {[key: string]: any} = {};

    public constructor(private __router: Router) {}

    public loadRoutes(child_route?: IChildRoute): {[key: string]: any} {
        this.counter ++;
        let routes = [];
        routes = child_route ? child_route.routes : cloneDeep(this.__router.config);
        for (let route of routes) {
            let backslash_required: string;
            if (child_route && ['', '/'].indexOf(child_route.parent_path) === -1) {
                backslash_required = child_route.parent_path[0] === '/' ? '' : '/';
                route.path = backslash_required + child_route.parent_path + (route.path !== '' ? '/' + route.path : '');
            } else {
                backslash_required = route.path[0] === '/' && route.path !== '' ? '' : '/';
                route.path = backslash_required + route.path;
            }
            if (route.name && !this.__named_routes[route.name]) {
                this.__named_routes[route.name] = { ...route };
            }
            if (route.children) {
                this.loadRoutes({routes: route.children, parent_path: route.path});
            }
            if (route._loadedConfig) {
                this.loadRoutes({routes: route._loadedConfig.routes, parent_path: route.path});
            }
        }

        return this.__named_routes;
    }

    public getRoute(name: string, param_values?: {[key: string]: string | number}): string {
        // note: need preloading strategy "PreloadAllModules" in project config
        let raw_route: string;
        if (!this.__named_routes[name]) {
            this.loadRoutes();

            raw_route = this.__named_routes[name].path;
            if (raw_route) {
                return this.fillRouteParams(raw_route, param_values);
            }
        } else {
            raw_route = this.__named_routes[name].path;

            return this.fillRouteParams(raw_route, param_values);
        }
    }

    private fillRouteParams(raw_route, param_values?): string {
        if (!param_values || param_values === {}) {
            return raw_route;
        }
        let route = raw_route;
        for (let param_key in param_values) {
            route = route.replace(':' + param_key, param_values[param_key]);
        }

        return route;
    }
}
