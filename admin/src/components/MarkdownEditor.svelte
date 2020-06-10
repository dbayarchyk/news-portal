<script>
  import ResizableTextarea from "./ResizableTextarea.svelte";

  export let value = "";
  export let placholder = "Type your content here...";
  export let name;

  let isPreviewActive = false;

  (async function initSimpleMDE() {
    if (!process.browser) {
      return;
    }

    const { default: SimpleMDE } = await import("simplemde");
    const simplemde = new SimpleMDE({
      element: document.getElementById("simplemde"),
      initialValue: value,
      spellChecker: false,
      placeholder: placholder,
      forceSync: true,
      toolbar: [
        "heading",
        "bold",
        "italic",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        {
          name: "preview",
          action: function extendedTogglePreview(editor) {
            SimpleMDE.togglePreview.call(SimpleMDE, editor);

            // Wait while the editor update the classname.
            setTimeout(() => {
              const wrapper = editor.codemirror.getWrapperElement();
              const preview = wrapper.lastChild;

              if (/editor-preview-active/.test(preview.className)) {
                isPreviewActive = true;
              } else {
                isPreviewActive = false;
              }
            });
          },
          className: "fa fa-eye no-disable",
          title: "Toggle Preview (Cmd-P)"
        },
        "|",
        "guide"
      ],
      status: []
    });

    simplemde.codemirror.on("change", () => {
      value = simplemde.value();
    });
  })();
</script>

<style>
  :global(.markdown-editor.active-preview .CodeMirror-scroll) {
    display: none !important;
  }

  :global(.markdown-editor.active-preview .editor-preview) {
    display: block !important;
  }
</style>

<link rel="stylesheet" href="simplemde.css" />
<div class="markdown-editor" class:active-preview={isPreviewActive}>
  <textarea class="hidden" id="simplemde" {name} />
</div>
