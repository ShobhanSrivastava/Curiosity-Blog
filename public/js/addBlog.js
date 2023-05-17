const submitBtn = document.getElementById('blog-submit');

submitBtn.addEventListener('click', () => {
    const content = tinyMCE.get('my-expressjs-tinymce-app').getContent();
    const hiddenInputEl = document.getElementById('content');

    hiddenInputEl.value = content;

    console.log(hiddenInputEl.value);

    document.getElementById('editor-form').submit();
});