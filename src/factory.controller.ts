import { Controller, Get, Inject } from "@nestjs/common";

@Controller('/factory')
export class factoryController {
    constructor(@Inject('factory') private factory : any){
        console.log(factory)
    }
    @Get()
    getFactory(){
        return "factory";
    }
}