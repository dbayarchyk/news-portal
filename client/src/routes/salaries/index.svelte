<script context="module">
  import { getGroupedSalaryReport } from "../../api/market";
  import extendFetchWithAuth from "../../utils/auth/extendFetchWithAuth";

  export async function preload(page, session) {
    const groupedSalaryReportResponse = await getGroupedSalaryReport(
      extendFetchWithAuth(this.fetch, session)
    );

    return {
      groupedSalaryReport: await groupedSalaryReportResponse.json()
    };
  }
</script>

<script>
  import SalaryReport from "../../components/SalaryReport.svelte";

  export let groupedSalaryReport;
</script>

<section>
  <div>
    <h1 class="headline-1">Salaries</h1>
    <div class="flex items-start md:items-center flex-col md:flex-row">
      <p class="body-text-normal">
        Help us to make the German IT market transparent.
      </p>

      <a
        href="./salaries/share"
        class="button inline-block mt-2 md:mt-0 md:ml-2">
        Share your salary
      </a>
    </div>
  </div>

  <div class="mt-6">
    <SalaryReport report={groupedSalaryReport} />
  </div>
</section>
