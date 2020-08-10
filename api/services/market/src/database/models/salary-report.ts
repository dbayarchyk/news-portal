import mongoose, { Schema, Document } from "mongoose";

export interface SalaryReportPersistance {
  _id: string;
  positionId: string;
  cityId: string;
  technologyId: string;
  annualSalary: number;
  workExperience: number;
  createdAt: string;
}

type SalaryReportPersistanceDocument = SalaryReportPersistance & Document;

const SalaryReportSchema = new Schema(
  {
    _id: { type: String, required: true },
    positionId: { type: String, required: true },
    cityId: { type: String, required: true },
    technologyId: { type: String, required: true },
    annualSalary: { type: Number, required: true },
    workExperience: { type: Number, required: true },
    createdAt: { type: Date, required: true },
  },
  {
    _id: false,
  }
);

export const SalaryReport = mongoose.model<SalaryReportPersistanceDocument>(
  "SalaryReport",
  SalaryReportSchema,
  "salary-reports"
);
