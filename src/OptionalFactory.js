// @flow

import OptionalImpl from './OptionalImpl';
import type { Optional } from './Optional';

export default class OptionalFactory {
  static makeEmptyOptional<T>(): Optional<T> {
    return new OptionalImpl();
  }

  static makeOptionalOf<T>(value: T | null | void): Optional<T> {
    return new OptionalImpl(value);
  }
}
