# Batch WebP Image Converter

A React.js web application that allows users to convert multiple images (JPG, PNG, etc.) to WebP format using purely client-side processing.

## Features

- **Upload Individual Images or Folders**: Select multiple image files or an entire folder at once.
- **Batch Processing**: Convert all selected images to WebP format in a single operation.
- **Progress Tracking**: Monitor conversion progress in real-time.
- **File Size Comparison**: See the original file size vs. the WebP version for each image.
- **Total Compression Stats**: View overall space savings across all converted images.
- **Batch Download**: Download all converted images with a single click, or download individual images.
- **No Server Required**: All processing happens in your browser.

## How It Works

1. The application uses the HTML5 FileReader API to read the selected image files.
2. Each image is drawn onto an HTML Canvas element.
3. The Canvas API's `toBlob()` method is used to convert the images to WebP format.
4. The resulting WebP blobs are then available for preview and download.

## Technologies Used

- React.js (with functional components and hooks)
- HTML5 Canvas API
- FileReader API
- URL.createObjectURL for blob handling
- Promise-based batch processing

## Browser Compatibility

This application requires a modern browser that supports:
- WebP format
- Canvas API
- FileReader API
- Directory input (`webkitdirectory` attribute)
- URL.createObjectURL

Most recent versions of Chrome, Firefox, Edge, and Safari support these features.

## Getting Started

### Development

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

1. Run `npm run build`
2. The optimized files will be in the `build` directory
3. Deploy these files to any static web hosting service

## Usage

1. Click "Choose images" to select multiple individual image files
   - OR -
   Click "Choose a folder" to select an entire folder of images
2. Click "Convert All" to process all selected images
3. Once processing is complete, view the results and download options
4. Click "Download All" to get all converted images, or download individual images using their respective buttons

## License

MIT
