import pytesseract
from PIL import Image
import os

# Path to tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'path_to_tesseract_executable'

def crop_image(image_path, crop_area):
    image = Image.open(image_path)
    cropped_image = image.crop(crop_area)
    return cropped_image

def ocr_image(image):
 OCR on the given image.
    text = pytesseract.image_to_string(image)
    return text

def process_image(image_path, crop_area):
    try:
        cropped_image = crop_image(image_path, crop_area)
        text = ocr_image(cropped_image)
        
        with open(os.path.splitext(image_path)[0] + '_ocr.txt', 'w') as file:
            file.write(text)

        print(f"Processed and saved OCR results for {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

def batch_process_images(folder_path, default_crop_area):
    for image_file in os.listdir(folder_path):
        if image_file.endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp')):
            image_path = os.path.join(folder_path, image_file)
            process_image(image_path, default_crop_area)

batch_process_images('path_to_folder_with_images', (100, 100, 400, 400))
