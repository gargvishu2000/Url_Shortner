import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import HomePage from "../pages/Homepage.jsx";


export const homePageRoute = createRoute({
    getParentRoute: ()=> rootRoute,
    path: '/',
    component: HomePage
})
