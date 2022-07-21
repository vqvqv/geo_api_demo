import { z } from "zod";
import { Request } from "express";

const createLocationSchema = z.object({
    body: z.object({
        data: z.object({
            ip: z.string({
                required_error: "ip is required"
            }),
            city: z.string().optional(),
            country: z.string().optional()
        })
    })
});

const getLocationSchema = z.object({
    query: z.object({
        ip: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
        sip: z.string().optional(),
        scity: z.string().optional(),
        scountry: z.string().optional()
    })
});

const deleteLocationSchema = z.object({
    body: z.object({
        data: z.object({
            id: z.string({
                required_error: "Id is required"
            })
        })
    })
});

export interface updateLocSchema extends Request {
    search: {
        ip: String
    },
    update: {

    },
    filtered: Object
}

export interface locScheamaHeader extends Request {
    cookies: {
        "x-access-token": string,
        "x-rfsh-token": string
    }
}

export interface getLocSchema extends Request {
    filtered: Object
}

export interface updateLocationSchemaType extends Omit<getLocationSchemaType, "data" | "action"> {
    search: {
        id: string
    },
    update: Object
}

export interface getLocationSchemaTypeS extends locScheamaHeader {
    search: Object,
    sort: {
        [k:string]: 1 | -1
    }
}

export { getLocationSchema, createLocationSchema };

export type getLocationSchemaType = z.TypeOf<typeof getLocationSchema>;
export type createLocationSchemaType = z.TypeOf<typeof createLocationSchema>;
export type deleteLocationSchemaType = z.TypeOf<typeof deleteLocationSchema>;