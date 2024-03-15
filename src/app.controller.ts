import { Body, Controller, Delete, Get, Header, Headers, Inject, Param, Post, Put, Query, Req } from "@nestjs/common";
import { log } from "console";
import { Request } from "express";
import { UserController } from "./user.controller";

interface BookData{
    id: number,
    name: string
}

@Controller('book')
export class BookController{
    // constructor(@Inject(UserController) private userController :UserController){
        // console.log(userController)
    //   }

    //add
    @Post('/add')
    addBook() : String{
        return 'added book'
    }
    //delete
    @Delete('/delete')
    deleteBook():String{
        return 'deleted book'
    }
    //update
    @Put('/update')
    updateBook():String{
        return 'Updated Book'
    }
    //findAll
    @Get('/findAllBook')
    findAllBook(@Req() request: Request) : String {
        console.log(request.baseUrl)
        return 'find All Book'
    }
    //pass params and get 
    @Post('/params/:id/:name')
    getParams(@Param() params : Record<string,any>){
        log(params)
        return 'Sucessfully get'
    }
    //pass params and get specific
    @Post('/paramsSpecific/:id/:name')
    getParamsSpecific(@Param('id') param : number){
        log(param)
        return 'Sucessfully get'
    }
    //pass params and get object
    @Post('/paramsObject/:id/:name')
    getParamsObject(@Param() param : BookData){
        log(param.id)
        log(param.name)
        return 'Sucessfully get'
    }
    //pass query parameters
    @Post('/QueryParams')
    getQueryParams(@Query() query : Record<string,any>){
        log(query)
        return 'Sucessfully get'
    }
    @Post('/QueryObject')
    getQueryObject(@Query() query : BookData){
        log(query)
        return 'Sucessfully get'
    }
    //get headers
    @Post('/header')
    getHeader(@Headers() header:Record<string,any>){
        log(header)
        return 'Sucessfully get'
    }
    // get body
    @Post('/body')
    getBody(@Body() body : Record<string,any>){
        log(body)
        return'sucess'
    }
}