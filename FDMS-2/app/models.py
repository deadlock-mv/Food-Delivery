# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import User


class Categorylist(models.Model):
    id = models.AutoField(primary_key=True)
    categoryname = models.CharField(max_length=255, blank=False, null=False)
    image = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.categoryname or ''


class Itemlist(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Categorylist, on_delete=models.CASCADE, blank=True, null=True, related_name="items")
    itemname = models.CharField(max_length=255, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    status = models.BooleanField(default=True)
    
    def __str__(self):
        return self.itemname or ''


class Deliveryagents(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=10, blank=True, null=True)
    agentid = models.AutoField(primary_key=True)
    password = models.CharField(max_length=255, blank=True, null=True)

        
    def __str__(self):
        return self.name


class Address(models.Model):
    address = models.CharField(max_length=300, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    phone = models.CharField(max_length=10, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name


class Foodorder(models.Model):
    id = models.AutoField(primary_key=True)
    customerid = models.ForeignKey(User, models.DO_NOTHING, blank=False, null=False, related_name="orders")
    status = models.CharField(blank=False, null=False, max_length=256, default="preparing")
    delagentid = models.ForeignKey(Deliveryagents, models.DO_NOTHING, default=1)
    totalamount = models.IntegerField(blank=False, null=False, default=0)
    orderdate = models.DateTimeField(blank=True, null=True, auto_now_add=True)
    address = models.ForeignKey(Address, models.DO_NOTHING, null=True, blank=True)


    def __str__(self):
        return f'{self.id}'


class Feedback(models.Model):
    orderid = models.ForeignKey(Foodorder, models.DO_NOTHING, blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)


    def __str__(self):
        return self.orderid


class Orderitem(models.Model):
    id = models.AutoField(primary_key=True)
    orderid = models.ForeignKey(Foodorder, on_delete=models.CASCADE, related_name="orderitem")
    itemid = models.ForeignKey(Itemlist, on_delete=models.CASCADE)
    quantity = models.IntegerField(blank=False, null=False)


    def __str__(self):
        return f'{self.orderid}'


