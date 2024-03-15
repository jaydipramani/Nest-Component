import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StudentDto } from "src/dto/studentdto";

@Injectable()
export class StudentService{
    // constructor(@Inject('STORE_OPTIONS') private options :StoreOptions){
    //     console.log(options.storeName, options.storeType)
    // }
    constructor(private configService : ConfigService){
      const url =  this.configService.get<string>('url')
      console.log(url)
    }
    AddStudent(body : StudentDto){
        // USERS.set(+body.id,body)
        return body
    }
}