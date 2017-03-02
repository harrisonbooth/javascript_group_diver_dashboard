#JavaScript Group Project
##Deep Sea Diver Information Dashboard.
###Information dashboard and journal for submariners.
First large scale JavaScript project, as well as first project working as a group.
  - Backend
    * Journal database with journal entries and entry number counter.
    * Update database with seeded 'emails' from people in submariners lives.
    * Both databases routed into apis to be used by frontend.
  - Frontend
    * Accesses journal database using routed api to create journal widget.
    * CRUD actions on the journal.
    * Accesses updates database and display updates one at a time in sequence.
    * Accesses Google news api to display 10 news headlines on a scroller in a loop.
    * Access the Google maps api to display map with the current location of the user.
    * Button to take the user back to their geolocation.
    * Header displaying the current date and time updating every second.

---

### Instructions to run
  - Run `npm install` in both the top level and client folders.
  - Ensure to have 'mongodb' installed.
  - Run `mongod` in terminal.
  - Run `npm start` in both the top level and client folders.
  - Open `http://localhost:3000` in your chosen browser (tested in chrome).

---

### Dependecies
  - Webpack
  - Nodemon
  - Mongodb
  - Express
  - Mocha
  - Body-parser

### Finished product

![alt text](http://i.imgur.com/RFmViua.jpg)
