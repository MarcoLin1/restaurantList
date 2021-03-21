# Restaurant plus+
Simple website of restaurant established by Node.js and Express

# Features
1. Search your favorite restaurant by name and category in search bar
2. Click restaurant card and "i" icon that will see the detail of phone, description, location and google map
3. Click "+" icon that you can add new restaurant in this website
4. Click "edit" icon from restaurant card or detail page, you can edit the restaurant's information
5. Click "trash" icon from restautant card or detail page, you can delete the restaurant
6. Click "Restautant plus+" can get back to first page

![image](https://github.com/MarcoLin1/restaurantList/blob/master/restaurantList_.png)

# Installation
1. Clone repository to your computer
```
git clone https://github.com/MarcoLin1/restaurantList.git
```
2. CD to project folder
```
cd restaurantList
```
3. Install npm 

4. Install nodemon
```
npm install -g nodemon
```
5. Download [mongodb](https://www.mongodb.com/) and make folder to conncet with mongodb 
```
mkdir mongodb-data
cd ~/mongodb/bin
$ ./mongod --dbpath /Users/[your username]/[mongodb-data's path]/mongodb-data
```
6. Create data in mongodb
```
npm run seed
```
7. Initiate server and execute the website
```
npm run dev 
```
Terminal show the message 
```
Server is running on http://localhost:3000 
mongodb connected!
```

# Development Environment 
* Visual studio code 
* Express: 4.17.1
* Express-handlebars: 5.2.1
* Node.js: 10.15.0
* Nodemon: 2.0.7
* Mongodb: 4.2.13
* Mongoose: 5.12.0
* Robot 3T: 1.4.3



