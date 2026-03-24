import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text_from_pptx(pptx_path):
    slides_text = []
    ns = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
          'p': 'http://schemas.openxmlformats.org/presentationml/2006/main'}
    
    with zipfile.ZipFile(pptx_path, 'r') as zf:
        # Get slide files and sort them numerically
        slide_files = [f for f in zf.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
        slide_files.sort(key=lambda x: int(''.join(filter(str.isdigit, x))))
        
        for slide_file in slide_files:
            content = zf.read(slide_file)
            root = ET.fromstring(content)
            
            texts = []
            for t in root.findall('.//a:t', ns):
                if t.text:
                    texts.append(t.text.strip())
            
            if texts:
                slides_text.append(f"--- {os.path.basename(slide_file)} ---\n" + " ".join(texts))
    
    return "\n\n".join(slides_text)

pptx_path = r"C:\Users\borba\Desktop\Sabrinajon Sh.A.   1.pptx"
print(extract_text_from_pptx(pptx_path))
