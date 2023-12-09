import pytesseract
from PIL import Image, ImageEnhance, ImageFilter
import os

pytesseract.pytesseract.tesseract_cmd = r''

def preprocess_image(image_path):
    # Open an image using Pillow
    image = Image.open(image_path)
    image = image.convert('L')  # Convert to grayscale
    image = image.filter(ImageFilter.MedianFilter())  # Apply a median filter
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(2)  # Increase contrast

    return image

def ocr_image(image):
    # Use Tesseract to do OCR on the image
    text = pytesseract.image_to_string(image)
    return text

def process_folder(folder_path):
    # Process all images in the given folder
    for image_file in os.listdir(folder_path):
        if image_file.endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp')):
            image_path = os.path.join(folder_path, image_file)
            processed_image = preprocess_image(image_path)
            text = ocr_image(processed_image)

            # Save the extracted text to a file
            with open(os.path.splitext(image_path)[0] + '.txt', 'w') as file:
                file.write(text)

            print(f"Processed {image_file}")

# Example usage
process_folder('path_to_folder_containing_images')
