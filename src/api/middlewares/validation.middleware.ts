import { Request, Response, NextFunction } from "express";
import { IGenericObject } from "@interfaces";
import { getValidationFields } from "@utils";

type Fields = {
  body: string[]
  query: string[]
  params: string[]
}

export default (schema: IGenericObject, fields: Partial<Fields>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (fields.body) {
      req.body = await getValidationFields(schema, fields.body).validateAsync(req.body);
    }

    if (fields.query) {
      req.query = await getValidationFields(schema, fields.query).validateAsync(req.query);
    }

    if (fields.params) {
      req.params = await getValidationFields(schema, fields.params).validateAsync(req.params);
    }

    next();
  }