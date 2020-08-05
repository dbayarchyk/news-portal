<script>
  export let articleId;
  export let title;
  export let commentsCount;

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

<article
  class="relative flex sm:flex-col-reverse sm:justify-start flex-row-reverse
  justify-end">
  <div class="block sm:mt-1 sl:ml-0 ml-2">
    <a
      class="article-link hover:underline"
      rel="prefetch"
      href="article/{articleId}">
      <h2 class="body-text body-text-primary">{title}</h2>
    </a>

    <a
      href="article/{articleId}#comments"
      class="link text-cropped relative z-10">
      {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
    </a>
  </div>

  <div
    class="article-image-wrapper sm:h-auto sm:w-auto h-20 w-32 flex-shrink-0">
    <img class="article-image w-full h-full" src={imageSrc} alt="" />
  </div>
</article>
