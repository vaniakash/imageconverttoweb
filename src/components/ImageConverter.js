import React, { useState, useRef } from 'react';
import './ImageConverter.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ImageConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [processedFiles, setProcessedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [totalSaved, setTotalSaved] = useState(0);
  const fileInputRef = useRef();
  const folderInputRef = useRef();

  const handleFileChange = (event) => {
    const files = event.target.files;
    setError('');
    setProcessedFiles([]);
    setProgress(0);
    setTotalSaved(0);

    if (!files || files.length === 0) {
      return;
    }

    const imageFiles = Array.from(files).filter(file => file.type.match('image.*'));
    
    if (imageFiles.length === 0) {
      setError('No valid image files found');
      return;
    }

    setSelectedFiles(imageFiles);
  };

  const processImages = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsProcessing(true);
    setProcessedFiles([]);
    setProgress(0);
    
    let totalOriginalSize = 0;
    let totalConvertedSize = 0;
    const processed = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      try {
        const result = await convertFileToWebP(file);
        totalOriginalSize += file.size;
        totalConvertedSize += result.blob.size;
        
        processed.push({
          originalFile: file,
          originalSize: file.size,
          webpBlob: result.blob,
          webpSize: result.blob.size,
          previewUrl: result.url,
          name: `${file.name.split('.')[0]}.webp`
        });
        
        setProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
      } catch (err) {
        console.error(`Error processing ${file.name}:`, err);
      }
    }

    setProcessedFiles(processed);
    setTotalSaved(totalOriginalSize - totalConvertedSize);
    setIsProcessing(false);
  };

  const convertFileToWebP = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              resolve({
                blob,
                url: URL.createObjectURL(blob)
              });
            } else {
              reject(new Error('Failed to convert to WebP'));
            }
          }, 'image/webp');
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target.result;
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleDownloadAll = async () => {
    if (processedFiles.length === 0) return;
    
    setIsDownloading(true);
    try {
      // Create a new ZIP file
      const zip = new JSZip();
      
      // Add each WebP image to the ZIP
      processedFiles.forEach(file => {
        zip.file(file.name, file.webpBlob);
      });
      
      // Generate the ZIP file
      const zipContent = await zip.generateAsync({ type: 'blob' });
      
      // Download the ZIP file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      saveAs(zipContent, `webp-images-${timestamp}.zip`);
    } catch (err) {
      console.error('Error creating ZIP file:', err);
      setError('Failed to create ZIP file for download');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSingle = (file) => {
    const url = URL.createObjectURL(file.webpBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setSelectedFiles([]);
    setProcessedFiles([]);
    setProgress(0);
    setError('');
    setTotalSaved(0);
    setIsProcessing(false);
    setIsDownloading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (folderInputRef.current) {
      folderInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionPercentage = (original, converted) => {
    if (original === 0 || converted === 0) return 0;
    const reduction = ((original - converted) / original) * 100;
    return reduction.toFixed(2);
  };

  const totalCompressionPercentage = () => {
    if (processedFiles.length === 0) return 0;
    
    const totalOriginal = processedFiles.reduce((acc, file) => acc + file.originalSize, 0);
    const totalConverted = processedFiles.reduce((acc, file) => acc + file.webpSize, 0);
    
    return compressionPercentage(totalOriginal, totalConverted);
  };

  return (
    <div className="image-converter">
      <div className="upload-section">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            id="file-input"
            className="file-input"
            multiple
          />
          <label htmlFor="file-input" className="file-label">
            Choose images
          </label>
        </div>
        
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            ref={folderInputRef}
            id="folder-input"
            className="file-input"
            webkitdirectory="true"
            directory="true"
          />
          <label htmlFor="folder-input" className="file-label">
            Choose a folder
          </label>
        </div>
        
        {selectedFiles.length > 0 && (
          <>
            <button 
              className="convert-button" 
              onClick={processImages}
              disabled={isProcessing}
            >
              {isProcessing ? 'Converting...' : 'Convert All'}
            </button>
            <button className="reset-button" onClick={resetForm}>
              Reset
            </button>
          </>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {selectedFiles.length > 0 && (
        <div className="file-info">
          <p>Selected {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'}</p>
          {isProcessing && (
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              <span>{progress}%</span>
            </div>
          )}
        </div>
      )}

      {processedFiles.length > 0 && (
        <div className="results-section">
          <div className="summary">
            <h3>Conversion Summary</h3>
            <p>Processed {processedFiles.length} {processedFiles.length === 1 ? 'file' : 'files'}</p>
            <p>Total space saved: {formatFileSize(totalSaved)} ({totalCompressionPercentage()}%)</p>
            <button 
              className="download-button" 
              onClick={handleDownloadAll}
              disabled={isDownloading}
            >
              {isDownloading ? 'Creating ZIP...' : 'Download All as ZIP'}
            </button>
            {isDownloading && (
              <p className="download-status">Please wait while we prepare your ZIP file...</p>
            )}
          </div>
          
          <div className="images-grid">
            {processedFiles.map((file, index) => (
              <div key={index} className="image-card">
                <img src={file.previewUrl} alt={file.name} className="thumbnail" />
                <div className="image-info">
                  <p className="image-name">{file.name}</p>
                  <p>Original: {formatFileSize(file.originalSize)}</p>
                  <p>WebP: {formatFileSize(file.webpSize)}</p>
                  <p>Saved: {compressionPercentage(file.originalSize, file.webpSize)}%</p>
                  <button className="download-single" onClick={() => handleDownloadSingle(file)}>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;