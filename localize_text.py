import cv2
import os
import argparse
import pytesseract
from PIL import Image
import glob

def process_image(image_path, pre_processor):
    images = cv2.imread(image_path)
    gray = cv2.cvtColor(images, cv2.COLOR_BGR2GRAY)

    if pre_processor == "thresh":
        gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    elif pre_processor == "blur":
        gray = cv2.medianBlur(gray, 3)

    filename = "{}.jpg".format(os.getpid())
    cv2.imwrite(filename, gray)
    text = pytesseract.image_to_string(Image.open(filename))
    os.remove(filename)
    print(text)

    cv2.imshow("Image Input", images)
    cv2.imshow("Output In Grayscale", gray)
    cv2.waitKey(0)

def process_directory(directory, pre_processor):
    for image_path in glob.glob(os.path.join(directory, '*')):
        process_image(image_path, pre_processor)

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True, help="Path to the image or folder")
ap.add_argument("-p", "--pre_processor", default="thresh", help="The preprocessor usage")
args = vars(ap.parse_args())

if os.path.isdir(args["image"]):
    process_directory(args["image"], args["pre_processor"])
else:
    process_image(args["image"], args["pre_processor"])
