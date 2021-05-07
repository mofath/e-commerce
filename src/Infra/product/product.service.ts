import { RegisterProductCategoryUseCase } from '@app/register-product-category-use-case/register-product-category.use-case';
import { RegisterProductUseCase } from '@app/register-product-use-case/register-product.use-case';
import { RegisterTagUseCase } from '@app/register-tag-use-case/register-tag.use-case';
import { RegisterProductCategoryDto } from './dto/register-product-category.dto';
import { RegisterProductDto } from './dto/register-product.dto';
import { RegisterTagDto } from './dto/register-tag.dto';
import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @Inject(RegisterProductCategoryUseCase)
    private readonly registerProductCategoryUseCase: RegisterProductCategoryUseCase,
    @Inject(RegisterTagUseCase)
    private readonly registerTagUseCase: RegisterTagUseCase,
    @Inject(RegisterProductUseCase)
    private readonly registerProductUseCase: RegisterProductUseCase,
  ) {}

  async registerProductCategory(
    dto: RegisterProductCategoryDto,
  ): Promise<void> {
    const result = await this.registerProductCategoryUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async registerTag(dto: RegisterTagDto): Promise<void> {
    const result = await this.registerTagUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async registerProduct(dto: RegisterProductDto): Promise<void> {
    const result = await this.registerProductUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }
}