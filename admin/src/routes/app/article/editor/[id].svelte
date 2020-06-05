<script context="module">
  import ArticleService from "../../../../services/articleService";

  export async function preload({ params }, session) {
    const articleService = new ArticleService(this.fetch, session);

    const response = await articleService.getArticleById(params.id);
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
  import fetch from "isomorphic-fetch";

  import ValidationErrors from "../../../../errors/validationErrors";
  import UnknownError from "../../../../errors/unknownError";
  import ArticleForm from "../../../../components/ArticleForm.svelte";

  export let id;
  export let title;
  export let content;

  const articleService = new ArticleService(fetch);

  let formValidationErrors = {};
  let formError = "";
  let isArticleUpdating = false;

  async function hanldeFormSubmit(event) {
    isArticleUpdating = true;

    try {
      await articleService.updateArticleById(id, event.detail);

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
