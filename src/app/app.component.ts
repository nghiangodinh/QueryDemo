import { EditorComponent } from "ngx-monaco-editor/editor.component";
import { Component, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild(EditorComponent) private editorComponent: EditorComponent;

  editorOptions = {
    theme: "vs-dark",
    language: "sql",
    // scrollbar: {
    //   // Subtle shadows to the left & top. Defaults to true.
    //   useShadows: false,

    //   // Render vertical arrows. Defaults to false.
    //   verticalHasArrows: true,
    //   // Render horizontal arrows. Defaults to false.
    //   horizontalHasArrows: true,

    //   // Render vertical scrollbar.
    //   // Accepted values: 'auto', 'visible', 'hidden'.
    //   // Defaults to 'auto'
    //   vertical: "visible",
    //   // Render horizontal scrollbar.
    //   // Accepted values: 'auto', 'visible', 'hidden'.
    //   // Defaults to 'auto'
    //   horizontal: "visible",

    //   verticalScrollbarSize: 17,
    //   horizontalScrollbarSize: 17,
    //   arrowSize: 30
    // }
  };
  code = "(apple AND juice) OR (apple AND sauce)";

  onInit(editor) {
    const monaco = window["monaco"];

    // this.customTheme(monaco);
    this.customAutocompleteItems(monaco);
    this.customCheckErrorSyntax(monaco);
  }

  private customTheme(monaco: any) {
    // Define a new theme that constains only rules that match this language
    monaco.editor.defineTheme("tca", {
      base: "vs",
      inherit: true,
      rules: [
        { background: "EDF9FA" },
        { token: "comment", foreground: "008800", fontStyle: "italic" }
      ],
      colors: {
        "editor.foreground": "#000000",
        "editor.background": "#EDF9FA",
        "editorCursor.foreground": "#8B0000",
        "editor.lineHighlightBackground": "#0000FF20",
        "editorLineNumber.foreground": "#008800",
        "editor.selectionBackground": "#88000030",
        "editor.inactiveSelectionBackground": "#88000015"
      }
    });
    monaco.editor.setTheme("tca");
  }

  private customAutocompleteItems(monaco: any) {
    // Register a completion item provider for the new language
    monaco.languages.registerCompletionItemProvider("sql", {
      provideCompletionItems: () => {
        return [
          {
            label: "quotes",
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "“apple juice“",
            documentation:
              "Will find mentions of the exact phrase ‘apple juice’ on any webpage",
            insertText: {
              value: '"${1:words}"'
            }
          },
          {
            label: "AND",
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "apple AND juice",
            documentation:
              "Will find mentions of ‘apple’ and ‘juice’ on the same webpage. Must be capitalized",
            insertText: {
              value: " AND ${1:searchterm}"
            }
          },
          {
            label: "OR",
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "apple OR juice",
            documentation:
              "Will find mentions of ‘apple’ or mentions of ‘juice’ on any webpage. Must be capitalized",
            insertText: {
              value: " OR ${1:searchterm}"
            }
          },
          {
            label: "NOT",
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "apple NOT juice",
            documentation:
              "Will find mentions of ‘apple’ on a page as long as ‘juice’ is not mentioned on that page. Must be capitalized",
            insertText: {
              value: " NOT ${1:searchterm}"
            }
          },
          {
            label: "tilde",
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "“apple juice”~5",
            documentation:
              "Will find mentions of the exact phrase ‘apple juice’ and mentions of ‘apple’ and ‘juice’ within 5 words of each other, e.g. ‘This drink was made with fresh apple, orange and pear juice’",
            insertText: {
              value: '"${1:searchterm}"~${2: numofwords}'
            }
          },
          {
            label: "near",
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "(apple OR orange) NEAR/5 (smartphone OR phone)",
            documentation:
              "Will find mentions of ‘apple’ within 5 words of ‘smartphone’ or ‘phone’ and mentions of ‘orange’ within 5 words of ‘smartphone’ or ‘phone’",
            insertText: {
              value: "(${1:words}) NEAR/${2:x} (${3:words})"
            }
          },
          {
            label: "hashtags",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "#${1:searchterm}"
            }
          },
          {
            label: "continent",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "continent:${1:continent-code}"
            }
          },
          {
            label: "country",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "country:${1:country-code}"
            }
          },
          {
            label: "state",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "state:${1:state-code}"
            }
          },
          {
            label: "county",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "county:${1:state-code}"
            }
          },
          {
            label: "city",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "city:${1:city-code}"
            }
          },
          {
            label: "site",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "site:${1:domain}"
            }
          },
          {
            label: "url",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "url:${1:url}"
            }
          },
          {
            label: "links",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "links:${1:domain}"
            }
          },
          {
            label: "title",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: 'title:"${1:url}"'
            }
          },
          {
            label: "author",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "author:${1:url}"
            }
          },
          {
            label: "anyWords",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "${1:searchterm}*"
            },
            documentation: "the wildcard operator *"
          },
          {
            label: "anyChars",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: {
              value: "${1:searchterm}?"
            },
            documentation: "the wildcard operator ?"
          }
        ];
      }
    });
  }

  private customCheckErrorSyntax(monaco: any) {}
}
