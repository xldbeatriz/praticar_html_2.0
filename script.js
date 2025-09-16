const htmlCode = document.getElementById("html");
const cssCode = document.getElementById("css");
const jsCode = document.getElementById("js");
const previewFrame = document.getElementById("preview");

// Função para atualizar o preview
function updatePreview() {
  const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
  preview.open();
  preview.write(`
    ${htmlCode.value}
    <style>${cssCode.value}</style>
    <script>${jsCode.value}<\/script>
  `);
  preview.close();
}

// Atualiza em tempo real
[htmlCode, cssCode, jsCode].forEach(editor => {
  editor.addEventListener("input", updatePreview);
});

// Controle das abas estilo VS Code
const tabs = document.querySelectorAll(".tab");
const editors = document.querySelectorAll(".code");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    editors.forEach(e => e.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Render inicial
updatePreview();
