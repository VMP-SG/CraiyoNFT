"""Original implementation by saharmor at https://github.com/saharmor/dalle-playground
Adapted for the use of CraiyoNFT
"""

import argparse
import base64
import os
from pathlib import Path
from io import BytesIO

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from consts import Config

app = Flask(__name__)
CORS(app)
print("--> Starting DALL-E Server. This might take up to a minute.")

from dalle_model import DalleModel
dalle_model = None

parser = argparse.ArgumentParser(description = "A DALL-E API to generate images from a prompt")
parser.add_argument("--port", type=int, default=8080, help = "backend port")
args = parser.parse_args()

model_size = Config.MODEL.value # enum to be used for DalleModel initialization
image_format = Config.IMAGE_FORMAT.value.value

# TODO
""" Currently returns a json through http response (picked up by frontend API)
    Change to:
    1. Call backend process
        a. Decodes json/base64 and obtain image
        b. Store on IPFS
        c. Get URL to images
        d. Return to this function
    2. Return URLs to images as json through http response
"""
@app.route("/dalle", methods=["POST"])
@cross_origin()
def generate_images_api():
    json_data = request.get_json(force=True)
    text_prompt = json_data["text"]
    num_images = json_data["num_images"]
    generated_imgs = dalle_model.generate_images(text_prompt, num_images)

    returned_generated_images = []
    for _, img in enumerate(generated_imgs):
        buffered = BytesIO()
        img.save(buffered, format=image_format)
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        returned_generated_images.append(img_str)

    print(f"Created {num_images} images from text prompt [{text_prompt}]")
    
    response = {'generatedImgs': returned_generated_images,
    'generatedImgsFormat': image_format}
    return jsonify(response)


@app.route("/", methods=["GET"])
@cross_origin()
def health_check():
    return jsonify(success=True)


with app.app_context():
    dalle_model = DalleModel(model_size)
    # take out to minimise startup time
    # dalle_model.generate_images("warm-up", 1)
    print("--> DALL-E Server is up and running!")
    print(f"--> Model selected - DALL-E {model_size.value}")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=args.port, debug=False)
