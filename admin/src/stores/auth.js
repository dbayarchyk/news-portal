import { writable } from "svelte/store";

const auth = writable({
  permissions: null,
  role: null,
});

export default auth;
