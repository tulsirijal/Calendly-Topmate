import { NextFunction, Request,Response } from "express";
import { badRequestError, unauthorizedError } from "../utils/api-error.js";

export async function auth(req:Request, _res:Response,next:NextFunction){
    const userId = req.headers["x-user-id"];
    if(!userId || Array.isArray(userId)){
        throw unauthorizedError("x-user-id is required");
    }

    const numberUserId = Number(userId);
    if(Number.isNaN(numberUserId)){
        throw badRequestError("user id must be a valid positive integer");
    }    

    req.userId = numberUserId;
    next(); 
}