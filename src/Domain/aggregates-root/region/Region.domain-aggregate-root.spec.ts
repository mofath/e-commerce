import { Result, UniqueEntityID } from 'types-ddd';
import {
  InitialStateValueObject,
  MonetaryValueObject,
} from '@domain/value-objects';
import { Currency } from '../../value-objects/monetary/Currency.value-object';
import { Region } from './Region.domain-aggregate-root';
import { RegionProps } from './Region.domain-aggregate-root-interface';
import { ERROR_REGION_DESCRIPTION_LENGTH } from './RegionErrors.domain';
import { RegionId } from './RegionId.domain-aggregate-root';
import { City, StateId } from '../../entities';

describe('Region.domain-aggregate-root', () => {
  const makePrice = (value: number): Currency => {
    return Currency.create({
      locale: 'BR',
      symbol: 'BRL',
      value,
    }).getResult();
  };
  const makeSut = (
    props?: RegionProps,
    id?: UniqueEntityID,
  ): Result<Region> => {
    return Region.create(
      {
        description: props?.description ?? 'Valid Description',
        freightPrice:
          props?.freightPrice ??
          MonetaryValueObject.create(makePrice(10)).getResult(),
        isActive: props?.isActive,
        city: City.create({
          geoCode: 0,
          name: 'Valid name',
          stateId: StateId.create(),
          stateInitial: InitialStateValueObject.create('RJ').getResult(),
        }).getResult(),
      },
      id,
    );
  };

  it('Should create a valid region ', () => {
    const regionCreated = makeSut();
    expect(regionCreated.isFailure).toBe(false);
    expect(regionCreated.getResult().description).toBe('Valid Description');
    expect(regionCreated.getResult().id).not.toBeUndefined();
    expect(regionCreated.getResult().id).not.toBeNull();
    expect(regionCreated.getResult().isActive).toBe(true);
    expect(regionCreated.getResult().freightPrice.value).toBe(10);
    expect(regionCreated.getResult().isDeleted).toBe(false);
  });

  it('Should deactivate with success a region ', () => {
    const regionCreated = makeSut().getResult();
    expect(regionCreated.isActive).toBe(true);
    expect(regionCreated.isDeleted).toBe(false);
    regionCreated.deactivate();
    expect(regionCreated.isActive).toBe(false);
    expect(regionCreated.isDeleted).toBe(false);
  });

  it('Should active with success a region ', () => {
    const regionCreated = makeSut({
      description: 'Valid description',
      freightPrice: MonetaryValueObject.create(makePrice(11)).getResult(),
      isActive: false,
      city: City.create({
        geoCode: 0,
        name: 'Valid name',
        stateId: StateId.create(),
        stateInitial: InitialStateValueObject.create('RJ').getResult(),
      }).getResult(),
    }).getResult();
    expect(regionCreated.isActive).toBe(false);
    expect(regionCreated.isDeleted).toBe(false);
    regionCreated.activate();
    expect(regionCreated.isActive).toBe(true);
    expect(regionCreated.isDeleted).toBe(false);
  });

  it('Should active with success a region ', () => {
    const createdId = RegionId.create().id;
    const regionCreated = makeSut(
      {
        description: 'Valid description',
        freightPrice: MonetaryValueObject.create(makePrice(11)).getResult(),
        city: City.create({
          geoCode: 0,
          name: 'Valid name',
          stateId: StateId.create(),
          stateInitial: InitialStateValueObject.create('RJ').getResult(),
        }).getResult(),
      },
      createdId,
    ).getResult();
    expect(regionCreated.id.toString()).toBe(createdId.toString());
  });

  it('Should fail if provide a short description ', () => {
    const regionResult = makeSut({
      description: 'a',
      freightPrice: MonetaryValueObject.create(makePrice(15)).getResult(),
      city: City.create({
        geoCode: 0,
        name: 'Valid name',
        stateId: StateId.create(),
        stateInitial: InitialStateValueObject.create('RJ').getResult(),
      }).getResult(),
    });
    expect(regionResult.isFailure).toBe(true);
    expect(regionResult.error).toBe(ERROR_REGION_DESCRIPTION_LENGTH);
  });

  it('Should fail if provide a long description ', () => {
    const regionResult = makeSut({
      description:
        'this_is_a_long_region_description_to_validate_max_length_description_error',
      freightPrice: MonetaryValueObject.create(makePrice(15)).getResult(),
      city: City.create({
        geoCode: 0,
        name: 'Valid name',
        stateId: StateId.create(),
        stateInitial: InitialStateValueObject.create('RJ').getResult(),
      }).getResult(),
    });

    expect(regionResult.isFailure).toBe(true);
    expect(regionResult.error).toBe(ERROR_REGION_DESCRIPTION_LENGTH);
  });
});
