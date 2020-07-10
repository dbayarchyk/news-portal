<script>
  import { createEventDispatcher } from "svelte";

  import SalaryReportTable from "./SalaryReportTable.svelte";
  import SalaryReportList from "./SalaryReportList.svelte";
  import SalaryReportNoData from "./SalaryReportNoData.svelte";
  import SalaryReportMissingDataBox from "./SalaryReportMissingDataBox.svelte";

  export let report;
  export let activeGroupBy;

  const dispatch = createEventDispatcher();

  function handleTabClick(groupBy) {
    dispatch("activeGroupByChange", groupBy);
  }
</script>

<ul class="tabs-list" role="tablist">
  <li class="tabs-list-item" role="presentation">
    <button
      type="button"
      class="tabs-list-item-control"
      role="tab"
      class:tabs-list-item-control-active={activeGroupBy === 'technology'}
      aria-selected={activeGroupBy === 'technology'}
      on:click={() => handleTabClick('technology')}>
      Technology
    </button>
  </li>

  <li class="tabs-list-item" role="presentation">
    <button
      type="button"
      class="tabs-list-item-control"
      role="tab"
      class:tabs-list-item-control-active={activeGroupBy === 'position'}
      aria-selected={activeGroupBy === 'position'}
      on:click={() => handleTabClick('position')}>
      Position
    </button>
  </li>

  <li class="tabs-list-item" role="presentation">
    <button
      type="button"
      class="tabs-list-item-control"
      role="tab"
      class:tabs-list-item-control-active={activeGroupBy === 'city'}
      aria-selected={activeGroupBy === 'city'}
      on:click={() => handleTabClick('city')}>
      City
    </button>
  </li>
</ul>

<div class="mt-4">
  {#if Array.isArray(report) && report.length > 0}
    <div class="hidden md:block">
      <SalaryReportTable {report} />
    </div>

    <div class="block md:hidden">
      <SalaryReportList {report} />
    </div>

    <div class="mt-8">
      <SalaryReportMissingDataBox />
    </div>
  {:else}
    <SalaryReportNoData />
  {/if}
</div>
