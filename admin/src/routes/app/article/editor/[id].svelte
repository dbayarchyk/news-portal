<script context="module">
  import { getArticleById } from "../../../../utils/article";
  import extendFetchWithAuthHeaders from "../../../../utils/extendFetchWithAuthHeaders";

  export async function preload({ params }, session) {
    const response = await getArticleById(
      extendFetchWithAuthHeaders(this.fetch, session),
      params.id
    );
    const responseData = await response.json();

    if (response.status === 200) {
      return {
        id: responseData.id,
        title: responseData.title,
        content: responseData.content
      };
    }

    return this.error(
      response.status,
      responseData.message || "Something went wrong."
    );
  }
</script>

<script>
  import ValidationErrors from "../../../../errors/validationErrors";
  import UnknownError from "../../../../errors/unknownError";
  import ArticleForm from "../../../../components/ArticleForm.svelte";
  import { updateArticleById } from "../../../../utils/article";

  export let id;
  export let title;
  export let content;

  let formValidationErrors = {};
  let formError = "";
  let isArticleUpdating = false;

  async function hanldeFormSubmit(event) {
    isArticleUpdating = true;

    try {
      await updateArticleById(
        extendFetchWithAuthHeaders(fetch),
        id,
        event.detail
      );

      formValidationErrors = {};
    } catch (err) {
      formValidationErrors = {};

      if (err instanceof ValidationErrors) {
        formValidationErrors = err.errors;
      } else {
        formError = err.message;
      }
    } finally {
      isArticleUpdating = false;
    }
  }
</script>

<svelte:head>
  <title>{title} | IT Dog Admin</title>
</svelte:head>

<section class="py-3">
  <ArticleForm
    {id}
    {title}
    {content}
    {formError}
    headlineText="Edit Article"
    validationErrors={formValidationErrors}
    submitButtontext={isArticleUpdating ? 'Updating ...' : 'Save Changes'}
    on:submit={hanldeFormSubmit} />
</section>
