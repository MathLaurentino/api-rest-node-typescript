import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";

type TProperty = "body" | "header" | "param" | "query";

// type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>

type TAllSchemas = Record<TProperty, ObjectSchema<any>>

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;


export const validation: TValidation = (schemas) => async (req, res, next) => {

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            /* Valida o corpo da requisição usando o esquema de validação Yup. */
            schema.validateSync(req[key as TProperty], { abortEarly: false });

        } catch (err) {
    
            const yupError = err as ValidationError;
            /* Objeto para armazenar os erros de validação. */
            const errors: Record<string, string> = {};
    
            yupError.inner.forEach(error => {
                if (!error.path) return; // error.path === undefined
                errors[error.path] = error.message;
            });

            errorsResult[key] = errors;
        }
    });

    if (Object.entries(errorsResult).length === 0) {
        return next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }

};