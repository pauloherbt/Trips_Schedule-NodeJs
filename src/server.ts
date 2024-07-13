import fastify from "fastify";
import { trips_routes } from "./routes/trips";

const app = fastify();

app.listen({
    port:3333,
}).then(()=>console.log("Http Server Running "));

app.register(trips_routes,{prefix:'trips'})
