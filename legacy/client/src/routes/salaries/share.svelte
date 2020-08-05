<script context="module">
  import {
    getPositions,
    getCities,
    getTechnologies
  } from "../../api/market";

  async function deriveItemsFromResult(result) {
    if (!result.ok) {
      return [];
    }

    try {
      const resultData = await result.json();

      return resultData.items;
    } catch {
      return [];
    }
  }

  export async function preload(page) {
    const [
      positionsResult,
      citiesResult,
      technologiesResult
    ] = await Promise.all([
      getPositions(this.fetch),
      getCities(this.fetch),
      getTechnologies(this.fetch)
    ]);

    return {
      positions: await deriveItemsFromResult(positionsResult),
      cities: await deriveItemsFromResult(citiesResult),
      technologies: await deriveItemsFromResult(
        technologiesResult
      )
    };
  }
</script>

<script>
  import SalaryForm from "../../components/SalaryForm.svelte";

  export let positions;
  export let cities;
  export let technologies;
</script>

<svelte:head>
  <title>Share Salary | IT Dog</title>
</svelte:head>

<div>
  <div class="mt-2 flex items-center justify-evenly">
    <SalaryForm {positions} {cities} {technologies} />

    <img
      class="image w-1/4 md:w-1/3 hidden md:inline-block ml-2"
      src="data-report.svg"
      alt="" />
  </div>
</div>
