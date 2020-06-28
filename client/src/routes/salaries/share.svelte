<script context="module">
  import {
    getPositions,
    getCities,
    getProgrammingLanguages
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
      programmingLanguagesResult
    ] = await Promise.all([
      getPositions(this.fetch),
      getCities(this.fetch),
      getProgrammingLanguages(this.fetch)
    ]);

    return {
      positions: await deriveItemsFromResult(positionsResult),
      cities: await deriveItemsFromResult(citiesResult),
      programmingLanguages: await deriveItemsFromResult(
        programmingLanguagesResult
      )
    };
  }
</script>

<script>
  import SalaryForm from "../../components/SalaryForm.svelte";

  export let positions;
  export let cities;
  export let programmingLanguages;
</script>

<div>
  <div class="mt-2 flex flex-column items-center justify-evenly">
    <SalaryForm {positions} {cities} {programmingLanguages} />

    <img
      class="image w-1/4 md:w-1/3 hidden md:inline-block ml-2"
      src="data-report.svg"
      alt="" />
  </div>
</div>
