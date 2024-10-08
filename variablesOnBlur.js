<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        box-sizing: border-box;
      }
      html,
      body {
        height: 100%;
        margin: 0;
      }

      .placeholder {
        font-size: 14px;
        padding: 0.2rem;
        border-radius: 0.2rem;
        background-color: #0000ff30;
        cursor: pointer;
      }

      .placeholder.active {
        border: 1px dotted green;
      }

      .placeholder::before {
        content: "{} ";
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <script src="https://unpkg.com/mustache@latest"></script>
    <script type="module">
      import htmlEntities from "https://cdn.jsdelivr.net/npm/html-entities@2.5.2/+esm";
      const app = {
        placeholders_container: null,
        preview_container: null,
        editor: null,

        placeholders_container: null,
        preview_container: null,

        container: null,
        state: {
          placeholders: [],
          raw_content: "",
          render_data: {},
        },

        init() {
          this.editor_column = this.createEditorBlur();
          this.placeholders_column = this.placeholdersContainer();
          this.preview_column = this.previewContainer();

          this.container = this.createContainer();
          this.initUI();
        },

        createContainer() {
          const div = document.createElement("div");
          div.style = "display: flex; height: 100%;";
          return div;
        },

        createTitle(value) {
          const title = document.createElement("p");
          title.textContent = value;
          return title;
        },

        getPosition(editableElem) {
          const selection = window.getSelection();
          let currentPos = 0;

          if (selection.rangeCount) {
            const range = selection.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(editableElem);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            currentPos = preCaretRange.toString().length;
          }

          return currentPos;
        },

        setCursor() {},

        createEditorBlur() {
          const div = document.createElement("div");
          div.style =
            "width: 100%; background-color: #ececec; display: flex; flex-direction: column; padding: 1rem;";

          const container = document.createElement("div");
          container.style =
            "height: 100%; background: #fff; padding: 4px; border-radius: 4px;";
          container.contentEditable = true;
          // On blur placeholders {{name}} will be initialized.
          // On focus need to return them back. into placeholders view.
          // Because span nodes will be changed to textContent of this node.
          container.addEventListener("blur", (ev) => {
            const value = ev.target.innerText;
            this.state.raw_content = value;

            // Transform placeholders into HTML nodes
            const withplaceholders = this.getPlaceholders(value);
            const withBreakRows = withplaceholders.replace(/\n/g, (value) => {
              return `</br>`;
            });

            this.renderForm();
            // Initialize placeholders
            ev.target.innerHTML = htmlEntities.encode(withBreakRows);
          });

          container.addEventListener("focus", (ev) => {
            // Initialize raw content.
            // Raw content should initialized utilizing innerText
            // in order to save new row
            ev.target.innerText = this.state.raw_content;
          });

          div.appendChild(this.createTitle("Editor"));
          div.appendChild(container);
          return div;
        },

        placeholdersContainer() {
          const div = document.createElement("div");
          div.style =
            "width: 100%; background-color: #ececec; display: flex; flex-direction: column; padding: 1rem;";

          const container = document.createElement("div");
          this.placeholders_container = container;
          container.style =
            "height: 100%; background: #fff; padding: 4px; border-radius: 4px;";

          div.appendChild(this.createTitle("Form"));
          div.appendChild(container);
          return div;
        },

        renderForm() {
          this.placeholders_container.innerHTML = "";
          if (this.state.placeholders.length === 0) return;
          const nodes = [];
          const fields = this.state.placeholders
            .filter((item) => item[0] === "name")
            .map((item) => ({ title: item[1] }));
          for (const field of fields) {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.addEventListener("change", (ev) => {
              const value = ev.target.value;
              if (value.trim()) {
                this.state.render_data = {
                  ...this.state.render_data,
                  [field.title]: value,
                };
                this.renderPreview();
              }
            });
            input.type = "text";
            label.textContent = field.title;
            label.append(input);
            input.value = this.state.render_data[field.title] || "";
            label.style =
              "display: flex; flex-direction: column; text-transform: capitalize;";
            nodes.push(label);
          }
          this.placeholders_container.append(...nodes);
        },

        renderPreview() {
          this.preview_container.innerHTML = "";
          const clearHTML = this.replaceNbsps(
            htmlEntities.decode(this.state.raw_content)
          );
          
          this.preview_container.innerHTML = Mustache.render(
            clearHTML,
            this.state.render_data
          );
        },

        replaceNbsps(str) {
          var re = new RegExp(String.fromCharCode(160), "g");
          return str.replace(re, " ");
        },

        getPlaceholders(content) {
          try {
            this.state.placeholders = [];
            this.state.placeholders.push(...Mustache.parse(content));
          } catch (error) {
            console.warn(error.message);
          }
          let parsed_content = "";
          const array_content = content.split(" ");
          for (const content of array_content) {
            const with_placeholders = content.replace(/{{(.+)}}/, (value) => {
              const letters = value.match(/\w/g).join("");
              return `<span contenteditable='false' class='placeholder'>${letters}</span>`;
            });
            parsed_content += with_placeholders + " ";
          }
          return parsed_content;
        },

        previewContainer() {
          const div = document.createElement("div");
          div.style =
            "width: 100%; background-color: #ececec; display: flex; flex-direction: column; padding: 1rem;";

          const container = document.createElement("div");
          this.preview_container = container;
          container.style =
            "height: 100%; background: #fff; padding: 4px; border-radius: 4px;";

          div.appendChild(this.createTitle("Preview"));
          div.appendChild(container);
          return div;
        },

        initUI() {
          this.container.append(
            ...[
              this.editor_column,
              this.placeholders_column,
              this.preview_column,
            ]
          );
          document.body.append(this.container);
        },
      };

      app.init();
    </script>
  </body>
</html>
