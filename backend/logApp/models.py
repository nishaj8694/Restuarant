from django.db import models
from django.contrib.auth.models import AbstractUser,PermissionsMixin
from .manager import UsManager


class customUser(AbstractUser,PermissionsMixin):
    username=None
    Partnership=models.BooleanField(default=False)
    Delivery=models.BooleanField(default=False)
    Is_verified = models.BooleanField(default=False)
    OTP = models.CharField(max_length=100,null=True,blank=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects=UsManager()