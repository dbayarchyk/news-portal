import mongoose, { Schema, Document } from "mongoose";

export interface TechnologyPersistance {
  _id: string;
  name: string;
}

type TechnologyPersistanceDocument = TechnologyPersistance & Document;

const TechnologySchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    _id: false,
  }
);

export const Technology = mongoose.model<TechnologyPersistanceDocument>(
  "Technology",
  TechnologySchema,
  "technologies"
);
