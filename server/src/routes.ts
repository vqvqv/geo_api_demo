import userRoutes from "./routes/user.routes"
import locationRoutes from "./routes/location.routes"
import { RouteSingleton } from "./utils/routeSingleton";

let route = RouteSingleton.getInstance()
route.addRoute(userRoutes);
route.addRoute(locationRoutes);