// @flow

import type { Optional } from './Optional';

export default class OptionalImpl<T> implements Optional<T> {
  value: T | null | void;

  constructor(value: T | null | void) {
    this.value = value;
  }

  map<U>(map: (value: T) => U): Optional<U> {
    if (this.value !== null && typeof this.value !== 'undefined') {
      return new OptionalImpl(map(this.value));
    }
    return new OptionalImpl();
  }

  orElse(elseValue: T): T {
    return this.value !== null && typeof this.value !== 'undefined' ? this.value : elseValue;
  }

  ifPresent(consume: (value: T) => void) {
    if (this.value !== null && typeof this.value !== 'undefined') {
      consume(this.value);
    }
  }

  orElseGet(getElseValue: () => T): T {
    return this.value !== null && typeof this.value !== 'undefined' ? this.value : getElseValue();
  }

  ifPresentOrElse(consume: (value: T) => void, performAction: () => void) {
    if (this.value !== null && typeof this.value !== 'undefined') {
      consume(this.value);
    } else {
      performAction();
    }
  }

  filter(isTrue: (value: T) => boolean): Optional<T> {
    return this.value !== null && typeof this.value !== 'undefined' && isTrue(this.value)
      ? new OptionalImpl(this.value)
      : new OptionalImpl();
  }

  flatMap<U>(map: (value: T) => Optional<U>): Optional<U> {
    return this.value !== null && typeof this.value !== 'undefined' ? map(this.value) : new OptionalImpl();
  }
}
