import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { IdException } from "./id-exception";

@Catch(IdException)
export class IdExceptionFilter implements ExceptionFilter {
    catch(exception: IdException, host: ArgumentsHost) {
        const error = {
            message: exception.message,
            error: "Id error"
        }
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(HttpStatus.BAD_REQUEST).json(error);
    }
}