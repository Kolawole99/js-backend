import { type ZodTypeAny, z } from "zod";

export const zodInputStringToNumberPipe = (zodPipe: ZodTypeAny) =>
	z
		.string()
		.transform((value) => (value === "" ? null : value))
		.nullable()
		.refine((value) => value === null || !Number.isNaN(Number(value)), {
			message: "Invalid Number",
		})
		.transform((value) => (value === null ? 0 : Number(value)))
		.pipe(zodPipe);
