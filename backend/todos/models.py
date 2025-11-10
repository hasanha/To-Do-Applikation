from django.db import models

class Todo(models.Model):
    STATUS_CHOICES = [
        ('OPEN', 'Offen'),
        ('IN_PROGRESS', 'In Bearbeitung'),
        ('DONE', 'Erledigt'),
    ]

    title = models.CharField(max_length=200, verbose_name="Titel") 
    description = models.TextField(blank=True, verbose_name="Beschreibung")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='OPEN',
        verbose_name="Status"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title