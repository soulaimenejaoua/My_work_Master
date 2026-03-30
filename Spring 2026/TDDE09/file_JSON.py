import os
import json

image_folder = "augmented_images"
output_file = "train.json"

data = []

for img in os.listdir(image_folder):
    if img.endswith((".jpg", ".png", ".jpeg")):
        
        caption = input(f"Enter caption (5-10 words) for {img}: ")

        data.append({
            "image": os.path.join(image_folder, img),
            "text": caption.lower()
        })

with open(output_file, "w") as f:
    for item in data:
        json.dump(item, f)
        f.write("\n")

print("JSON file created:", output_file)