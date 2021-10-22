from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Register your models here.
class CustomUserAdmin(UserAdmin):
    list_display = ("email", "is_staff", "is_staff", "is_active")
    search_fields = ("email",)
    readonly_fields = ("id",)
    ordering = ()
    filter_horizontal = ()
    list_filter = ()
    fieldsets = (
        (None, {'fields': ('email',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(CustomUser, CustomUserAdmin)
