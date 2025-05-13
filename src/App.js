import React from 'react';
import './App.css';
import ImageConverter from './components/ImageConverter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Batch WebP Converter</h1>
        <p>Convert multiple images to WebP format instantly</p>
      </header>
      <main>
        <ImageConverter />
      </main>
      <footer>
        <p>WebP Converter - Client-side Batch Image Conversion</p>
      </footer>
    </div>
  );
}

export default App;
