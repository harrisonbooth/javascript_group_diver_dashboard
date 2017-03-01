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
      timestamp: 'Fri Feb 24 2016 14:30:12',
      content: 'This mission has really dragged on, I haven\'t used this nearly enough!...'
    },
    {
      entryNumber: 3,
      timestamp: 'Sat Feb 25 2016 14:40:45',
      content: 'Ran into the Trident nuclear sub the other day, we surfaced and exchanged numbers... should see the curves on that sub...'
    },
    {
      entryNumber: 4,
      timestamp: 'Sun Feb 26 2016 14:50:12',
      content: 'I saw a weird fish the today, bright orange with three eyes... crazy...'
    },
    {
      entryNumber: 5,
      timestamp: 'Mon Feb 27 2017 15:10:45',
      content: 'Piloted the submarine into the Mariana Trench; not sure how long I was down there, probably just a few days.'
    },
    {
      entryNumber: 6,
      timestamp: 'Tue Feb 28 2017 15:20:46',
      content: 'Saw a cute mermaid earlier, she swam away: oh well, plenty of fish in the sea! (better check the oxygen tanks)'
    },
    {
      entryNumber: "entry number counter",
      currentEntryNumber: 6
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
