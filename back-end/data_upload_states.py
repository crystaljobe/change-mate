import csv
import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'changemate_proj.settings')

# Setup Django
django.setup()


# Now import Django models
from states_app.models import States
from countries_app.models import Countries


def import_sightings(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:

            lat = row['latitude'] if row['latitude'] != '' else None
            lon  = row['longitude'] if row['longitude'] != '' else None
            country = Countries.objects.get(id=row['country_id'])

            States.objects.create(
                id=row['id'],
                name=row['name'],
                state_code=row['state_code'],
                country=country,
                country_code=row['country_code'],
                type=row['type'],
                latitude=lat,
                longitude=lon,
            )

if __name__ == '__main__':
    csv_file_path = '../back-end/states_app/data/states.csv'  # Replace with your actual file path
    import_sightings(csv_file_path)

    # Run this script by running `python data_upload_states.py` in your terminal
