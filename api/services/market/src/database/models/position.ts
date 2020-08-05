import mongoose, { Schema, Document } from "mongoose";

export interface PositionPersistance {
  _id: string;
  name: string;
}

type PositionPersistanceDocument = PositionPersistance & Document;

const PositionSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    _id: false,
  }
);

export const Position = mongoose.model<PositionPersistanceDocument>(
  "Position",
  PositionSchema,
  "positions"
);
