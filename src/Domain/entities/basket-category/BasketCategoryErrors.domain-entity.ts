import {
  BASKET_CATEGORY_CHANGE_LIMIT_MAX_VALUE,
  BASKET_CATEGORY_DESCRIPTION_MAX_STRING_LENGTH,
  BASKET_CATEGORY_DESCRIPTION_MIN_STRING_LENGTH,
} from './BasketCategory.domain-entity';
export const ERROR_BASKET_CATEGORY_DESCRIPTION_LENGTH = `Product Category Description length Should be between ${BASKET_CATEGORY_DESCRIPTION_MIN_STRING_LENGTH} and ${BASKET_CATEGORY_DESCRIPTION_MAX_STRING_LENGTH}`;
export const ERROR_BASKET_CATEGORY_MAX_VALUE = `Max change limit should be less than ${BASKET_CATEGORY_CHANGE_LIMIT_MAX_VALUE}`;
