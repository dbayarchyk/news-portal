<script>
  import { goto } from "@sapper/app";

  import { signIn } from "../utils/auth";
  import extendFetchWithAuthHeaders from "../utils/extendFetchWithAuthHeaders";
  import UnknownError from "../errors/unknownError";
  import ValidationErrors from "../errors/validationErrors";
  import AccessDeniedError from "../errors/accessDeniedError";

  let email = "";
  let password = "";
  let loading = false;
  let validationErrors = {};
  let formError = "";

  async function handleSubmit() {
    loading = true;

    try {
      await signIn(extendFetchWithAuthHeaders(fetch), {
        email,
        password
      });

      validationErrors = {};
      formError = "";

      await goto(`${process.env.BASE_URL}/app`);
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
  <h1 class="headline-1">Sign In</h1>

  <div class="form-field mt-4">
    <label class="block body-text-primary" for="email">Email</label>
    <input
      class="input w-full"
      type="email"
      name="email"
      id="email"
      placeholder="example@gmail.com"
      bind:value={email}
      aria-invalid={validationErrors.email}
      aria-describedby="email-error" />
    {#if validationErrors.email}
      <p class="error-text" id="email-error" aria-live="assertive" role="alert">
        {validationErrors.email}
      </p>
    {/if}
  </div>

  <div class="form-field">
    <label class="block body-text-primary" for="password">Password</label>
    <input
      class="input w-full"
      type="password"
      name="password"
      id="password"
      bind:value={password}
      aria-invalid={validationErrors.password}
      aria-describedby="password-error" />
    {#if validationErrors.password}
      <p
        class="error-text"
        id="password-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.password}
      </p>
    {/if}
  </div>

  {#if formError}
    <p class="error-text mt-4" aria-live="assertive" role="alert">
      {formError}
    </p>
  {/if}

  <div class="mt-4">
    <button class="button" type="submit">
      {loading ? 'Loading...' : 'Sign me in'}
    </button>
  </div>
</form>
