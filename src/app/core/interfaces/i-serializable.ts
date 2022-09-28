export interface ISerializable<T> {
  deserialize(plainObject: any): T;
}
