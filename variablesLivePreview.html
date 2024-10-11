<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
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

      .container {
        display: flex;
        gap: 1rem;
        align-items: stretch;
        height: 50vh;
        width: 100%;
        margin-top: 3rem;
      }

      .container > * {
        flex: 1 0 320px;
      }

      #editor {
        border: 1px solid #242443;
        border-radius: 0.2rem;
        position: relative;
        padding: 1rem;
      }

      #editor::before {
        content: "Editor";
        position: absolute;
        top: -5%;
        left: 0;
        font-weight: 600;
      }

      #placeholders {
        position: relative;
      }

      #placeholders::before {
        content: "Placeholders";
        position: absolute;
        top: -5%;
        left: 0;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div contenteditable="true" id="editor"></div>
      <div id="placeholders"></div>
    </div>
    <script src="https://unpkg.com/mustache@latest"></script>
    <script>
      const BRACES_COUNT = 4;
      const editor = document.querySelector("#editor");
      const placeholders = document.querySelector("#placeholders");
      const content = {
        template: "",
        placeholders: [],
      };

      function getCursorPos(el) {
        const selection = window.getSelection();
        let pos = 0
        if (selection.rangeCount) {
          const range = selection.getRangeAt(0);
          // Create new range instance by clone
          const cloneRange = range.cloneRange();
          // Set ev.target for rangeClone as endContainer, startContainer, commonAncestorContainer
          cloneRange.selectNodeContents(el);
          // Set for rangeClone range-end NODE and range-end OFFSET. (from original range)
          // endContainer will be changed to range.endContainer NODE. (from original range)
          cloneRange.setEnd(range.endContainer, range.endOffset);
          console.log(range.endContainer);
          console.log(range.endOffset);
          console.log(cloneRange);
          pos = cloneRange.toString().length
        }

        return pos
      }

      function getCursorPositionRelativeToText(editableElem) {
        const selection = window.getSelection();
        let currentPos = 0;
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(editableElem);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          currentPos = preCaretRange.toString().length;
        }
        return currentPos;
      }

      // editor.addEventListener("input", (ev) => {
      //   const nodes = ev.target.childNodes;
      //   const value = ev.target.textContent;
      //   if (!nodes.length) return;
      //   const cursor_position = getCursorPos(ev.target);
      //   const cursor_position2 = getCursorPositionRelativeToText(ev.target);

      //   console.log(cursor_position);
      //   console.log(cursor_position2);
        
      //   editor.innerHTML = value;
      //   return;

      //   // let selection = window.getSelection();
      //   // let range = new Range()
      //   // range.setStart(ev.target, cursor_position);
      //   // range.collapse(true);
      //   // selection.addRange(range)
      //   // // Get current selection
      //   // const selection = window.getSelection();
      //   // // Remove current selection
      //   // selection.removeAllRanges();
      //   // // Create new range for selection
      //   // const range = new Range();
      //   // // Range start work with nodes.
      //   // // if editor node have only #text node with content (sakjdnajsdohoas)
      //   // // range will have complains if we will sen start 1, end 3. Because editor.childNodes returns only 1 node (#text node).
      //   // range.setStart(nodes[0], Math.min(nodes[0].length, 4));
      //   // // Range should be collapsed, since I don't need selected range from start to end.
      //   // // Just need to support caret position.
      //   // range.collapse();
      //   // selection.addRange(range);
      // });


      editor.addEventListener("input", (ev) => {
        const value = ev.target.innerHTML;
        let cursorPosition = getCursorPos(ev.target);
        
        if (triggerPlaceholder(value)) {
          cursorPosition = cursorPosition - BRACES_COUNT;
        }
        try {
          content.placeholders.push(...Mustache.parse(value));
        } catch (error) {
          console.warn(error.message);
        }
        renderFormFields();
        editor.innerHTML = content.template;
        setCursorAtNodePosition(editor, cursorPosition);
      });

      function renderFormFields() {
        placeholders.innerHTML = "";
        if (content.placeholders.length === 0) return;
        const nodes = [];
        const fields = content.placeholders
          .filter((item) => item[0] === "name")
          .map((item) => ({ title: item[1] }));
        for (const field of fields) {
          const label = document.createElement("label");
          const input = document.createElement("input");
          input.addEventListener("click", (ev) => {
            const value = ev.target.value;
          });
          input.type = "text";
          label.textContent = field.title;
          label.append(input);
          label.style =
            "display: flex; flex-direction: column; text-transform: capitalize;";
          nodes.push(label);
        }
        placeholders.append(...nodes);
      }

      editor.addEventListener("click", (ev) => {
        if (
          ev.target instanceof HTMLSpanElement &&
          ev.target.getAttribute("class").includes("placeholder")
        ) {
          const span = ev.target;
          span.classList.add("active");
        }
      });

      const triggerPlaceholder = (text) => {
        content.template = text;
        let isPlaceholderAdded = false;
        const withplaceholders = text.replace(/{{(.+)}}/g, (value) => {
          isPlaceholderAdded = true;
          const letters = value.match(/\w/g).join("");
          return `<span contenteditable='false' class='placeholder'>${letters}</span>`;
        });
        content.template = withplaceholders;
        return isPlaceholderAdded;
      };

      function setCursorAtNodePosition(node, position) {
        let selection = window.getSelection();
        let range = new Range()
        let currentPos = 0;
        let found = false;

        function searchNode(node) {
          // 3. If node is text node. If not return to recursion, and call searchNode fn for each child of node prop (<span>)
          if (node.nodeType === Node.TEXT_NODE) {
            // Always will be true if caret position lower than node.length (text content of node + currentPos)
            // Problems starts from H <span>
            // Because content of editor is #text and span.
            // #text node length is 2.
            // and if we compare node.length 2 - position - 6 (position countet based on textContent of editor)
            if (currentPos + node.length >= position) {
              // Set text node of span of #text as node for range. endContainer, startContainer, commonAncestor...
              if (position > node.length) {
                range.setStart(editor, editor.childNodes.length);
              } else {
                range.setStart(node, position);
              }
              range.collapse(true);
              found = true;
            } else {
              // Track node content length
              currentPos += node.length;
            }
          } else {
            // 1. Get all nodes (even text nodes)
            for (let child of node.childNodes) {
              if (found) break;
              // 2. Recursive fn call over each child
              searchNode(child);
            }
          }
        }
        searchNode(node);
        selection.removeAllRanges();
        // When setting counted range based from posiriob props, system constantly support cursor position in cycle.
        selection.addRange(range);
      }
    </script>
    <script>
      const input = document.querySelector("#input");
      input.addEventListener("input", (ev) => {
        const beforeStart = ev.target.selectionStart;
        const beforeEnd = ev.target.selectionEnd;
        ev.target.value = ev.target.value.toUpperCase();
        input.selectionStart = beforeStart;
        input.selectionEnd = beforeEnd;
      });
    </script>
  </body>
</html>
