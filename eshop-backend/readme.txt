Products => Collection 
id:string
name:string
description:string
richDescription:string
image:string
images: string[]
brand:string
price:number
category:Category
countInStock:number
rating:number
isFeatured: boolean
dateCreated: date

Orders=> Collection 
id:string
orderItems:orderItem[]
shippingAddress1: string
shippingAddress2: string
city:string
zip:string
country:string
phone: number
status:string
totatlPrice:number
user: user
dateOrdered:Date

Category=> Collection 
id: string
name: string
color: string
icon: string
image: string

Users=> Collection 
id: string
name: string
email: string
passwordHash: string
street: string
apartment: string
city: string
zip: string
country: string
phone:number
isAdmin: boolean

OrderItems=> Collection 
id:: string
product:Product
quantity:number


angular course link
https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656286#overview
MEAN COURSE
https://www.udemy.com/course/mean-stack-ecommerce-app-angular-nx-primeng/learn/lecture/23486904#overview

Draw.io for creating diagrams for SRS

Order Product ===>
{ 
    "orderItems": [
       { 
           "quantity":2,
           "product":"62ceb3ee1579c9c997091f9d"
       },
       {
           "quantity":4,
        "product":"62cfeeabf0e6d7b28f4691db"
       }
       ],
    "shippingAddress1": "Flower street 2",
    "city": "Camden",
    "zip": "2345",
    "country": "London",
    "phone": 12345,
    "totalprice": 2000,
    "user": "62cfee8bf0e6d7b28f4691d8"
}
 lecture 69

