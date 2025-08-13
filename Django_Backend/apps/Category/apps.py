from django.apps import AppConfig

class CategoryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Category'

    def ready(self):
        import apps.Category.signals
