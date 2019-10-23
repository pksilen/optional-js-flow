import OptionalFactory from '../src/OptionalFactory';

describe('map', () => {
  it('should map existing optional value to new optional value', () => {
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    const mappedOptionalValue = optionalValue.map((value: number) => value * value);

    expect(mappedOptionalValue.value).toBe(100);
  });

  it('should map empty optional value to empty optional value', () => {
    const optionalValue = OptionalFactory.makeEmptyOptional();

    const mappedOptionalValue = optionalValue.map((value) => value * value);

    expect(mappedOptionalValue.value).toBe(undefined);
  });
});

describe('orElse', () => {
  it('should return existing optional value', () => {
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    const value = optionalValue.orElse(20);

    expect(value).toBe(10);
  });

  it('should else value if optional is empty', () => {
    const optionalValue = OptionalFactory.makeEmptyOptional();

    const value = optionalValue.orElse(20);

    expect(value).toBe(20);
  });
});

describe('ifPresent', () => {
  it('should execute given function if optional has value', () => {
    const optionalValue = OptionalFactory.makeOptionalOf(10);
    const consume = jest.fn();

    optionalValue.ifPresent(consume);

    expect(consume).toHaveBeenCalledWith(10);
  });

  it('should not execute given function if optional is empty', () => {
    const optionalValue = OptionalFactory.makeEmptyOptional();
    const consume = jest.fn();

    optionalValue.ifPresent(consume);

    expect(consume).not.toHaveBeenCalled();
  });
});

describe('orElseSuppyValue', () => {
  it('should return existing optional value', () => {
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    const value = optionalValue.orElseSupplyValue(() => 20);

    expect(value).toBe(10);
  });

  it('should return value from supplier if optional is empty', () => {
    const optionalValue = OptionalFactory.makeEmptyOptional();

    const value = optionalValue.orElseSupplyValue(() => 20);

    expect(value).toBe(20);
  });
});

describe('ifPresentOrElse', () => {
  it('should execute the given consumer function if existing value in optional', () => {
    const optionalValue = OptionalFactory.makeOptionalOf(10);
    const consume = jest.fn();
    const performElseAction = jest.fn();

    optionalValue.ifPresentOrElse(consume, performElseAction);

    expect(consume).toHaveBeenCalledWith(10);
    expect(performElseAction).not.toHaveBeenCalled();
  });

  it('should execute given action if optional is empty', () => {
    const optionalValue = OptionalFactory.makeEmptyOptional();
    const consume = jest.fn();
    const performElseAction = jest.fn();

    optionalValue.ifPresentOrElse(consume, performElseAction);

    expect(consume).not.toHaveBeenCalled();
    expect(performElseAction).toHaveBeenCalled();
  });
});

describe('filter', () => {
  it('should return the optional if given predicate returns true when existing value in optional', () => {
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    const filteredOptionalValue = optionalValue.filter((value) => value >= 10);

    expect(filteredOptionalValue.value).toBe(10);
  });

  it('should return empty optional if given predicate returns false when existing value in optional ', () => {
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    const filteredOptionalValue = optionalValue.filter((value) => value < 10);

    expect(filteredOptionalValue.value).toBe(undefined);
  });

  it('should return empty optional when optional is empty ', () => {
    const optionalValue = OptionalFactory.makeEmptyOptional();

    const filteredOptionalValue = optionalValue.filter((value) => value > 0);

    expect(filteredOptionalValue.value).toBe(undefined);
  });
});

describe('flatMap', () => {
  it('should flatMap existing optional value', () => {
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    const flatMappedOptionalValue = optionalValue.flatMap((value: number) =>
      OptionalFactory.makeOptionalOf(value * value)
    );

    expect(flatMappedOptionalValue.value).toBe(100);
  });

  it('should flatMap empty optional value to empty optional value', () => {
    const optionalValue = OptionalFactory.makeEmptyOptional();

    const flatMappedOptionalValue = optionalValue.flatMap((value) =>
      OptionalFactory.makeOptionalOf(value * value)
    );

    expect(flatMappedOptionalValue.value).toBe(undefined);
  });
});
