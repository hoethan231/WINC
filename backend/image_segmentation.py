import cv2
import mediapipe as mp
import numpy as np
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from PIL import Image

VisionRunningMode = mp.tasks.vision.RunningMode


def crop_image(img):
    # Create the options that will be used for ImageSegmenter
    base_options = python.BaseOptions(
        model_asset_path="./models/selfie_multiclass_256x256.tflite"
    )

    options = vision.ImageSegmenterOptions(
        base_options=base_options,
        running_mode=VisionRunningMode.IMAGE,
        output_category_mask=True,
    )

    # Create the image segmenter
    with vision.ImageSegmenter.create_from_options(options) as segmenter:
        # Create the MediaPipe image file that will be segmented
        image = Image.open(img)
        image = mp.Image(image_format=mp.ImageFormat.SRGB, data=np.array(image))

        # Retrieve the masks for the segmented image
        segmentation_result = segmenter.segment(image)
        category_mask = segmentation_result.category_mask.numpy_view()

        image_data = image.numpy_view()

        # Crop out background
        condition = category_mask == 4
        image_rgba = cv2.cvtColor(image_data, cv2.COLOR_RGB2RGBA)
        image_rgba[..., 3] = np.where(condition, 255, 0)

        output_image = image_rgba
        return output_image
