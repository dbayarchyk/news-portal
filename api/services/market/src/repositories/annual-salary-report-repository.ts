import { SalaryReport as SalaryReportModel } from "../database/models/salary-report";
import { City as CityModel } from "../database/models/city";
import { Position as PositionModel } from "../database/models/position";
import { Technology as TechnologyModel } from "../database/models/technology";
import { MongoDBAggregator } from "../utils/mongodb-aggregator";
import { AnnualSalaryReport } from "../dtos/salary-report-dto";

const GROUP_BY_CONFIG = {
  city: {
    collection: CityModel.collection.name,
    localIdField: "cityId",
    groupByField: "name",
  },
  technology: {
    collection: TechnologyModel.collection.name,
    localIdField: "technologyId",
    groupByField: "name",
  },
  position: {
    collection: PositionModel.collection.name,
    localIdField: "positionId",
    groupByField: "name",
  },
};

export interface IAnnualSalaryReportRepository {
  getAnnualSalaryReport(
    groupBy: keyof typeof GROUP_BY_CONFIG
  ): Promise<AnnualSalaryReport[]>;
}

export class AnnualSalaryReportRepository
  implements IAnnualSalaryReportRepository {
  public async getAnnualSalaryReport(
    groupBy: keyof typeof GROUP_BY_CONFIG
  ): Promise<AnnualSalaryReport[]> {
    const aggregationConfig = GROUP_BY_CONFIG[groupBy];

    const rawReport = await SalaryReportModel.aggregate([
      {
        $group: {
          _id: `$${aggregationConfig.localIdField}`,
          count: { $sum: 1 },
          min: { $min: "$annualSalary" },
          max: { $max: "$annualSalary" },
          average: { $avg: "$annualSalary" },
          annualSalaries: { $push: "$annualSalary" },
        },
      },
      {
        $lookup: {
          from: aggregationConfig.collection,
          localField: "_id",
          foreignField: "_id",
          as: "groupBy",
        },
      },
      {
        $project: {
          count: true,
          min: true,
          max: true,
          average: true,
          annualSalaries: true,
          groupBy: {
            $arrayElemAt: [`$groupBy.${aggregationConfig.groupByField}`, 0],
          },
        },
      },
      {
        $sort: { groupBy: 1 },
      },
    ]);

    return rawReport.map((report) => {
      return {
        groupBy: report.groupBy,
        count: report.count,
        min: report.min,
        max: report.max,
        average: report.average,
        lowerQuartile: MongoDBAggregator.percentile(
          report.annualSalaries,
          0.25
        ),
        median: MongoDBAggregator.percentile(report.annualSalaries, 0.5),
        upperQuartile: MongoDBAggregator.percentile(
          report.annualSalaries,
          0.75
        ),
      };
    });
  }
}
