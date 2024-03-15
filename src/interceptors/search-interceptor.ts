import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { log } from "console";
import { tap } from "rxjs";

export class SerchInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {

        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        console.log(request.body);
        
        return next.handle().pipe(tap((result) => {
            log(result)
        }));
    }

}