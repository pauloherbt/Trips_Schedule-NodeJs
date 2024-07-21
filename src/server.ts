import fastify from "fastify";
import { tripsRoutes } from "./routes/trips";

const app = fastify();

app
  .listen({
    port: Number.parseInt(process.env.PORT as string),
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Http Server Running in port: " + app.addresses()[0].port);
  });
app.register(tripsRoutes, { prefix: "trips" });
