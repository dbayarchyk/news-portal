<script context="module">
  import { getArticleById } from "../../../../utils/article";
  import extendFetchWithAuthHeaders from "../../../../utils/extendFetchWithAuthHeaders";

  export async function preload({ params }, serverSession) {
    const response = await getArticleById(
      extendFetchWithAuthHeaders(this.fetch, serverSession),
      params.id
    );
    const responseData = await response.json();

    if (response.status === 200) {
      return {
        serverSession: serverSession,
        id: responseData.id,
        title: responseData.title,
        content: responseData.content,
        status: responseData.status,
        author_id: responseData.author_id
      };
    }

    return this.error(
      response.status,
      responseData.message || "Something went wrong."
    );
  }
</script>

<script>
  import { goto } from "@sapper/app";
  import jwtDecode from "jwt-decode";

  import ValidationErrors from "../../../../errors/validationErrors";
  import UnknownError from "../../../../errors/unknownError";
  import ArticleForm from "../../../../components/ArticleForm.svelte";
  import {
    updateArticleById,
    publishArticleById,
    archiveArticleById
  } from "../../../../utils/article";
  import { getAccessToken } from "../../../../utils/accessToken";
  import {
    canPublishArticle,
    canArchiveArticle,
    canViewArchivedArticles,
    canViewPublishedArticles
  } from "../../../../utils/actionPermissions";

  export let serverSession;
  export let id;
  export let title;
  export let content;
  export let status;
  export let author_id;

  $: accessTokenPayload = jwtDecode(getAccessToken(serverSession));

  let formValidationErrors = {};
  let formError = "";
  let isArticleUpdating = false;
  let isArticlePublishing = false;
  let isArticleArchiving = false;

  async function saveChanges(id, data) {
    try {
      await updateArticleById(extendFetchWithAuthHeaders(fetch), id, data);

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
        await publishArticleById(extendFetchWithAuthHeaders(fetch), id);

        if (canViewPublishedArticles(accessTokenPayload)) {
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
        await archiveArticleById(extendFetchWithAuthHeaders(fetch), id);

        if (canViewArchivedArticles(accessTokenPayload)) {
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
    {formError}
    headlineText="Edit Article"
    validationErrors={formValidationErrors}
    on:submit={hanldeFormSubmit}>
    <div slot="form-buttons">
      <button type="submit" class="button-outline">
        {isArticleUpdating ? 'Updating ...' : status === 'PUBLISHED' ? 'Save and Publish' : 'Save Changes'}
      </button>
      {#if canPublishArticle({ status, author_id: author_id }, accessTokenPayload)}
        <button
          type="button"
          class="button ml-2"
          on:click={hanldeArticlePublishing}>
          {isArticlePublishing ? 'Publishing ...' : 'Publish'}
        </button>
      {/if}
      {#if canArchiveArticle({ status, author_id: author_id }, accessTokenPayload)}
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
