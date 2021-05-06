import { IMapper, UniqueEntityID } from 'types-ddd';
import { ProductCategory as Aggregate } from '@domain/entities';
import { ProductCategory } from '../entities/product-category.schema';

export class ProductCategoryMapper
  implements IMapper<Aggregate, ProductCategory> {
  //
  toDomain(target: ProductCategory): Aggregate {
    return Aggregate.create(
      {
        description: target.description,
      },
      new UniqueEntityID(target.id),
    ).getResult();
  }
  //
  toPersistence(target: Aggregate): ProductCategory {
    return {
      id: target.id.toString(),
      description: target.description,
    };
  }
  //
}
