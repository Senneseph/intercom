/**
 * Script to generate a PDF version of the documentation
 * 
 * Usage:
 * node generate-pdf.js
 * 
 * Requirements:
 * npm install markdown-pdf
 */

const markdownpdf = require('markdown-pdf');
const fs = require('fs');
const path = require('path');

// Configuration
const outputFile = 'thirteen-chan-distributed-network-docs.pdf';
const tocFile = 'index.md';
const docFiles = [
  'index.md',
  'README.md',
  'USER_GUIDE.md',
  'TECHNICAL.md',
  'ARCHITECTURE.md',
  'INTEGRATION_GUIDE.md',
  'API_REFERENCE.md',
  'DIAGRAM.md'
];

// Create a temporary file with all documentation concatenated
const tempFile = path.join(__dirname, 'temp-combined.md');

// Combine all markdown files
let combinedMarkdown = '';

docFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    combinedMarkdown += content + '\n\n---\n\n';
  } else {
    console.warn(`Warning: File ${file} not found`);
  }
});

// Write the combined markdown to a temporary file
fs.writeFileSync(tempFile, combinedMarkdown);

// PDF options
const options = {
  remarkable: {
    html: true,
    breaks: true,
    syntax: ['definition', 'footnote', 'sup', 'sub']
  },
  cssPath: path.join(__dirname, 'pdf-style.css'),
  paperFormat: 'A4',
  paperOrientation: 'portrait',
  paperBorder: '1cm',
  runningsPath: path.join(__dirname, 'pdf-header-footer.js')
};

// Create the CSS file for PDF styling
const cssContent = `
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 100%;
  padding: 0 1cm;
}

h1, h2, h3, h4, h5, h6 {
  color: #2563EB;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

h1 {
  font-size: 2.2em;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.3em;
}

h2 {
  font-size: 1.8em;
}

h3 {
  font-size: 1.5em;
}

a {
  color: #2563EB;
  text-decoration: none;
}

pre, code {
  background-color: #f6f8fa;
  border-radius: 3px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
}

pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  border: 1px solid #ddd;
}

code {
  padding: 0.2em 0.4em;
  font-size: 85%;
}

pre code {
  background-color: transparent;
  padding: 0;
}

blockquote {
  margin: 0;
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #ddd;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 8px 12px;
  text-align: left;
}

th {
  background-color: #f6f8fa;
}

img {
  max-width: 100%;
  height: auto;
}

hr {
  height: 1px;
  background-color: #ddd;
  border: none;
  margin: 2em 0;
}

.page-break {
  page-break-after: always;
}
`;

// Create the header/footer script
const headerFooterContent = `
exports.header = {
  height: "1cm",
  contents: function(pageNum, numPages) {
    return '<div style="text-align: right; font-size: 8pt; color: #777;">13chan Distributed Network Documentation</div>';
  }
};

exports.footer = {
  height: "1cm",
  contents: function(pageNum, numPages) {
    return '<div style="text-align: center; font-size: 8pt; color: #777;">Page ' + pageNum + ' of ' + numPages + '</div>';
  }
};
`;

// Write the CSS and header/footer files
fs.writeFileSync(path.join(__dirname, 'pdf-style.css'), cssContent);
fs.writeFileSync(path.join(__dirname, 'pdf-header-footer.js'), headerFooterContent);

// Generate the PDF
console.log('Generating PDF documentation...');
markdownpdf(options)
  .from(tempFile)
  .to(path.join(__dirname, outputFile), () => {
    console.log(`PDF documentation generated: ${outputFile}`);
    
    // Clean up temporary files
    fs.unlinkSync(tempFile);
    fs.unlinkSync(path.join(__dirname, 'pdf-style.css'));
    fs.unlinkSync(path.join(__dirname, 'pdf-header-footer.js'));
  });
