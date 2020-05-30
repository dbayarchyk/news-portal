<script context="module">
  import { isAuthenticated } from "../services/auth";

  export async function preload() {
    return this.redirect(308, "/app");
  }
</script>
