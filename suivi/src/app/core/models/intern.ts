import { ISerializable } from '../interfaces/i-serializable';
import { Expose, plainToInstance, Type } from "class-transformer";
import 'reflect-metadata'
import { POE } from './poe';
export class Intern implements ISerializable<Intern>{
  public id?: number;
  @Expose()
  public name: string;
  @Expose()
  public firstName?: string;
  @Expose()
  public phoneNumber?: string;
  @Expose()
  public email?: string;
  @Expose()
  @Type(() => Date)
  public birthDate?: Date;
  @Expose()
  public address?: string;


  public constructor() {
    this.name = '';
  }
  deserialize(plainIntern: any): Intern {
    const asClass: Intern = plainToInstance(Intern, plainIntern, {excludeExtraneousValues:true});
    return asClass;
  }
}
