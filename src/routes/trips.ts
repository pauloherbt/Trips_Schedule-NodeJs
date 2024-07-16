import { FastifyInstance } from "fastify";
import { unknown, z } from "zod"
import { prisma } from "../lib/prisma";
import { resolve } from "path";

export async function trips_routes(app: FastifyInstance) {

    app.post("/", async (req, res) => {

        const { destination, starts_at, ends_at } = z.object({
            destination: z.string(),
            starts_at: z.coerce.date(),
            ends_at: z.coerce.date()
        }).parse(req.body);
        const result = await prisma.trip.create({ data: { destination, starts_at, ends_at } });
        res.status(201).type('application/json').send(result);
    });

    app.get('/', () => {
        return prisma.trip.findMany();
    })

    app.get('/:id',async (req,res)=>{
        const id = z.object({id:z.string().uuid()}).parse(req.params);
        return prisma.trip.findUniqueOrThrow({where:id}).catch((err)=>res.callNotFound())
    })

    app.put('/:id',async (req,res)=>{

        const id = z.object({
            id:z.string().uuid()
        }).parse(req.params)

        const newTripData=z.object({
            destination:z.optional(z.string()),
            starts_at: z.optional(z.coerce.date()),
            ends_at : z.optional(z.coerce.date()),
            is_confirmed: z.optional(z.coerce.boolean())
        }).parse(req.body)
        
        return prisma.trip.update({where:id,data:newTripData}).catch((err)=>res.callNotFound());
    })

    app.delete('/:id',async (req,res)=>{

        const id = z.object({
            id:z.string().uuid()
        }).parse(req.params)

        return prisma.trip.delete({where:id}).catch((error)=>res.callNotFound());
    })
}