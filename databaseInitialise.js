use journal;
db.dropDatabase();

use journal;
db.journalEntries.insert(
  [
    {
      entryNumber: 1,
      timestamp: 'Thu Feb 23 2017 14:20:29',
      content: 'Hello world!'
    },
    {
      entryNumber: 2,
      timestamp: 'Fri Feb 24 2098 14:30:12',
      content: 'This mission has really dragged on, I haven\'t used this nearly enough!...'
    },
    {
      entryNumber: "entry number counter",
      currentEntryNumber: 2
    }
  ]
);

use mission;
db.dropDatabase();

use mission;
db.missionUpdates.insert(
  [
    {
      from: "Family <fam@yahoo.com>",
      message: "We sent you a care package of your favourite shows... just 2 weeks to go!",
      attachment: true
    },
    {
      from: "Marine Conservation Society, The <marine_society@gmail.com>",
      message: "Here are the latest figures on the impact of trawling on various fish species you asked for.",
      attachment: true
    },
    {
      from: "Buddy <sushirus@aol.com>",
      message: "Hey! Had sushi tonight and thought of you... Because it's our favourite, not because you're under the sea!",
      attachment: false
    },
    {
      from: "University of California, Berkeley <ucl-berkeley@ed.com>",
      message: "Can't wait for your figures, its really going to enhance the courses for next year.",
      attachment: false
    },
    {
      from: "Plenty of Fish <pofish@pof.com>",
      message: "We have plenty of catches for you today! Check out these just for the halibut.",
      attachment: false
    }
  ]
);
