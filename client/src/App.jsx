import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import './App.css';

function App() {
  const [originalCode, setOriginalCode] = useState('');
  const [migratedCode, setMigratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMigrate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: originalCode }),
      });
      const data = await response.json();
      setMigratedCode(data.migratedCode);
    } catch (error) {
      console.error('Migration failed:', error);
    }
    setIsLoading(false);
  };

  const handleAccept = () => {
    // Logic to accept migrated code
    alert('Migrated code accepted!');
  };

  const handleExport = () => {
    // Logic to export migrated code
    const blob = new Blob([migratedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'migrated-code.js';
    a.click();
  };

  return (
    <div className="App">
      <h1 class="app-title">JS MIGRATION ASSISTANT</h1>
      <div className="editor-container">
        <div className="editor">
          <h2>Original Code</h2>
          <Editor
            height="400px"
            language="javascript"
            value={originalCode}
            onChange={setOriginalCode}
            theme="vs-dark"
          />
        </div>
        <div className="editor">
          <h2>Migrated Code</h2>
          <Editor
            height="400px"
            language="javascript"
            value={migratedCode}
            onChange={setMigratedCode}
            theme="vs-dark"
          />
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleMigrate} disabled={isLoading}>
          {isLoading ? 'Migrating...' : 'Migrate Code'}
        </button>
        <button onClick={handleAccept} disabled={!migratedCode}>
          Accept Migration
        </button>
        <button onClick={handleExport} disabled={!migratedCode}>
          Export Code
        </button>
      </div>
      {originalCode && migratedCode && (
        <div className="diff-viewer">
          <h2>Diff View</h2>
          <ReactDiffViewer
            oldValue={originalCode}
            newValue={migratedCode}
            splitView={true}
          />
        </div>
      )}
    </div>
  );
}

export default App;
