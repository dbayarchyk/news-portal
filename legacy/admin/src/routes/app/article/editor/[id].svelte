<script context="module">
  import { getArticleById } from "../../../../api/article";
  import extendFetchWithAuth from "../../../../utils/auth/extendFetchWithAuth";

  export async function preload({ params }, session) {
    const response = await getArticleById(
      extendFetchWithAuth(this.fetch, session),
      params.id
    );
    const responseData = await response.json();

    if (response.status === 200) {
      return {
        id: responseData.id,
        title: responseData.title,
        content: responseData.content,
        status: responseData.status,
        author: responseData.author
      };
    }

    return this.error(
      response.status,
      responseData.message || "Something went wrong."
    );
  }
</script>

<script>
  import { stores, goto } from "@sapper/app";
  import { get } from "svelte/store";

  import ValidationErrors from "../../../../errors/validationErrors";
  import UnknownError from "../../../../errors/unknownError";
  import ArticleForm from "../../../../components/ArticleForm.svelte";
  import {
    updateArticleById,
    publishArticleById,
    archiveArticleById
  } from "../../../../api/article";
  import canPublishArticle from "../../../../utils/permissions/canPublishArticle";
  import canArchiveArticle from "../../../../utils/permissions/canArchiveArticle";
  import canViewArchivedArticles from "../../../../utils/permissions/canViewArchivedArticles";
  import canViewPublishedArticles from "../../../../utils/permissions/canViewPublishedArticles";

  export let id;
  export let title;
  export let content;
  export let status;
  export let author;

  const { session } = stores();

  let formValidationErrors = {};
  let formError = "";
  let isArticleUpdating = false;
  let isArticlePublishing = false;
  let isArticleArchiving = false;

  async function saveChanges(id, data) {
    try {
      await updateArticleById(
        extendFetchWithAuth(fetch, get(session)),
        id,
        data
      );

      formValidationErrors = {};
    } catch (err) {
      formValidationErrors = {};

      if (err instanceof ValidationErrors) {
        formValidationErrors = err.errors;
      } else {
        formError = err.message;
      }
    }
  }

  async function hanldeFormSubmit(event) {
    isArticleUpdating = true;

    try {
      await saveChanges(id, event.detail);
    } finally {
      isArticleUpdating = false;
    }
  }

  async function hanldeArticlePublishing() {
    isArticlePublishing = true;

    try {
      await saveChanges(id, {
        title,
        content
      });

      if (!formError && Object.keys(formValidationErrors).length === 0) {
        await publishArticleById(extendFetchWithAuth(fetch, get(session)), id);

        if (canViewPublishedArticles(get(session).currentUser)) {
          await goto("./app/articles/published");
        } else {
          await goto("./app/articles");
        }
      }
    } catch (err) {
      formError = err.message;
    } finally {
      isArticlePublishing = false;
    }
  }

  async function hanldeArticleArchiving() {
    isArticleArchiving = true;

    try {
      await saveChanges(id, {
        title,
        content
      });

      if (!formError && Object.keys(formValidationErrors).length === 0) {
        await archiveArticleById(extendFetchWithAuth(fetch, get(session)), id);

        if (canViewArchivedArticles(get(session).currentUser)) {
          await goto("./app/articles/archived");
        } else {
          await goto("./app/articles");
        }
      }
    } catch (err) {
      formError = err.message;
    } finally {
      isArticleArchiving = false;
    }
  }
</script>

<svelte:head>
  <title>{title} | IT Dog Admin</title>
</svelte:head>

<section class="py-3">
  <ArticleForm
    {id}
    bind:title
    bind:content
    authorUsername={(author && author.username) || ''}
    {formError}
    headlineText="Edit Article"
    validationErrors={formValidationErrors}
    on:submit={hanldeFormSubmit}>
    <div slot="form-buttons">
      <button type="submit" class="button-outline">
        {isArticleUpdating ? 'Updating ...' : status === 'PUBLISHED' ? 'Save and Publish' : 'Save Changes'}
      </button>
      {#if canPublishArticle({ status, author }, $session.currentUser)}
        <button
          type="button"
          class="button ml-2"
          on:click={hanldeArticlePublishing}>
          {isArticlePublishing ? 'Publishing ...' : 'Publish'}
        </button>
      {/if}
      {#if canArchiveArticle({ status, author }, $session.currentUser)}
        <button
          type="button"
          class="button ml-2"
          on:click={hanldeArticleArchiving}>
          {isArticleArchiving ? 'Archiving ...' : 'Archive'}
        </button>
      {/if}
    </div>
  </ArticleForm>
</section>
