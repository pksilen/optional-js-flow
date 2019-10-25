import OptionalFactory from '../src/OptionalFactory';

describe('map', () => {
  it('should map existing optional value to new optional value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    // WHEN
    const mappedOptionalValue = optionalValue.map((value: number) => value * value);

    // THEN
    expect(mappedOptionalValue.value).toBe(100);
  });

  it('should map existing non-nullish falsy optional value to new optional value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(0);

    // WHEN
    const mappedOptionalValue = optionalValue.map((value: number) => value + 1);

    // THEN
    expect(mappedOptionalValue.value).toBe(1);
  });

  it('should map empty optional value to empty optional value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeEmptyOptional();

    // WHEN
    const mappedOptionalValue = optionalValue.map((value) => value * value);

    // THEN
    expect(mappedOptionalValue.value).toBe(undefined);
  });
});

describe('orElse', () => {
  it('should return existing optional value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    // WHEN
    const value = optionalValue.orElse(20);

    // THEN
    expect(value).toBe(10);
  });

  it('should return non-nullish falsy existing optional value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf('');

    // WHEN
    const value = optionalValue.orElse('not expected');

    // THEN
    expect(value).toBe('');
  });

  it('should return else value if optional is empty', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeEmptyOptional();

    // WHEN
    const value = optionalValue.orElse(20);

    // THEN
    expect(value).toBe(20);
  });
});

describe('ifPresent', () => {
  it('should execute given function if optional has value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(10);
    const consume = jest.fn();

    // WHEN
    optionalValue.ifPresent(consume);

    // THEN
    expect(consume).toHaveBeenCalledWith(10);
  });

  it('should execute given function if optional has non-nullish falsy value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(false);
    const consume = jest.fn();

    // WHEN
    optionalValue.ifPresent(consume);

    // THEN
    expect(consume).toHaveBeenCalledWith(false);
  });

  it('should not execute given function if optional is empty', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeEmptyOptional();
    const consume = jest.fn();

    // WHEN
    optionalValue.ifPresent(consume);

    // THEN
    expect(consume).not.toHaveBeenCalled();
  });
});

describe('orElseGet', () => {
  it('should return existing optional value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    // WHEN
    const value = optionalValue.orElseGet(() => 20);

    // THEN
    expect(value).toBe(10);
  });

  it('should return existing non-nullish falsy optional value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(0);

    // WHEN
    const value = optionalValue.orElseGet(() => 20);

    // THEN
    expect(value).toBe(0);
  });

  it('should return value from get function if optional is empty', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeEmptyOptional();

    // WHEN
    const value = optionalValue.orElseGet(() => 20);

    // THEN
    expect(value).toBe(20);
  });
});

describe('ifPresentOrElse', () => {
  it('should execute the given consumer function and not execute else action if value exists in optional', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(10);
    const consume = jest.fn();
    const performElseAction = jest.fn();

    // WHEN
    optionalValue.ifPresentOrElse(consume, performElseAction);

    // THEN
    expect(consume).toHaveBeenCalledWith(10);
    expect(performElseAction).not.toHaveBeenCalled();
  });

  it('should execute the given consumer function and not execute else action if non-nullish falsy value exists in optional', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf('');
    const consume = jest.fn();
    const performElseAction = jest.fn();

    // WHEN
    optionalValue.ifPresentOrElse(consume, performElseAction);

    // THEN
    expect(consume).toHaveBeenCalledWith('');
    expect(performElseAction).not.toHaveBeenCalled();
  });

  it('should execute given else action and not execute consume function if optional is empty', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeEmptyOptional();
    const consume = jest.fn();
    const performElseAction = jest.fn();

    // WHEN
    optionalValue.ifPresentOrElse(consume, performElseAction);

    // THEN
    expect(consume).not.toHaveBeenCalled();
    expect(performElseAction).toHaveBeenCalled();
  });
});

describe('filter', () => {
  it('should return the optional if given predicate returns true when existing value in optional', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    // WHEN
    const filteredOptionalValue = optionalValue.filter((value) => value >= 10);

    // THEN
    expect(filteredOptionalValue.value).toBe(10);
  });

  it('should return the optional if given predicate returns true when non-nullish falsy value exists in optional', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(false);

    // WHEN
    const filteredOptionalValue = optionalValue.filter((value) => !value);

    // THEN
    expect(filteredOptionalValue.value).toBe(false);
  });

  it('should return empty optional if given predicate returns false when existing value in optional ', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    // WHEN
    const filteredOptionalValue = optionalValue.filter((value) => value < 10);

    // THEN
    expect(filteredOptionalValue.value).toBe(undefined);
  });

  it('should return empty optional when optional is empty ', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeEmptyOptional();

    // WHEN
    const filteredOptionalValue = optionalValue.filter((value) => value > 0);

    // THEN
    expect(filteredOptionalValue.value).toBe(undefined);
  });
});

describe('flatMap', () => {
  it('should flatMap existing optional value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(10);

    // WHEN
    const flatMappedOptionalValue = optionalValue.flatMap((value: number) =>
      OptionalFactory.makeOptionalOf(value * value)
    );

    // THEN
    expect(flatMappedOptionalValue.value).toBe(100);
  });

  it('should flatMap existing non-nullish falsy optional value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeOptionalOf(0);

    // WHEN
    const flatMappedOptionalValue = optionalValue.flatMap((value: number) =>
      OptionalFactory.makeOptionalOf(value + 1)
    );

    // THEN
    expect(flatMappedOptionalValue.value).toBe(1);
  });

  it('should flatMap empty optional value to empty optional value', () => {
    // GIVEN
    const optionalValue = OptionalFactory.makeEmptyOptional();

    // WHEN
    const flatMappedOptionalValue = optionalValue.flatMap((value) =>
      OptionalFactory.makeOptionalOf(value * value)
    );

    // THEN
    expect(flatMappedOptionalValue.value).toBe(undefined);
  });
});
