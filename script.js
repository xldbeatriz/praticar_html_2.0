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
// Permitir Tab para indentação nos editores
document.querySelectorAll("textarea.code").forEach(area => {
  area.addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
      e.preventDefault();

      const start = this.selectionStart;
      const end = this.selectionEnd;

      // Adiciona 2 espaços (pode trocar por "\t" se quiser tab real)
      const indent = "\t";
      
      this.value =
        this.value.substring(0, start) + indent + this.value.substring(end);

      // Reposiciona o cursor depois da indentação
      this.selectionStart = this.selectionEnd = start + indent.length;
    }
  });
});

// Render inicial
updatePreview();


