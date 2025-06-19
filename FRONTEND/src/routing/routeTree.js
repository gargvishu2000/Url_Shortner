import App from "../App";
import { createRootRoute } from "@tanstack/react-router";
import { homePageRoute } from "./homePage";
import { authRoute } from "./auth.route";
import { dashboardRoute } from "./dashboard";

export const rootRoute = createRootRoute({
    component: App 
})

export const routeTree = rootRoute.addChildren([homePageRoute, authRoute, dashboardRoute])