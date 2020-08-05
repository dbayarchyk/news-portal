import mongoose, { Schema, Document } from "mongoose";

export interface CityPersistance {
  _id: string;
  name: string;
}

type CityPersistanceDocument = CityPersistance & Document;

const CitySchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    _id: false,
  }
);

export const City = mongoose.model<CityPersistanceDocument>(
  "City",
  CitySchema,
  "cities"
);
