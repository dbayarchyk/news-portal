<script>
  let isInputVisible = false;
  let inputEl;

  function toggleInputVisibility() {
    isInputVisible = !isInputVisible;

    if (isInputVisible) {
      // Since the input was hidden we need to wait until it becomes visible and the focus it.
      setTimeout(() => {
        inputEl.focus();
      });
    }
  }
</script>

<form on:submit|preventDefault>
  <input
    type="search"
    class="bg-white py-1 px-2 rounded border-2 border-gray-500"
    bind:this={inputEl}
    name="search"
    placeholder="Search..."
    class:hidden={!isInputVisible} />

  <button
    type="button"
    aria-haspopup="true"
    aria-expanded={isInputVisible}
    aria-label="search"
    on:click|preventDefault={toggleInputVisibility}>
    Search
  </button>
</form>
