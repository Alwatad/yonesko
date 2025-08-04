import re

with open('seeders/pages.ts', 'r') as f:
    content = f.read()

# Fix duplicate version properties by keeping only the first one
lines = content.split('\n')
fixed_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    fixed_lines.append(line)
    
    # If this line has version: 1, check if the next few lines also have it
    if 'version: 1,' in line:
        # Skip any subsequent lines with version: 1 in the same object
        j = i + 1
        while j < len(lines) and j < i + 5:  # Look ahead max 5 lines
            next_line = lines[j]
            if 'version: 1,' in next_line:
                # Skip this duplicate
                j += 1
            else:
                break
        i = j
    else:
        i += 1

content = '\n'.join(fixed_lines)

with open('seeders/pages.ts', 'w') as f:
    f.write(content)

print("Fixed duplicate properties")
