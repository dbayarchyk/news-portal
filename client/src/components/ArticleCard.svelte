<script>
  export let articleId;
  export let title;

  $: imageSrc = `https://picsum.photos/300/200?random=${articleId}`;
</script>

<style>
  .article-link::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }

  .article-link:hover + .article-image-wrapper .article-image {
    transform: scale(1.1);
  }

  .article-image-wrapper {
    overflow: hidden;
  }

  .article-image {
    transition: transform 0.2s;
  }
</style>

<article class="relative inline-flex flex-col">
  <div class="inline-flex flex-col-reverse">
    <a
      class="article-link hover:underline"
      rel="prefetch"
      href="article/{articleId}">
      <h2 class="headline-2">{title}</h2>
    </a>

    <div class="article-image-wrapper">
      <img
        class="article-image"
        src={imageSrc}
        alt=""
        width="300"
        height="200" />
    </div>
  </div>

  <p class="body-text-secondary">Hello there</p>
</article>
