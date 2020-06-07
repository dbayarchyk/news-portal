<script>
  import { goto } from "@sapper/app";

  import ValidationErrors from "../../../../errors/validationErrors";
  import UnknownError from "../../../../errors/unknownError";
  import ArticleForm from "../../../../components/ArticleForm.svelte";
  import { createArticle } from "../../../../utils/article";
  import extendFetchWithAuthHeaders from "../../../../utils/extendFetchWithAuthHeaders";

  let formValidationErrors = {};
  let formError = "";
  let isArticleCreating = false;

  async function hanldeFormSubmit(event) {
    isArticleCreating = true;

    try {
      const createdArticle = await createArticle(
        extendFetchWithAuthHeaders(fetch),
        event.detail
      );

      formValidationErrors = {};

      await goto(`./app/article/editor/${createdArticle.id}`, {
        replaceState: true
      });
    } catch (err) {
      formValidationErrors = {};

      if (err instanceof ValidationErrors) {
        formValidationErrors = err.errors;
      } else {
        formError = err.message;
      }
    } finally {
      isArticleCreating = false;
    }
  }
</script>

<svelte:head>
  <title>New Article | IT Dog Admin</title>
</svelte:head>

<section class="py-3">
  <ArticleForm
    {formError}
    headlineText="New Article"
    validationErrors={formValidationErrors}
    submitButtontext={isArticleCreating ? 'Creating ...' : 'Create Article'}
    on:submit={hanldeFormSubmit}>
    <button slot="form-buttons" type="submit" class="button">
      {isArticleCreating ? 'Creating ...' : 'Create Article'}
    </button>
  </ArticleForm>
</section>
