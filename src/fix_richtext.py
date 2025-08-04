import re

with open('seeders/pages.ts', 'r') as f:
    content = f.read()

# Find and replace all remaining localized RichText structures
# Pattern: richText: { en: { root: { ... } }, pl: { root: { ... } } }
def replace_richtext(match):
    # Extract just the first root structure content (English)
    full_match = match.group(0)
    
    # Find the en root structure
    en_match = re.search(r'en:\s*{\s*root:\s*{([^}]+}[^}]*)}', full_match, re.DOTALL)
    if not en_match:
        return full_match
    
    en_root_content = en_match.group(1).strip()
    
    # Create the fixed structure
    fixed_structure = f'''richText: {{
          root: {{
            {en_root_content},
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
          }},
        }},'''
    
    return fixed_structure

# Pattern to match the complete localized richText structure
pattern = r'richText:\s*{\s*en:\s*{\s*root:\s*{[^}]+}[^}]*},\s*pl:\s*{[^}]+}[^}]*}[^}]*},'

# Apply replacements
content = re.sub(pattern, replace_richtext, content, flags=re.DOTALL)

# Also add version: 1 to child elements that don't have it
content = re.sub(r'(type: "p"),', r'\1,\n                version: 1,', content)
content = re.sub(r'(type: "h[1-6]",\s*tag: "h[1-6]"),', r'\1,\n                version: 1,', content)

with open('seeders/pages.ts', 'w') as f:
    f.write(content)

print("Fixed all remaining RichText structures")
