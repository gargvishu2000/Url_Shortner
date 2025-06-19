import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import { checkAuth } from "../utils/helper.js";
import HomePage from "../pages/homePage.jsx";

export const homePageRoute = createRoute({
    getParentRoute: ()=> rootRoute,
    path: '/',
    component: HomePage
})