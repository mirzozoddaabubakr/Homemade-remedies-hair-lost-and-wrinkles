import zipfile
import re
import xml.etree.ElementTree as ET
from urllib.request import urlopen

def extract_text_from_pptx(pptx_path):
    text_content = []
    try:
        with zipfile.ZipFile(pptx_path, 'r') as zf:
            for file in zf.namelist():
                if file.startswith('ppt/slides/slide') and file.endswith('.xml'):
                    try:
                        content = zf.read(file).decode('utf-8')
                        # VERY simple extraction: match anything inside text nodes
                        # PPTX uses <a:t> tags for text
                        root = ET.fromstring(content)
                        # Find all text elements using namespaces
                        ns = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
                        texts = root.findall('.//a:t', ns)
                        slide_texts = [t.text for t in texts if t.text]
                        if slide_texts:
                            text_content.append(f"--- Slide ({file}) ---")
                            text_content.append("\n".join(slide_texts))
                    except Exception as e:
                        text_content.append(f"Error reading {file}: {e}")
    except Exception as e:
        return f"Error opening ZIP: {e}"
    
    return "\n\n".join(text_content)

print(extract_text_from_pptx(r"C:\Users\borba\Desktop\Sabrinajon Sh.A.   1.pptx"))
