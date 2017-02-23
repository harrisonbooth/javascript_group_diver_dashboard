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
