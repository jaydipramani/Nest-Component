import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Query, Req, UseFilters, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentDto } from "src/dto/studentdto";
import { log } from "console";
import { IdException } from "src/exception/id-exception";
import { IdExceptionFilter } from "src/exception/id-exception.filter";
import { HttpExceptionFilter } from "src/exception/http-exception.filter";
import { AppExceptionFilter } from "src/exception/app-exception.filter";
import { SerchInterceptor } from "src/interceptors/search-interceptor";

@Controller('/student')
export class studentController {

    constructor(private studentService: StudentService) {
    }

    @Post('/createStudent')
    @UseInterceptors(SerchInterceptor)
    AddStudent(@Body(new ValidationPipe(
        {
            // transform: true,
            // dismissDefaultMessages: true,
            // disableErrorMessages: true,
            // whitelist: true,
            // skipMissingProperties: true,
            // stopAtFirstError: true
        }
    )) student: StudentDto) {
        // log(student)
        return this.studentService.AddStudent(student)
    }
    @Post('/getStudent/:id')
    @UseFilters(IdExceptionFilter)
    GetStudent(@Param('id') id: number, @Req() request :Request) {
        console.log(request["ua"]);
        
        if(id<=0){
            throw new BadRequestException("Id is not specified");
        }
        return "Done"
    }
}