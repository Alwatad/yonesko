import re

with open('seeders/pages.ts', 'r') as f:
    content = f.read()

# Simple replacement for remaining localized RichText structures
replacements = [
    # Pattern: en: { root: { ... } }, pl: { root: { ... } }
    # Replace with just the English root structure
    (r'en:\s*\{\s*root:\s*\{([^}]+children:\s*\[[^\]]+\][^}]*)\}\s*\},\s*pl:\s*\{[^}]+root:[^}]+\}[^}]*\}',
     r'root: {\n            \1,\n            direction: "ltr",\n            format: "",\n            indent: 0,\n            version: 1,\n          }')
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('seeders/pages.ts', 'w') as f:
    f.write(content)

print("Applied final RichText fixes")
