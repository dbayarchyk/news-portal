<script>
  import { createEventDispatcher } from "svelte";

  export let pageSize = 0;
  export let page = 0;
  export let itemsCount = 0;

  $: showingFrom = pageSize * (page - 1) + 1;
  $: showingTo = pageSize * page;
  $: lastPage = Math.ceil(itemsCount / pageSize);
  $: pages = Array.from(Array(lastPage).keys());

  const dispatch = createEventDispatcher();

  function handleBackClick() {
    if (page <= 1) {
      return;
    }

    dispatch("change", {
      page: page - 1,
      pageSize
    });
  }

  function handlePageClick(newPage) {
    if (page >= lastPage) {
      return;
    }

    dispatch("change", {
      page: newPage,
      pageSize
    });
  }

  function handleNextClick() {
    if (page < itemsCount) {
      return;
    }

    dispatch("change", {
      page: page + 1,
      pageSize
    });
  }
</script>

{#if itemsCount !== 0}
  <div class="flex items-center justify-between p-3">
    <div class="body-text-normal">
      Showing {showingFrom} to {showingTo < itemsCount ? showingTo : itemsCount}
      of {itemsCount} results
    </div>

    <div class="pagination" role="group">
      <button
        type="button"
        class="pagination-item"
        aria-label="To the previous page"
        on:click|preventDefault={handleBackClick}>
        {'<'}
      </button>

      {#each pages as currentPage}
        <button
          type="button"
          class="pagination-item"
          aria-selected={currentPage + 1 === page}
          aria-label={`To the ${currentPage + 1} page`}
          on:click|preventDefault={() => handlePageClick(currentPage + 1)}>
          {currentPage + 1}
        </button>
      {/each}
      <button
        type="button"
        class="pagination-item"
        aria-label="To the next page"
        on:click|preventDefault={handleNextClick}>
        {'>'}
      </button>
    </div>
  </div>
{/if}
