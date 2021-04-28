import { BaseDomainEntity, UniqueEntityID } from 'types-ddd';
import { MonetaryValueObject } from '@domain/value-objects';

export interface ItemProps<T> extends BaseDomainEntity {
  orderId: UniqueEntityID;
  item: T;
  quantity: number;
  total: MonetaryValueObject;
}
