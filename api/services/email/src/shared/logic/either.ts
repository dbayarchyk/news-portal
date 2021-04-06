enum EitherType {
  Left = "Left",
  Right = "Right",
}

class EitherConstructor<Left, Right, Type extends EitherType> {
  private constructor(
    private readonly type: EitherType,
    public readonly value: Type extends EitherType.Left ? Left : Right
  ) {}

  public static mergeInOne<L1, R1>(values: [Either<L1, R1>]): Either<L1, [R1]>;
  public static mergeInOne<L1, R1, L2, R2>(
    values: [Either<L1, R1>, Either<L2, R2>]
  ): Either<L1 | L2, [R1, R2]>;
  public static mergeInOne<L1, R1, L2, R2, L3, R3>(
    values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>]
  ): Either<L1 | L2 | L3, [R1, R2, R3]>;
  public static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4>(
    values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>, Either<L4, R4>]
  ): Either<L1 | L2 | L3 | L4, [R1, R2, R3, R4]>;
  public static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5>(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>
    ]
  ): Either<L1 | L2 | L3 | L4 | L5, [R1, R2, R3, R4, R5]>;
  public static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6>(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>
    ]
  ): Either<L1 | L2 | L3 | L4 | L5 | L6, [R1, R2, R3, R4, R5, R6]>;
  public static mergeInOne<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7
  >(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>
    ]
  ): Either<L1 | L2 | L3 | L4 | L5 | L6 | L7, [R1, R2, R3, R4, R5, R6, R7]>;
  public static mergeInOne<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7,
    L8,
    R8
  >(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>,
      Either<L8, R8>
    ]
  ): Either<
    L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8,
    [R1, R2, R3, R4, R5, R6, R7, R8]
  >;
  public static mergeInOne<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7,
    L8,
    R8,
    L9,
    R9
  >(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>,
      Either<L8, R8>,
      Either<L9, R9>
    ]
  ): Either<
    L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9,
    [R1, R2, R3, R4, R5, R6, R7, R8, R9]
  >;
  public static mergeInOne<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7,
    L8,
    R8,
    L9,
    R9,
    L10,
    R10
  >(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>,
      Either<L8, R8>,
      Either<L9, R9>,
      Either<L10, R10>
    ]
  ): Either<
    L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10,
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]
  >;
  public static mergeInOne<L, R>(either: Array<Either<L, R>>): Either<L, R[]>;
  public static mergeInOne(eithers: Array<Either<unknown, unknown>>) {
    return eithers.reduce(
      (res: Either<unknown, Array<unknown>>, v) =>
        v.chain((v) => res.map((res) => res.concat([v]))),
      EitherConstructor.right<unknown, Array<unknown>>([])
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public static merge = EitherConstructor.mergeInOne;

  public static mergeInMany<L1, R1>(
    eithers: [Either<L1, R1>]
  ): Either<Array<L1>, [R1]>;
  public static mergeInMany<L1, R1, L2, R2>(
    eithers: [Either<L1, R1>, Either<L2, R2>]
  ): Either<Array<L1 | L2>, [R1, R2]>;
  public static mergeInMany<L1, R1, L2, R2, L3, R3>(
    eithers: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>]
  ): Either<Array<L1 | L2 | L3>, [R1, R2, R3]>;
  public static mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4>(
    eithers: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>, Either<L4, R4>]
  ): Either<Array<L1 | L2 | L3 | L4>, [R1, R2, R3, R4]>;
  public static mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5>(
    eithers: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>
    ]
  ): Either<Array<L1 | L2 | L3 | L4 | L5>, [R1, R2, R3, R4, R5]>;
  public static mergeInMany<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6>(
    eithers: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>
    ]
  ): Either<Array<L1 | L2 | L3 | L4 | L5 | L6>, [R1, R2, R3, R4, R5, R6]>;
  public static mergeInMany<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7
  >(
    eithers: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>
    ]
  ): Either<
    Array<L1 | L2 | L3 | L4 | L5 | L6 | L7>,
    [R1, R2, R3, R4, R5, R6, R7]
  >;
  public static mergeInMany<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7,
    L8,
    R8
  >(
    eithers: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>,
      Either<L8, R8>
    ]
  ): Either<
    Array<L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8>,
    [R1, R2, R3, R4, R5, R6, R7, R8]
  >;
  public static mergeInMany<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7,
    L8,
    R8,
    L9,
    R9
  >(
    eithers: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>,
      Either<L8, R8>,
      Either<L9, R9>
    ]
  ): Either<
    Array<L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9>,
    [R1, R2, R3, R4, R5, R6, R7, R8, R9]
  >;
  public static mergeInMany<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7,
    L8,
    R8,
    L9,
    R9,
    L10,
    R10
  >(
    eithers: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>,
      Either<L8, R8>,
      Either<L9, R9>,
      Either<L10, R10>
    ]
  ): Either<
    Array<L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10>,
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]
  >;
  public static mergeInMany<L, R>(
    eithers: Array<Either<L, R>>
  ): Either<L[], R[]>;
  public static mergeInMany(eithers: Array<Either<unknown, unknown>>) {
    return eithers.reduce(
      (
        mergedEither: Either<Array<unknown>, Array<unknown>>,
        currentEither
      ): Either<Array<unknown>, Array<unknown>> => {
        if (mergedEither.isLeft()) {
          return currentEither.isLeft()
            ? EitherConstructor.left(
                mergedEither.value.concat([currentEither.value])
              )
            : mergedEither;
        }

        return currentEither.isLeft()
          ? EitherConstructor.left([currentEither.value])
          : (currentEither.chain((v) =>
              mergedEither.map((res) => [...res, v])
            ) as Either<Array<unknown>, Array<unknown>>);
      },
      EitherConstructor.right<Array<unknown>, Array<unknown>>([])
    );
  }

  public static right<Left, Right>(value: Right): Either<Left, Right> {
    return new EitherConstructor<Left, Right, EitherType.Right>(
      EitherType.Right,
      value
    );
  }

  public static left<Left, Right>(value: Left): Either<Left, Right> {
    return new EitherConstructor<Left, Right, EitherType.Left>(
      EitherType.Left,
      value
    );
  }

  public isLeft(): this is EitherConstructor<Left, Right, EitherType.Left> {
    return this.type === EitherType.Left;
  }

  public isRight(): this is EitherConstructor<Left, Right, EitherType.Right> {
    return this.type === EitherType.Right;
  }

  public mapRight<NewRight>(f: (r: Right) => NewRight): Either<Left, NewRight> {
    return this.map(f);
  }

  public mapLeft<NewLeft>(f: (l: Left) => NewLeft): Either<NewLeft, Right> {
    if (this.isLeft()) {
      return EitherConstructor.left<NewLeft, Right>(f(this.value as Left));
    }

    return EitherConstructor.right<NewLeft, Right>(this.value as Right);
  }

  public map<NewRight>(
    mapper: (value: Right) => NewRight
  ): Either<Left, NewRight> {
    if (this.isLeft()) {
      return EitherConstructor.left<Left, NewRight>(this.value as Left);
    }

    const mappedValue = mapper(this.value as Right);

    return EitherConstructor.right<Left, NewRight>(mappedValue);
  }

  public chain<NewLeft, NewRight>(
    fn: (value: Right) => Either<NewLeft, NewRight>
  ): Either<NewLeft | Left, NewRight> {
    if (this.isLeft()) {
      return EitherConstructor.left<Left, NewRight>(this.value as Left);
    }

    return fn(this.value as Right);
  }
}

export type Either<Left, Right> =
  | EitherConstructor<Left, Right, EitherType.Left>
  | EitherConstructor<Left, Right, EitherType.Right>;

export const {
  mergeInOne,
  mergeInMany,
  left,
  right,
} = EitherConstructor;
