# Batch WebP Image Converter

A React.js web application that allows users to convert multiple images (JPG, PNG, etc.) to WebP format using purely client-side processing. WebP is a modern image format that provides superior lossless and lossy compression for images on the web, making your websites faster and more efficient.

[![GitHub repo](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/vaniakash/imageconverttoweb)

## 🚀 Features

- **Upload Individual Images or Folders**: Select multiple image files or an entire folder at once.
- **Batch Processing**: Convert all selected images to WebP format in a single operation.
- **Progress Tracking**: Monitor conversion progress in real-time.
- **File Size Comparison**: See the original file size vs. the WebP version for each image.
- **Total Compression Stats**: View overall space savings across all converted images.
- **Batch Download**: Download all converted images as a single ZIP file with one click.
- **Individual Downloads**: Option to download specific images separately.
- **No Server Required**: All processing happens in your browser - no data is sent to any server.
- **Privacy-Focused**: Your images never leave your computer.

## 📋 Why WebP?

WebP offers significant advantages over traditional image formats:

- **Smaller File Sizes**: Typically 25-35% smaller than comparable JPEG images
- **Support for Transparency**: Like PNG but with much smaller file sizes
- **Wide Browser Support**: All modern browsers now support WebP
- **Faster Websites**: Smaller images mean faster load times and better user experience

## 🔧 How It Works

1. The application uses the HTML5 FileReader API to read the selected image files.
2. Each image is drawn onto an HTML Canvas element.
3. The Canvas API's `toBlob()` method is used to convert the images to WebP format.
4. JSZip packages all converted images into a single downloadable ZIP file.
5. All processing occurs entirely in the browser - no server-side operations.

## 💻 Technologies Used

- **React.js**: Functional components with hooks for state management
- **HTML5 Canvas API**: For image manipulation and conversion
- **FileReader API**: For reading local files
- **JSZip**: For creating downloadable ZIP archives of converted images
- **FileSaver.js**: For triggering browser downloads
- **CSS3**: For styling with responsive design

## 🌐 Browser Compatibility

This application works best in modern browsers that support:
- WebP format
- Canvas API
- FileReader API
- Directory input (`webkitdirectory` attribute)
- URL.createObjectURL

Most recent versions of Chrome, Firefox, Edge, and Safari support these features.

## 🔍 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Development

```bash
# Clone the repository
git clone https://github.com/vaniakash/imageconverttoweb.git

# Navigate to the project directory
cd imageconverttoweb

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm start
# or
yarn start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create optimized build
npm run build
# or
yarn build
```

The optimized files will be in the `build` directory, ready to be deployed to any static web hosting service.

## 📝 Usage Guide

1. **Select Images**:
   - Click "Choose images" to select multiple individual files
   - OR click "Choose a folder" to select an entire folder of images

2. **Convert Images**:
   - Click "Convert All" to process all selected images
   - Watch the progress bar to track conversion status

3. **View Results**:
   - After processing completes, view the grid of converted images
   - Each card shows the original and WebP sizes with compression ratio

4. **Download**:
   - Click "Download All as ZIP" to get all converted images in a single ZIP file
   - Or use individual "Download" buttons on each image card

## 📈 Performance

The application's performance depends on:
- Number and size of images being processed
- Your device's processing power
- Available memory in your browser

For optimal performance, process batches of 20-50 images at a time on average computers.

## 📱 Responsive Design

The interface adapts to different screen sizes:
- Desktop: Grid view with multiple columns
- Tablet: Reduced column count for better visibility
- Mobile: Single column layout with optimized controls

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For any questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by [vaniakash](https://github.com/vaniakash)
