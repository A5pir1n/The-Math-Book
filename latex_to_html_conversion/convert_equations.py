import sys
import re

def process_latex_file(input_file, output_file):
    with open(input_file, 'r') as file:
        content = file.read()
        content = re.sub(r'\$\$(.*?)\$\$', r'\\begin{equation}\1\\end{equation}', content, flags=re.DOTALL)

    with open(output_file, 'w') as file:
        file.write(content)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py <input_file> <output_file>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    process_latex_file(input_file, output_file)

