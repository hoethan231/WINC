import os
from io import BytesIO

import google.generativeai as genai
import PIL.Image
import requests
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])


def get_clothing_JSON(imgUrl):
    # Create the model
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "application/json",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )

    prompt = """Generate a short description of the clothing in the photo. Then,
    identify if the clothing should be worn as a top (over the body) or a bottom
    (on the legs). Then, generate a few tags for the clothing. Each tag must be a
    one word description. You must include at least one tag for the temperature
    that this piece would be worn (for example, "warm", "cold", "rainy", etc.).
    Note that clothes can fit more than one temperature description, such as "cold"
    and "rainy." Also, note that this temperature tag identifies the type of
    temperature outside that this clothing would normally be worn in, and not the
    level of warmth that this clothing emits. For example, such a tag for a hoodie
    would include "cold" and "rainy" because hoodies are usually worn in cooler
    temperatures and, since they have a hood, are likely to be found in rainy
    weather. You must also include a tag for how formal the clothing is. This must
    either be "casual" or "professional." Finally, the tags section must also
    include a couple of example occasions in which this clothing could be seen in
    (for example, "school", "work", party", "gym"). Then, output all of this as
    JSON. Example image: Image is a navy blue plain hoodie. Example output: {
    description: "navy blue plain hoodie", type: "top" tags: ["cold", "windy",
    "rainy", "cool", "casual", school", "shopping", "going out", "party"] } If the
    given image is not a clothing piece, return "null" for the value of each key.
    """

    image_from_url = BytesIO(requests.get(imgUrl).content)
    clothing = PIL.Image.open(image_from_url)
    response = model.generate_content([clothing, prompt])
    return response.text
