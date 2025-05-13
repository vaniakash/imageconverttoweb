const fs = require('fs');
const { createCanvas, registerFont } = require('canvas');

// Create canvas
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Fill background
ctx.fillStyle = '#282c34';
ctx.fillRect(0, 0, width, height);

// Add gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#3a7bd5');
gradient.addColorStop(1, '#00d2ff');
ctx.fillStyle = gradient;
ctx.fillRect(50, 50, width - 100, height - 100);

// Add text
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 80px Arial';
ctx.textAlign = 'center';
ctx.fillText('Batch WebP Converter', width / 2, height / 2 - 50);

ctx.font = '40px Arial';
ctx.fillText('Convert multiple images to WebP format instantly', width / 2, height / 2 + 50);

// Add decorations
ctx.beginPath();
ctx.arc(width / 2, height / 2 + 150, 50, 0, 2 * Math.PI);
ctx.fillStyle = '#ffffff';
ctx.fill();

ctx.beginPath();
ctx.moveTo(width / 2 - 25, height / 2 + 150 - 15);
ctx.lineTo(width / 2 + 25, height / 2 + 150);
ctx.lineTo(width / 2 - 25, height / 2 + 150 + 15);
ctx.fillStyle = '#282c34';
ctx.fill();

// Save to file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./screenshots/banner.png', buffer);

console.log('Banner created: ./screenshots/banner.png'); 