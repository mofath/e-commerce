import {
  REGION_DESCRIPTION_MAX_STRING_LENGTH,
  REGION_DESCRIPTION_MIN_STRING_LENGTH,
} from './Region.domain-aggregate-root';
export const ERROR_REGION_DESCRIPTION_LENGTH = `Region Description length Should be between ${REGION_DESCRIPTION_MIN_STRING_LENGTH} and ${REGION_DESCRIPTION_MAX_STRING_LENGTH}`;
export const ERROR_FREIGHT_PRICE_FOR_REGION = 'Freight must be positive value';
