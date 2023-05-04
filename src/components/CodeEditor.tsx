import Editor, { OnChange, OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import monaco from 'monaco-editor';
// import {parse} from "@babel/parser";
// import traverse from "@babel/traverse";
// import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
import { useRef } from 'react';
import './CodeEditor.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = editor => {
    editorRef.current = editor;
    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const handleEditorChange: OnChange = value => {
    onChange(value);
  };
  const handleFormat = () => {
    // get the unformatted code
    const unformattedCode = editorRef.current?.getModel()?.getValue() || '';
    // format the code
    const formattedCode = prettier
      .format(unformattedCode, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    // set the formatted code
    editorRef.current?.setValue(formattedCode);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={handleFormat}
      >
        Format
      </button>
      <Editor
        value={initialValue}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        height='500px'
        defaultLanguage='javascript'
        theme='vs-dark'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          smoothScrolling: true,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};
export default CodeEditor;
