export class MongoDBAggregator {
  public static percentile(
    annualSalaries: number[],
    percentage: number
  ): number {
    const sortedAnnualSalaries = Array.from(annualSalaries).sort(function (
      salaryA,
      salaryB
    ) {
      return salaryA - salaryB;
    });

    const annualSalaryIndex = Math.floor(
      sortedAnnualSalaries.length * percentage
    );

    return sortedAnnualSalaries[annualSalaryIndex];
  }
}
