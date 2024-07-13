import { FastifyInstance } from "fastify";
import { z } from "zod"
import { prisma } from "../lib/prisma";

export async function trips_routes(app: FastifyInstance) {

    app.post("/", (req, res) => {

        const { destination, starts_at, ends_at } = z.object({
            destination:z.string(),
            starts_at:z.coerce.date(),
            ends_at:z.coerce.date()
        }).parse(req.body);

        return prisma.trip.create({data:{destination,starts_at,ends_at}});
    });
}