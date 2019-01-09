import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';

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

    private __named_routes: {[key: string]: any} = {};

    public constructor(private __router: Router) {}

    public loadRoutes(child_route?: IChildRoute): {[key: string]: any} {
        let routes = [];
        routes = child_route ? child_route.routes : JSON.parse(JSON.stringify(this.__router.config, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (routes.indexOf(value) !== -1) {
                    try {
                        return JSON.parse(JSON.stringify(value));
                    } catch (error) {
                        return;
                    }
                }
                routes.push(value);
            }

            return value;
        }));
        for (let route of routes) {
            if (route.name && !this.__named_routes[route.name]) {
                let backslash_required: string;
                if (child_route && child_route.parent_path !== '') {
                    backslash_required = child_route.parent_path[0] === '/' ? '' : '/';
                    route.path = backslash_required + child_route.parent_path + '/' + route.path;
                } else {
                    backslash_required = route.path[0] === '/' ? '' : '/';
                    route.path = backslash_required + route.path;
                }
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
        // TODO: si no existe el nombre, llamar nuevamente a loadRoutes, porque el módulo puede haber sido cargado perezosamente
        // need preloading strategy PreloadAllModules
        let raw_route: string;
        let route: string;
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
        let route = '';
        for (let param_key in param_values) {
            route = raw_route.replace(':' + param_key, param_values[param_key]);
        }

        return route;
    }
}
