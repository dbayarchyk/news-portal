<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  onMount(async () => {
    // TODO: check if the user is not signed it and redirect to signin page.

    await goto(`${process.baseURL}/app`);
  });
</script>
