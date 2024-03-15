import { BeforeApplicationShutdown, Module, OnApplicationBootstrap, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ExamService } from './exam.service';
import { log } from 'console';

@Module({
    imports : [],
    controllers : [],
    providers : [ExamService],
    exports : [ExamService]
})
export class ExamModule implements OnModuleInit, OnModuleDestroy{

    onModuleDestroy() {
        log('module destroyed')
    }
    onModuleInit() {
        log('module init')
    }
}
