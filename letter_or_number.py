import re
import glob
import os

def analyze_text(text):
    alphanumeric_count = len(re.findall('[A-Za-z0-9]', text))
    non_alphanumeric_count = len(re.findall('[^A-Za-z0-9 ]', text))
    total_count = len(text)
    return alphanumeric_count, non_alphanumeric_count, total_count

def analyze_line_by_line(text):
    for line_number, line in enumerate(text.split('\n'), start=1):
        if re.search('[^A-Za-z0-9 ]', line):
            print(f"  Line {line_number}: Non-alphanumeric characters found")

def test_ocr_output(file_path):
    ocr_text = read_file(file_path)
    alphanumeric_count, non_alphanumeric_count, total_count = analyze_text(ocr_text)

    print(f"File '{file_path}':")
    print(f"  Total Characters: {total_count}")
    print(f"  Alphanumeric Characters: {alphanumeric_count}")
    print(f"  Non-Alphanumeric Characters: {non_alphanumeric_count}")

    if non_alphanumeric_count > 0:
        print("  Detailed Analysis:")
        analyze_line_by_line(ocr_text)

def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def process_files(folder_path):
    for file_path in glob.glob(os.path.join(folder_path, '*.txt')):
        test_ocr_output(file_path)

ocr_output_folder = 'extended_ocr_tests'
process_files(ocr_output_folder)
