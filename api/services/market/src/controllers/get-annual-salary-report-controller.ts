import { Request, Response } from "express";
import { Controller } from "../controllers/controller";
import { IAnnualSalaryReportRepository } from "../repositories/annual-salary-report-repository";
import { AnnualSalaryReport } from "../dtos/salary-report-dto";

export type AllowedGroupBy = "city" | "position" | "technology";
const ALLOWED_GROUP_BY: AllowedGroupBy[] = ["city", "position", "technology"];

export type GetAnnualSalaryReportControllerRequestParams = {
  groupBy: AllowedGroupBy;
};
export type GetAnnualSalaryReportControllerResponseBody =
  | AnnualSalaryReport[]
  | { message: string };

export class GetAnnualSalaryReportController extends Controller {
  private annualSalaryReportRepository: IAnnualSalaryReportRepository;

  public constructor(
    annualSalaryReportRepository: IAnnualSalaryReportRepository
  ) {
    super();
    this.annualSalaryReportRepository = annualSalaryReportRepository;
  }

  public async handle(
    req: Request<GetAnnualSalaryReportControllerRequestParams>,
    res: Response<GetAnnualSalaryReportControllerResponseBody>
  ): Promise<void> {
    if (this.isGroupByValid(req.params.groupBy) === false) {
      res.status(400);
      res.send({
        message: `Please provide a valid groupBy value: ${JSON.stringify(
          ALLOWED_GROUP_BY
        )}`,
      });
      return;
    }

    const groupBy = req.params.groupBy;
    const annualSalaryReport = await this.annualSalaryReportRepository.getAnnualSalaryReport(
      groupBy
    );

    res.setHeader("Cache-Control", "max-age=600");
    res.status(200);
    res.json(annualSalaryReport);
  }

  private isGroupByValid(groupBy: unknown): groupBy is AllowedGroupBy {
    if (!groupBy) {
      return false;
    }

    return ALLOWED_GROUP_BY.includes(groupBy as AllowedGroupBy);
  }
}
