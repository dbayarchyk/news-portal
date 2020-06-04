<script>
  import { createEventDispatcher } from "svelte";

  export let title = "";
  export let content = "";
  export let validationErrors = {};
  export let formError = "";
  export let submitButtontext = "";

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    dispatch("submit", {
      title,
      content
    });
  }
</script>

<style>
  .article-form {
    max-width: 75ch;
  }

  .article-content {
    min-height: 22.5em;
  }
</style>

<form class="article-form mx-auto" on:submit|preventDefault={handleSubmit}>
  <h1 class="headline-1">New Article</h1>

  <div class="form-field mt-5">
    <label class="block body-text-primary" for="title">Title</label>
    <input
      class="input w-full"
      name="title"
      id="title"
      bind:value={title}
      aria-invalid={validationErrors.title}
      aria-describedby="title-error" />
    {#if validationErrors.title}
      <p class="error-text" id="title-error" aria-live="assertive" role="alert">
        {validationErrors.title}
      </p>
    {/if}
  </div>

  <div class="form-field">
    <label class="block body-text-primary" for="content">Content</label>
    <textarea
      class="input article-content w-full"
      name="content"
      id="content"
      bind:value={content}
      aria-invalid={validationErrors.content}
      aria-describedby="content-error" />
    {#if validationErrors.content}
      <p
        class="error-text"
        id="content-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.content}
      </p>
    {/if}
  </div>

  {#if formError}
    <p class="error-text mt-4" aria-live="assertive" role="alert">
      {formError}
    </p>
  {/if}

  <div class="mt-4">
    <button class="button" type="submit">{submitButtontext}</button>
  </div>
</form>
