import { ArgumentMetadata, BadRequestException, Injectable, Optional, PipeTransform } from "@nestjs/common";
import { log } from "console";

export class ParseDateOptions {
    fromTimeStamp: boolean;
    errorMsg?: string;
}


@Injectable()
export class ParseDatePipe implements PipeTransform {
    private fromTimeStamp: boolean;
    private errorMsg: string;
    constructor(private options?: ParseDateOptions) {
        this.fromTimeStamp = options?.fromTimeStamp !== undefined ? options.fromTimeStamp : false;
        this.errorMsg = options?.errorMsg !== undefined ? options.errorMsg : 'Invalid Date';
        log(options);
    }
    transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata

        const { data: isKeyGiven } = metadata;
        if (isKeyGiven) {
            value = value;
        } else {
            value = value['timeStamp']
        }

        const date = this.fromTimeStamp ? this.convertTimeStamp(value) : new Date(value)
        if (!date || isNaN(+date)) {
            throw new BadRequestException('Invalid date')
        }
        switch (metatype) {
            case Date:
                return date
                break;
            case String:
                return date.toISOString
                break;
            case Number:
                return date.getTime()
                break;
            default:
                return date
                break

        }
        log(metadata)
        return new Date(value);
    }
    private convertTimeStamp(timeStamp: string | number) {
        timeStamp = +timeStamp;
        const isSecond = !(timeStamp > (Date.now() + 24 * 60 * 60 * 1000) / 1000);
        return isSecond ? new Date(timeStamp * 1000) : new Date(timeStamp);
    }
}