import csv
import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'changemate_proj.settings')

# Setup Django
django.setup()


# Now import Django models
from countries_app.models import Countries  


def import_sightings(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:

            lat = row['latitude'] if row['latitude'] != '' else None
            lon  = row['longitude'] if row['longitude'] != '' else None

            Countries.objects.create(
                id=row['id'],
                name=row['name'],
                country_code=row['iso3'],
                latitude=lat,
                longitude=lon,
                flag_emoji=row['emoji'],
            )

if __name__ == '__main__':
    csv_file_path = '../back-end/countries_app/data/countries.csv'  # Replace with your actual file path
    import_sightings(csv_file_path)

# Run this script by running `python data_upload_countries.py` in your terminal
