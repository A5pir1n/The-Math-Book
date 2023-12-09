import difflib
import os
import glob

def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def compare_texts(text1, text2):
    return difflib.SequenceMatcher(None, text1, text2).ratio()

def process_files(ocr_folder, correct_folder):
    for ocr_file in glob.glob(os.path.join(ocr_folder, '*.txt')):
        file_name = os.path.basename(ocr_file)
        correct_file = os.path.join(correct_folder, file_name)

        if os.path.exists(correct_file):
            ocr_text = read_file(ocr_file)
            correct_text = read_file(correct_file)

            similarity = compare_texts(ocr_text, correct_text)
            print(f"File: {file_name}, Similarity: {similarity * 100:.2f}%")

            threshold = 0.95
            if similarity >= threshold:
                print(f"Result for {file_name}: Correct")
            else:
                print(f"Result for {file_name}: Incorrect")
        else:
            print(f"No corresponding correct text file found for {file_name}")

ocr_output_folder = 'ocr_outputs'
correct_text_folder = 'correct_texts'

process_files(ocr_output_folder, correct_text_folder)
