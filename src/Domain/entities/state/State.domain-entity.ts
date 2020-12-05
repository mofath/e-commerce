import { Entity, Result, UniqueEntityID } from '../../../Shared';
import { validateStringLengthBetweenMaxAndMin } from '../../utils/validate-string-length.domain.util';
import {
  InitialStates,
  InitialStateValueObject,
} from '../../value-objects/state-initials/StateInitials.value-object';
import { ERROR_STATE_DESCRIPTION_LENGTH } from './StateErrors.domain.entity';
export const STATE_NAME_MIN_STRING_LENGTH = 3;
export const STATE_NAME_MAX_STRING_LENGTH = 27;
interface StateProps {
  description: string;
  initial: InitialStates;
}

export class State extends Entity<StateProps> {
  private constructor(props: StateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get description(): string {
    return this.props.description;
  }

  get initial(): InitialStates {
    return this.props.initial;
  }

  public static create(props: StateProps, id?: UniqueEntityID): Result<State> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      maxLength: STATE_NAME_MAX_STRING_LENGTH,
      minLength: STATE_NAME_MIN_STRING_LENGTH,
    });
    if (!isValidDescription) {
      return Result.fail<State>(ERROR_STATE_DESCRIPTION_LENGTH);
    }

    const initial = InitialStateValueObject.create(props.initial);
    if (initial.isFailure) {
      return Result.fail<State>(initial.error.toString());
    }
    return Result.ok<State>(
      new State(
        {
          description: props.description.toUpperCase(),
          initial: initial.getResult().value,
        },
        id,
      ),
    );
  }
}