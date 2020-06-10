<script>
  import { createEventDispatcher } from "svelte";
  import readingTime from "reading-time";

  import ResizableTextarea from "./ResizableTextarea.svelte";
  import MarkdownEditor from "./MarkdownEditor.svelte";

  export let title = "";
  export let content = "";
  export let validationErrors = {};
  export let formError = "";

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
</style>

<form class="article-form mx-auto" on:submit|preventDefault={handleSubmit}>
  <div class="form-field mt-5">
    <label class="visually-hidden" for="title">Title</label>
    <ResizableTextarea
      placeholder="Type your headline here..."
      inputClassName="headline-1 outline-none w-full text-center"
      name="title"
      id="title"
      bind:value={title}
      ariaInvalid={validationErrors.title}
      ariaDescribedby="title-error" />
    {#if validationErrors.title}
      <p
        class="error-text text-center"
        id="title-error"
        aria-live="assertive"
        role="alert">
        {validationErrors.title}
      </p>
    {/if}
  </div>

  <p class="body-text-secondary text-center mt-5">
    <span>{Math.round(readingTime(content).minutes)} min read ☕️</span>
  </p>

  <div class="form-field mt-5">
    <label class="visually-hidden" for="content">Content</label>
    <MarkdownEditor bind:value={content} name="content" />
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
    <slot name="form-buttons">
      <button class="button" type="submit">Save Changes</button>
    </slot>
  </div>
</form>
