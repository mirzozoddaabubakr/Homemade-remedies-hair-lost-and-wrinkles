const fs = require('fs');
const path = require('path');

const slidesDir = 'C:\\Users\\borba\\Desktop\\web\\pptx_extracted\\ppt\\slides';
const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('.xml')).sort();

let output = '';
for (const file of files) {
    const content = fs.readFileSync(path.join(slidesDir, file), 'utf8');
    const regex = /<a:t[^>]*>(.*?)<\/a:t>/g;
    let match;
    const texts = [];
    while ((match = regex.exec(content)) !== null) {
        texts.push(match[1]);
    }
    output += `\n--- ${file} ---\n` + texts.join(' ') + '\n';
}

console.log(output);
fs.writeFileSync('C:\\Users\\borba\\Desktop\\web\\presentation_text.txt', output);
