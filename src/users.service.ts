import { Injectable } from "@nestjs/common";
export interface User{
    id: number,
    name: string,
    age: number,
}
const USERS = new  Map<number, User>();

@Injectable()
export class UsersService{

    AddUser(body : User){
        USERS.set(+body.id,body)
        return 'User Added.'
    }

    getUsers(){
        return Array.from(USERS).map(([_, user]) => user)
    }

    GetSpecificUser(id: number){
        console.log(USERS.get(id))
       return USERS.get(id)
    }

    updateUser(id: number,userData : User){
        USERS.set(id,userData)
        return 'Updated User'

     }

    DeleteUser(id: number){
       USERS.delete(+id)
        return 'Deleted User'
     }
}