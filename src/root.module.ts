import { BeforeApplicationShutdown, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { BookController } from './app.controller';
import { UserController } from './user.controller';
import { factoryController } from './factory.controller';
import { UsersService } from './users.service';
import { StudentModule } from './student/student.module';
import { ExamModule } from './exam/exam.module';
import { StoreType } from './dto';
import { ParseDateOptions, ParseDatePipe } from './parse.date.pipe';
import { APP_PIPE } from '@nestjs/core';
import { log } from 'console';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const isDev = true;


@Module({
  // StudentModule.register({ storeName: "JaydipModule", storeType: StoreType.File })
  imports: [StudentModule, ExamModule, MongooseModule.forRoot('mongodb+srv://jaydipramani23110:QDV5Hx4HPcPcxljM@database-demo.oamwyhv.mongodb.net/?retryWrites=true&w=majority'),ConfigModule.forRoot({ envFilePath: [".env"], cache: true, expandVariables: true, isGlobal: true})],
  controllers: [BookController, UserController, factoryController],
  // providers: [{provide: UserController, useClass: UserController}],  
  // providers:[UserController],
  // providers:[{provide: "store", useClass: UserController}],
  // providers: [UserController,{provide: "store", useClass: UserController}],
  // providers: [UserController,{provide: "store", useExisting: UserController}],
  // providers:[{provide: "DATABASE_NAME", useValue: "DB_Name"}],
  // providers:[{provide: "DATABASE_NAME", useValue: "DB_NAME"},{provide: "array", useValue: ['jaydip','new One']},{provide: "object", useValue: {'name':'jaydip','category':'new One'}}],
  providers: [{
    provide: 'factory', useFactory: (key) => {
      console.log(key)
      return isDev ? UserController : BookController
    }, inject: [UserController]
  },
    UserController, UsersService, { provide: ParseDateOptions, useValue: { fromTimeStamp: false } }],
  exports: []
})
export class RootModule implements OnApplicationBootstrap, BeforeApplicationShutdown, OnApplicationShutdown {
  constructor() {
    console.log("App Root Module")
  }

  onApplicationBootstrap() {
    log('application boot')
  }

  beforeApplicationShutdown(signal?: string) {
    log('before', signal)
  }

  onApplicationShutdown(signal?: string) {
    log('shutdown', signal)
  }
}
