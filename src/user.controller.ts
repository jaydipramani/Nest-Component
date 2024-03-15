import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Inject, Injectable, Param, ParseArrayPipe, ParseBoolPipe, ParseEnumPipe, ParseFloatPipe, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, Scope } from "@nestjs/common";
import { UserDto } from "./dto";
import { UsersService } from "./users.service";
import { log } from "console";
import { timestamp } from "rxjs";
import { ParseDatePipe } from "./parse.date.pipe";

let USERS = [];

export enum UserType {
    Student = 1,
    Employe,
}

// @Injectable( {scope: Scope.TRANSIENT})
@Controller('/user')
export class UserController {

    constructor(private usersService: UsersService) {
    }

    @Post('/time')
    CheckTime(@Body('timeStamp',ParseDatePipe) timeStamp: Date) {
        log(timeStamp)
        return 'Time'
    }
    @Post() 
    AddUser(@Body() body: UserDto) {
        this.usersService.AddUser(body)
        return 'User Added.'
    }

    @Get()
    GetUser() {
        return this.usersService.getUsers()
    }

    @Get(':id')
    getSpecificUser(@Param('id', ParseIntPipe) id: number, @Query('id', new ParseArrayPipe({ items: Number })) idQuery: number[], @Body('type', new ParseEnumPipe(UserType)) type: UserType) {
        log(typeof id, this.usersService.GetSpecificUser(+id))
        log(type)
        log(idQuery)
        return this.usersService.GetSpecificUser(+id)
        return this.usersService.GetSpecificUser(+id)
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() userData: UserDto) {
        this.usersService.updateUser(+id, userData)
        return 'Updated User'

    }
    @Delete(':id')
    DeleteUser(@Param('id') id: number) {
        this.usersService.DeleteUser(+id)
        return 'Deleted User'
    }


}