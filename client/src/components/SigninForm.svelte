<script>
  import { stores, goto } from "@sapper/app";
  import { get } from "svelte/store";

  import { signIn } from "../api/auth";
  import extendFetchWithAuth from "../utils/auth/extendFetchWithAuth";
  import deriveSessionFromAccessToken from "../utils/auth/deriveSessionFromAccessToken";
  import UnknownError from "../errors/unknownError";
  import ValidationErrors from "../errors/validationErrors";

  let email = "";
  let password = "";
  let loading = false;
  let validationErrors = {};
  let formError = "";

  const { session } = stores();

  async function handleSubmit() {
    loading = true;

    try {
      const accessToken = await signIn(
        extendFetchWithAuth(fetch, get(session)),
        {
          email,
          password
        }
      );

      validationErrors = {};
      formError = "";

      session.update(oldSession => ({
        ...oldSession,
        ...deriveSessionFromAccessToken(accessToken)
      }));

      await goto("./");
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
  <h1 class="headline headline-1">Sign In</h1>

  <div class="form-field mt-4">
    <label class="block body-text body-text-primary" for="email">Email</label>
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
      <p class="body-text body-text-error" id="email-error" aria-live="assertive" role="alert">
        {validationErrors.email}
      </p>
    {/if}
  </div>

  <div class="form-field">
    <label class="block body-text body-text-primary" for="password">
      Password
    </label>
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
        class="body-text body-text-error"
        id="password-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.password}
      </p>
    {/if}
  </div>

  {#if formError}
    <p class="body-text body-text-error mt-4" aria-live="assertive" role="alert">
      {formError}
    </p>
  {/if}

  <div class="mt-4">
    <button class="button button-primary" type="submit">
      {loading ? 'Loading...' : 'Sign me in'}
    </button>
  </div>
</form>
