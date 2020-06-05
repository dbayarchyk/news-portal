<script>
  import { goto } from "@sapper/app";
  import fetch from "isomorphic-fetch";

  import ValidationErrors from "../../../../errors/validationErrors";
  import UnknownError from "../../../../errors/unknownError";
  import ArticleForm from "../../../../components/ArticleForm.svelte";
  import ArticleService from "../../../../services/articleService";

  const articleService = new ArticleService(fetch);

  let formValidationErrors = {};
  let formError = "";
  let isArticleCreating = false;

  async function hanldeFormSubmit(event) {
    isArticleCreating = true;

    try {
      const createdArticle = await articleService.createArticle(event.detail);

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

<section class="py-3">
  <ArticleForm
    {formError}
    headlineText="New Article"
    validationErrors={formValidationErrors}
    submitButtontext={isArticleCreating ? 'Creating ...' : 'Create Article'}
    on:submit={hanldeFormSubmit} />
</section>
