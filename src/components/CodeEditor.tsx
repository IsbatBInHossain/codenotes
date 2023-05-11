import Editor, { OnChange, OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import * as monaco from 'monaco-editor';
import { useRef } from 'react';
import './styles/CodeEditor.css';

interface CodeEditorProps {
  initialValue?: string;
  onChange(value: string | undefined): void;
}

function CodeEditor({ initialValue, onChange }: CodeEditorProps): JSX.Element {
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
        height='100%'
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
}
export default CodeEditor;
