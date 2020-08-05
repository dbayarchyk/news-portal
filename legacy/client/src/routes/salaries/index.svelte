<script context="module">
  import { getGroupedSalaryReport } from "../../api/market";
  import extendFetchWithAuth from "../../utils/auth/extendFetchWithAuth";

  export async function preload(page, session) {
    const groupBy = "technology";

    const groupedSalaryReportResponse = await getGroupedSalaryReport(
      extendFetchWithAuth(this.fetch, session),
      groupBy
    );

    return {
      activeGroupBy: groupBy,
      groupedSalaryReport: await groupedSalaryReportResponse.json()
    };
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import { get } from "svelte/store";

  import SalaryReport from "../../components/SalaryReport.svelte";

  export let groupedSalaryReport;
  export let activeGroupBy;

  const { session } = stores();

  async function hanldeActiveGroupByChange(event) {
    activeGroupBy = event.detail;

    const groupedSalaryReportResponse = await getGroupedSalaryReport(
      extendFetchWithAuth(fetch, get(session)),
      activeGroupBy
    );

    groupedSalaryReport = await groupedSalaryReportResponse.json();
  }
</script>

<svelte:head>
  <title>Salaries | IT Dog</title>
</svelte:head>

<section>
  <div>
    <h1 class="headline headline-1">Salaries</h1>
    <div class="flex items-start md:items-center flex-col md:flex-row">
      <p class="body-text body-text-normal">
        Help us to make the German IT market transparent.
      </p>

      <a
        href="./salaries/share"
        class="button button-primary inline-block mt-2 md:mt-0 md:ml-2">
        Share your salary
      </a>
    </div>
  </div>

  <div class="mt-6">
    <SalaryReport
      {activeGroupBy}
      report={groupedSalaryReport}
      on:activeGroupByChange={hanldeActiveGroupByChange} />
  </div>
</section>
