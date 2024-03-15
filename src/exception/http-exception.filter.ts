import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { join } from "path";
import { json } from "stream/consumers";

export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception:HttpException,host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const message = exception.message;
        const body = {
            statusCode:status,
            timestamp:new Date().toISOString(),
            path:request.url,
            method:request.method,
            message
        }
        this.writeHttpLog(body)
        response.status(status).json(body)

    }
    private async writeHttpLog(data: Record<string, any>) {
        const LOGS_DIR = join(__dirname, `${Date.now()}-logs.json`);

        try{
            await writeFile(LOGS_DIR, JSON.stringify(data))
        }catch(err){

        }
    }
}