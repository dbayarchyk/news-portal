<script>
  import { goto } from "@sapper/app";

  import { reportSalary } from "../api/market";
  import UnknownError from "../errors/unknownError";
  import ValidationErrors from "../errors/validationErrors";

  export let positions = [];
  export let cities = [];
  export let technologies = [];

  let position_id = "";
  let technology_id = "";
  let city_id = "";
  let annual_salary = "";
  let work_experience = "";
  let loading = false;
  let validationErrors = {};
  let formError = "";

  async function handleSubmit() {
    loading = true;

    try {
      const accessToken = await reportSalary(fetch, {
        technology_id: parseInt(technology_id),
        position_id: parseInt(position_id),
        city_id: parseInt(city_id),
        annual_salary: parseInt(annual_salary),
        work_experience: parseInt(work_experience)
      });

      validationErrors = {};
      formError = "";

      await goto("./salaries");
    } catch (err) {
      validationErrors = {};

      if (err instanceof ValidationErrors) {
        validationErrors = err.errors;
      } else {
        formError = err.message;
      }
    } finally {
      loading = false;
    }
  }
</script>

<style>
  .signin-form {
    max-width: 25em;
  }
</style>

<form class="w-full signin-form" on:submit|preventDefault={handleSubmit}>
  <h1 class="headline-1">Share your salary</h1>
  <p class="body-text-secondary">
    Let's make the Germany IT market transparent together
  </p>

  <div class="form-field mt-4">
    <label class="block body-text-primary" for="position_id">Position</label>
    <select
      class="input w-full"
      name="position_id"
      id="position_id"
      bind:value={position_id}
      aria-invalid={validationErrors.position_id}
      aria-describedby="position_id-error">
      <option value disabled>-- Please choose --</option>
      {#each positions as position}
        <option value={position.id}>{position.name}</option>
      {/each}
    </select>
    {#if validationErrors.position_id}
      <p
        class="error-text"
        id="position_id-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.position_id}
      </p>
    {/if}
  </div>

  <div class="form-field mt-4">
    <label class="block body-text-primary" for="technology_id">
      Basic technology
    </label>
    <select
      class="input w-full"
      name="technology_id"
      id="technology_id"
      bind:value={technology_id}
      aria-invalid={validationErrors.technology_id}
      aria-describedby="technology_id-error">
      <option value disabled>-- Please choose --</option>
      {#each technologies as technology}
        <option value={technology.id}>{technology.name}</option>
      {/each}
    </select>
    {#if validationErrors.technology_id}
      <p
        class="error-text"
        id="technology_id-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.technology_id}
      </p>
    {/if}
  </div>

  <div class="form-field mt-4">
    <label class="block body-text-primary" for="city_id">City</label>
    <select
      class="input w-full"
      name="city_id"
      id="city_id"
      bind:value={city_id}
      aria-invalid={validationErrors.city_id}
      aria-describedby="city_id-error">
      <option value disabled>-- Please choose --</option>
      {#each cities as city}
        <option value={city.id}>{city.name}</option>
      {/each}
    </select>
    {#if validationErrors.city_id}
      <p
        class="error-text"
        id="city_id-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.city_id}
      </p>
    {/if}
  </div>

  <div class="form-field mt-4">
    <label class="block body-text-primary" for="annual_salary">
      Gross Annual Salary
    </label>
    <input
      class="input w-full"
      type="text"
      name="annual_salary"
      id="annual_salary"
      bind:value={annual_salary}
      aria-invalid={validationErrors.annual_salary}
      aria-describedby="annual_salary-error" />
    {#if validationErrors.annual_salary}
      <p
        class="error-text"
        id="annual_salary-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.annual_salary}
      </p>
    {/if}
  </div>

  <div class="form-field mt-4">
    <label class="block body-text-primary" for="work_experience">
      Work experience
    </label>
    <input
      class="input w-full"
      type="number"
      name="work_experience"
      id="work_experience"
      min="1"
      max="50"
      bind:value={work_experience}
      aria-invalid={validationErrors.work_experience}
      aria-describedby="work_experience-error" />
    {#if validationErrors.work_experience}
      <p
        class="error-text"
        id="work_experience-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.work_experience}
      </p>
    {/if}
  </div>

  {#if formError}
    <p class="error-text mt-4" aria-live="assertive" role="alert">
      {formError}
    </p>
  {/if}

  <div class="mt-4">
    <div>
      <button class="button" type="submit">
        {loading ? 'Submitting...' : 'Share my salary'}
      </button>
      <p class="body-text-secondary text-xs">This is completely anonymous</p>
    </div>
  </div>
</form>
