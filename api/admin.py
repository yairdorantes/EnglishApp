from django.contrib import admin
from .models import CategoriaCard, Comment, UserModel, Cards, CategoriaPost, Post
from django.contrib.auth.admin import UserAdmin

# class EmailExtensionFilter(admin.SimpleListFilter):
#     title = 'Email extension'
#     parameter_name = 'email_extension'

#     def lookups(self, request, model_admin):
#         return (
#             ('edu.utc.mx', '@edu.utc.mx'),
#             ('doc.utc.mx', '@doc.utc.mx'),
#         )

#     def queryset(self, request, queryset):
#         if self.value() == 'edu.utc.mx':
#             return queryset.filter(email__icontains='@edu.utc.mx')
#         elif self.value() == 'doc.utc.mx':
#             return queryset.filter(email__icontains='@doc.utc.mx')

# class CustomUserAdmin(UserAdmin):
#     list_filter = UserAdmin.list_filter + (EmailExtensionFilter,)
#     fieldsets = (
#         (None, {'fields': ("username",'email', 'password')}),
#         ('Personal info', {'fields': ('score', 'premium')}),

#     )

admin.site.register(UserModel)
admin.site.register([Cards, CategoriaPost, Post, Comment, CategoriaCard])
