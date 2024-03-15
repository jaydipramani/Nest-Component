import { DynamicModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StudentService } from './student.service';
import { StoreType } from 'src/dto';
import { studentController } from './student.controller';
import { AppExceptionFilter } from 'src/exception/app-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { userAgent, userAgentMiddelware } from 'src/middelwares/user-agent.middleware';
import { AuthMiddleware } from 'src/middelwares/auth.middelware';
import { ConfigModule } from '@nestjs/config';
const DEFAULT_STORE_NAME = 'DEFAULT_CACHE';
const DEFAULT_STORE_TYPE = StoreType.Memory
@Module({
    imports: [],
    controllers: [studentController],
    providers: [StudentService, { provide: APP_FILTER, useClass: AppExceptionFilter }],
    exports: [StudentService]
})
export class StudentModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(AuthMiddleware, userAgentMiddelware).exclude("").forRoutes("student", "student/createStudent", studentController, { path: "student", method: RequestMethod.POST })
    }

    // static register(options : StoreOptions): DynamicModule {
    //     const storeOptions =Object.assign(
    //         { storeName: DEFAULT_STORE_NAME,
    //         storeType: DEFAULT_STORE_TYPE},options,)
    //     return {

    //         module: StudentModule,
    //         controllers: [studentController],
    //         providers: [StudentService,
    //             {
    //                 provide: "STORE_OPTIONS",
    //                 useValue: storeOptions
    //             }]
    //     }
    // }
}
