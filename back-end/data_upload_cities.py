import csv
import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'changemate_proj.settings')

# Setup Django
django.setup()


# Now import Django models
from cities_app.models import Cities 
from states_app.models import States


def import_sightings(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:

            state = States.objects.get(id=row['state_id'])

            Cities.objects.create(
                id = row['id'],
                name = row['name'],
                state = row['state_id'],
                state_code = state,
                country_id = row['country_id'],
                country_code = row['country_code'],
                latitude = row['latitude'],
                longitude = row['longitude'],
                wikidataid = row['wikiDataId'],
            )

if __name__ == '__main__':
    csv_file_path = '../back-end/cities_app/data/cities.csv'  # Replace with your actual file path
    import_sightings(csv_file_path)

    # Run this script by running `python cities_data_upload.py` in your terminal
