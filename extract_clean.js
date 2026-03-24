const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js'); // If not available, I'll use regex again but better

const slidesDir = 'C:\\Users\\borba\\Desktop\\web\\pptx_extracted\\ppt\\slides';
const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('.xml')).sort((a, b) => {
    return parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/));
});

let outputString = '';

async function run() {
    for (const file of files) {
        const content = fs.readFileSync(path.join(slidesDir, file), 'utf8');
        // Better regex to match text nodes purely
        const matches = content.match(/<a:t[^>]*>(.*?)<\/a:t>/g);
        if (matches) {
            const texts = matches.map(m => m.replace(/<a:t[^>]*>|<\/a:t>/g, ''));
            outputString += `\n--- ${file} ---\n` + texts.join(' ') + '\n';
        }
    }
    fs.writeFileSync('C:\\Users\\borba\\Desktop\\web\\presentation_text_clean.txt', outputString);
    console.log('Extraction complete.');
}

run();
