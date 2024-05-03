import boto3
from .settings import env
import base64
import io

session = boto3.Session(
    aws_access_key_id=env.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=env.get('AWS_SECRET_ACCESS_KEY')
)

class ImageUploader:
    @staticmethod
    def upload_image(user_id, image):
        filename = f'profile_photos/{user_id}_profile_picture.jpeg'
        imagedata = image

        # Decode the base64-encoded image data into bytes
        try:
            image_bytes = base64.b64decode(imagedata.split(',')[1])
        except Exception as e:
            return False, str(e)

        s3 = session.resource('s3')
        try:
            # Upload the image to S3
            obj = s3.Object(env.get('AWS_STORAGE_BUCKET_NAME'), filename)
            obj.put(ACL='public-read', Body=image_bytes, ContentType='image/jpeg')
            s3_url = f"https://{env.get('AWS_STORAGE_BUCKET_NAME')}.s3.amazonaws.com/{filename}"
            return s3_url
        except Exception as e:
            return False, str(e)