import {Express} from "express";

export class RouteSingleton {
    private static instance: RouteSingleton = new RouteSingleton();

    public a = 0;
    private routeArr: Function[] = [];

    constructor(){
        if(RouteSingleton.instance){
            throw "Singleton cannot be initialized by constructor";
        }
    }

    public static getInstance(){
        return RouteSingleton.instance;
    }

    public addRoute(route: (app: Express)=> void){
        // console.log("Added route: ", route);
        this.routeArr[this.a] = route;
        this.a++;
    }

    public getRoutes(){
        return this.routeArr;
    }

    public initRoutes(app: Express){
        for(let i in this.routeArr){
            this.routeArr[i](app);
        }
    }
}