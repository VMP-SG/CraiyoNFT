from enum import Enum
from consts import ModelSize, ImageFormat

class Config(Enum):
    MODEL = ModelSize.MINI
    IMAGE_FORMAT = ImageFormat.PNG
    NUM_OF_IMAGES = 6
