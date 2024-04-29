from django.db import models


class VolunteerApplication(models.Model):
    volunteer_role = models.ForeignKey('volunteer_roles_app.VolunteerRole', on_delete=models.CASCADE)
    applicant = models.ForeignKey('profile_app.UserProfile', on_delete=models.CASCADE) # user display name and id
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    preferred_contact_method = models.CharField(max_length=50)
    availability = models.CharField(max_length=500)
    return_volunteer = models.BooleanField(default=False)
    volunteer_interest = models.TextField()
    volunteer_experience = models.TextField()
    application_status = models.CharField(max_length=50, default='pending')
    # application_status - pending, accepted, rejected
    # application_date - auto_now_add
    # decision_date - auto_now
    # decision_made_by - user who made the decision
    # decision_text - text explaining the decision