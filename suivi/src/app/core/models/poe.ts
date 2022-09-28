import { Expose, plainToInstance, Type } from "class-transformer";
import { ISerializable } from "../interfaces/i-serializable";
import 'reflect-metadata'
export class POE implements ISerializable<POE>{
  public id?: number;
  @Expose()
  public name?: string;
  @Expose()
  @Type(() => Date)
  public startDate?: Date;
  @Expose()
  @Type(() => Date)
  public endDate?: Date;

  @Expose()
  public interns?: POE[];

  public deserialize(plainPOE: any): POE {
    const asClass: POE = plainToInstance(POE, plainPOE, {excludeExtraneousValues:true});
    return asClass;
  }
}
