const fs = require('fs');
const path = require('path');

const slidesDir = 'C:\\Users\\borba\\Desktop\\web\\pptx_extracted\\ppt\\slides';
const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('.xml')).sort((a, b) => {
    return parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]);
});

let outputString = '';

for (const file of files) {
    const content = fs.readFileSync(path.join(slidesDir, file), 'utf8');
    // Extract all text content between <a:t> and </a:t>
    const regex = /<a:t[^>]*>([\s\S]*?)<\/a:t>/g;
    let match;
    const texts = [];
    while ((match = regex.exec(content)) !== null) {
        texts.push(match[1]);
    }
    if (texts.length > 0) {
        outputString += `\n--- ${file} ---\n` + texts.join(' ') + '\n';
    }
}

fs.writeFileSync('C:\\Users\\borba\\Desktop\\web\\presentation_text_final.txt', outputString);
console.log('Extraction complete to presentation_text_final.txt');
