type ConvertTypesTsToLibTypes<T, S, N, B, A> = T extends string
	? S
	: T extends number
		? N
		: T extends boolean
			? B
			: A;

export type TypeToValidationLib<
	T,
	LibString,
	LibNumber = unknown,
	LibBoolean = unknown,
	LibAny = unknown,
> = {
	[P in keyof T]: ConvertTypesTsToLibTypes<
		T[P],
		LibString,
		LibNumber,
		LibBoolean,
		LibAny
	>;
};
