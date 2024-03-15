import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { log } from "console";
import { NextFunction } from "express";

export class AuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        log(token)
        if(token && verifyToken(token)){
            next();
            return
        }
        throw new UnauthorizedException();
    }
    
}

function verifyToken(token: any) {
    return true;
}
