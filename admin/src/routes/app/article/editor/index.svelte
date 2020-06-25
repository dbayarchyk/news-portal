<script>
  import { stores, goto } from "@sapper/app";
  import { get } from "svelte/store";

  import ValidationErrors from "../../../../errors/validationErrors";
  import UnknownError from "../../../../errors/unknownError";
  import ArticleForm from "../../../../components/ArticleForm.svelte";
  import { createArticle } from "../../../../api/article";
  import extendFetchWithAuth from "../../../../utils/extendFetchWithAuth";

  const { session } = stores();

  let formValidationErrors = {};
  let formError = "";
  let isArticleCreating = false;

  async function hanldeFormSubmit(event) {
    isArticleCreating = true;

    try {
      const createdArticle = await createArticle(
        extendFetchWithAuth(fetch, get(session)),
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
