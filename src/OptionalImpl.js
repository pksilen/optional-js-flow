// @flow

import type { Optional } from './Optional';

export default class OptionalImpl<T> implements Optional<T> {
  value: T | null | void;

  constructor(value: T | null | void) {
    this.value = value;
  }

  map<U>(map: (value: T) => U): Optional<U> {
    if (this.value) {
      return new OptionalImpl(map(this.value));
    }
    return new OptionalImpl();
  }

  orElse(elseValue: T): T {
    return this.value ? this.value : elseValue;
  }

  ifPresent(consume: (value: T) => void) {
    if (this.value) {
      consume(this.value);
    }
  }

  orElseSupplyValue(supplyElseValue: () => T): T {
    return this.value ? this.value : supplyElseValue();
  }

  ifPresentOrElse(consume: (value: T) => void, performAction: () => void) {
    if (this.value) {
      consume(this.value);
    } else {
      performAction();
    }
  }

  filter(isTrue: (value: T) => boolean): Optional<T> {
    return this.value && isTrue(this.value) ? new OptionalImpl(this.value) : new OptionalImpl();
  }

  flatMap<U>(map: (value: T) => Optional<U>): Optional<U> {
    return this.value ? map(this.value) : new OptionalImpl();
  }
}
