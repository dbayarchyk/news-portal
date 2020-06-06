<script>
  export let value = "";
  export let ariaInvalid = false;
  export let ariaDescribedby;
  export let name;
  export let id;
  export let placeholder;
  export let inputClassName;

  let textareaEl;

  $: {
    // To trigger this on every value change;
    value;

    if (textareaEl) {
      const offset = textareaEl.offsetHeight - textareaEl.clientHeight;

      textareaEl.style.height = 'auto';
      textareaEl.style.height = `${textareaEl.scrollHeight + offset}px`;
    }
  }
</script>

<style>
  .textarea {
    width: 100%;
    resize: none;
    z-index: 1;
    position: relative;
    background: transparent;
    line-height: calc(5px + 2ex + 5px);
  }

  .placeholder {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
  }
</style>

<div class="flex w-full relative">
  <textarea
    class="textarea {inputClassName ? inputClassName : ""}"
    bind:this={textareaEl}
    bind:value
    {name}
    {id}
    rows={1}
    aria-invalid={ariaInvalid}
    aria-describedby={ariaDescribedby} />
  {#if placeholder}
    <p class="placeholder {inputClassName ? inputClassName : ""}" class:hidden={value}>
      {placeholder}
    </p>
  {/if}
</div>
