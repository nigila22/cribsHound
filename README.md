# cribsHound

How to Setup the Code

Before getting started please check whether node, MongoDb are installed in the system.

Clone the repo and extract the code in the folder where you want to place the code

# Front-end Reactjs
Open the terminal and navigate to the project folder front-end.  Now run

### `npm install`

To install the dependency needed for this project.  

And run to start the front-end

### `npm start`

The front-end will run in the default port 3000 

To view the front end and go to `http://localhost:3000/

# Backend Node

Open the terminal and navigate to the project folder back-end.  Now run 

### `npm install`

To install the dependency needed for this project.  

Create .env file in the root directory of back-end and add the DB details and Port details.

### PORT=5000
### DBNAME=Your Database name
### DBUSERNAME=Your Database user name
### DBPASSWORD=Your Database Passwor
### DBCOLLECTION=Your Database Collection Name

If you want to import the dataset initialy.  Run the below command. 

### mongoimport --db db-name --collection collection-name --file properties.json --jsonArray --parseGrace "skip"

`properties.json - will be place in back-end root directory

And run to start the back-end using 

### `node app.js`

After successfull configuration you will be seeing the below page

![image](https://github.com/nigila22/cribsHound/assets/144683754/70703def-db2c-4470-89e0-e5d84462621d)

### Add New
![image](https://github.com/nigila22/cribsHound/assets/144683754/7401a178-03e9-4602-89ce-a57c69f21a9a)

### Update 

![image](https://github.com/nigila22/cribsHound/assets/144683754/b92d2419-cddb-448d-8c7c-a036ce8d82e3)

### Search
![image](https://github.com/nigila22/cribsHound/assets/144683754/0bb99862-59a3-4938-abae-49ad62c9173d)

Thank you
