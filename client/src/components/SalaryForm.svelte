<script>
  import CITIES from "../constants/cities";
  import PROGRAMMING_LANGUAGES from "../constants/programmingLanguages";
  import POSITIONS from "../constants/positions";

  let position = "";
  let basicProgrammingLanguage = "";
  let city = "";
  let annualSalary = "";
  let workExperience = "";
  let loading = false;
  let validationErrors = {};
  let formError = "";

  async function handleSubmit() {
    return;
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
    <label class="block body-text-primary" for="position">Position</label>
    <select
      class="input w-full"
      name="position"
      id="position"
      bind:value={position}
      aria-invalid={validationErrors.position}
      aria-describedby="position-error">
      <option value disabled>-- Please choose --</option>
      {#each POSITIONS as position}
        <option value={position.id}>{position.label}</option>
      {/each}
    </select>
    {#if validationErrors.position}
      <p
        class="error-text"
        id="position-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.position}
      </p>
    {/if}
  </div>

  <div class="form-field mt-4">
    <label class="block body-text-primary" for="basicProgrammingLanguage">
      Basic programming language
    </label>
    <select
      class="input w-full"
      name="basicProgrammingLanguage"
      id="basicProgrammingLanguage"
      bind:value={basicProgrammingLanguage}
      aria-invalid={validationErrors.basicProgrammingLanguage}
      aria-describedby="basicProgrammingLanguage-error">
      <option value disabled>-- Please choose --</option>
      {#each PROGRAMMING_LANGUAGES as language}
        <option value={language.id}>{language.label}</option>
      {/each}
    </select>
    {#if validationErrors.basicProgrammingLanguage}
      <p
        class="error-text"
        id="basicProgrammingLanguage-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.basicProgrammingLanguage}
      </p>
    {/if}
  </div>

  <div class="form-field mt-4">
    <label class="block body-text-primary" for="city">City</label>
    <select
      class="input w-full"
      name="city"
      id="city"
      bind:value={city}
      aria-invalid={validationErrors.city}
      aria-describedby="city-error">
      <option value disabled>-- Please choose --</option>
      {#each CITIES as city}
        <option value={city.id}>{city.label}</option>
      {/each}
    </select>
    {#if validationErrors.city}
      <p class="error-text" id="city-error" aria-live="assertive" role="alert">
        {validationErrors.city}
      </p>
    {/if}
  </div>

  <div class="form-field mt-4">
    <label class="block body-text-primary" for="annualSalary">
      Gross Annual Salary
    </label>
    <input
      class="input w-full"
      type="text"
      name="annualSalary"
      id="annualSalary"
      bind:value={annualSalary}
      aria-invalid={validationErrors.annualSalary}
      aria-describedby="annualSalary-error" />
    {#if validationErrors.annualSalary}
      <p
        class="error-text"
        id="annualSalary-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.annualSalary}
      </p>
    {/if}
  </div>

  <div class="form-field mt-4">
    <label class="block body-text-primary" for="workExperience">
      Work experience
    </label>
    <input
      class="input w-full"
      type="number"
      name="workExperience"
      id="workExperience"
      min="1"
      max="50"
      bind:value={workExperience}
      aria-invalid={validationErrors.workExperience}
      aria-describedby="workExperience-error" />
    {#if validationErrors.workExperience}
      <p
        class="error-text"
        id="workExperience-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.workExperience}
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
