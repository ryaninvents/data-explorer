import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const REQUIRE_CONFIG = {
  url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
  paths: {
    'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.10.0/min/vs'
  }
};

const editorOptions = {
  selectOnLineNumbers: true,
  scrollBeyondLastLine: false,
  lineNumbers: false,
  minimap: {enabled: false},
};

export default class ReplEditor extends React.Component {
    state = {
        lineHeight: 18,
        numLines: 1,
    };

    editorDidMount = () => {
        const {editor} = this.monaco;
        editor.onDidChangeModelContent(this.handleContentChange);
    }

    handleContentChange = () => {
        const {editor} = this.monaco;
        this.setState({
            numLines: editor.getModel().getLineCount(),
        }, () => {
            editor.layout();
            editor.setScrollTop(0);
        });
    }

    setMonacoRef = (ref) => { this.monaco = ref; };

    render() {
        const {lineHeight, numLines} = this.state;
        return (
          <MonacoEditor
            width="100%"
            height={lineHeight * numLines}
            language="javascript"
            options={editorOptions}
            requireConfig={REQUIRE_CONFIG}
            ref={this.setMonacoRef}
            editorDidMount={this.editorDidMount}
          />
        );
    }
}
