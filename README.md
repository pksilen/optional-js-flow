# optionaljs
JavaScript Optional type for functional programming

[![version][version-badge]][package]
[![build][build]][circleci]
[![coverage][coverage]][codecov]
[![MIT License][license-badge]][license]

## Installation
    npm install --save optionaljs
    
## Create Optional type

    makeOptionalOf<T>(value: T | null | void): Optional<T>
    makeEmptyOptional<T>(): Optional<T>

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
[license]: https://github.com/pksilen/optionaljs/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/optionaljs.svg?style=flat-square
[package]: https://www.npmjs.com/package/optionaljs
[build]: https://img.shields.io/circleci/project/github/pksilen/optionaljs/master.svg?style=flat-square
[circleci]: https://circleci.com/gh/pksilen/optionaljs/tree/master
[coverage]: https://img.shields.io/codecov/c/github/pksilen/optionaljs/master.svg?style=flat-square
[codecov]: https://codecov.io/gh/pksilen/optionaljs
