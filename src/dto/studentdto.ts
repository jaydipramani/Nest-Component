import { Type } from "class-transformer";
import { ArrayMinSize, IsBoolean, IsEmail, IsIn, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class Location {
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    country: string;
}
export enum standered {
    first = 1,
    Second = 2,
    thired = 3
}
export class StudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsIn(Object.keys(standered))
    @IsOptional()
    std?: standered;

    @IsString({ each: true })
    @ArrayMinSize(1)
    hobbies: string[];

    @ValidateNested()
    @IsObject()
    @Type(() => Location)
    location: Location;
}

