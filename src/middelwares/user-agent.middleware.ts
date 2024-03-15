import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { log } from "console";
import { Request, Response, NextFunction } from "express";
import { agent } from "supertest";

export function userAgent(req: Request, res: Response, next: NextFunction) {
    const ua = req.headers['user-agent'];
    log(ua);
    req["ua"] = ua;

    next();
}


export class userAgentMiddelware implements NestMiddleware {
    use(req: any, res: any, next: NextFunction) {
        const ua = req.headers['user-agent'];
        log(ua);
        if(!this.isUserAgentAcceptable(ua)) {
            throw new BadRequestException("User Agent is not acceptable");
        }
        req["ua"] = ua;

        next();
    }

    private isUserAgentAcceptable(ua: string){
        const acceptedUserAgent = ["Chrome", "Firefox", "Opera"]
        return acceptedUserAgent.some((agent) => ua.toLowerCase().includes(agent.toLowerCase()));
    }
    
}
