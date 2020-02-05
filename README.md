# optional-js-flow
JavaScript Optional type for functional programming with Flow

[![version][version-badge]][package]
[![build][build]][circleci]
[![coverage][coverage]][codecov]
[![MIT License][license-badge]][license]

## Installation
    npm install --save optional-js-flow
    
## Import library
    import OptionalFactory from 'optional-js-flow';
    import type { Optional } from 'optional-js-flow';
    
## Create Optional type
    OptionalFactory.makeOptionalOf<T>(value: T | null | void): Optional<T>
    OptionalFactory.makeEmptyOptional<T>(): Optional<T>

## Use Optional type

    map<U>(map: (value: T) => U): Optional<U>;
    orElse(elseValue: T): T;
    ifPresent(consume: (value: T) => void): void;
    orElseSupplyValue(supplyElseValue: () => T): T;
    ifPresentOrElse(consume: (value: T) => void, performAction: () => void): void;
    filter(isTrue: (value: T) => boolean): Optional<T>;
    flatMap<U>(map: (value: T) => Optional<U>): Optional<U>;  

## License
MIT License

[license-badge]: https://img.shields.io/badge/license-MIT-green
[license]: https://github.com/pksilen/optional-js-flow/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/optional-js-flow.svg?style=flat-square
[package]: https://www.npmjs.com/package/optional-js-flow
[build]: https://img.shields.io/circleci/project/github/pksilen/optional-js-flow/master.svg?style=flat-square
[circleci]: https://circleci.com/gh/pksilen/optional-j-flows/tree/master
[coverage]: https://img.shields.io/codecov/c/github/pksilen/optional-js-flow/master.svg?style=flat-square
[codecov]: https://codecov.io/gh/pksilen/optional-js-flow
