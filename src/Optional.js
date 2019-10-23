// @flow

export interface Optional<T> {
  map<U>(map: (value: T) => U): Optional<U>;
  orElse(elseValue: T): T;
  ifPresent(consume: (value: T) => void): void;
  orElseSupplyValue(supplyElseValue: () => T): T;
  ifPresentOrElse(consume: (value: T) => void, performAction: () => void): void;
  filter(isTrue: (value: T) => boolean): Optional<T>;
  flatMap<U>(map: (value: T) => Optional<U>): Optional<U>;
}
