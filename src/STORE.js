
const STORE = {
  user: [],
  pics: [
    {
      id: 1,
      src: "data:image/png;base64,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"
    },
    {
      id: 2,
      src: "data:image/png;base64,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"
    }
  ],
 sprouts: [
  {
  id: 1,
  name: "Christian",
  age: "12 months"
  },
  {
  id: 2,
  name: "Bruce",
  age: "3 months"
  }
  ],
  growth: [
    {
      sproutId: 1,
      title: "Weight",
      date: "2020-10-10",
       number: 10,
       units: "lbs"
      },
      {
        sproutId: 1,
        title: "Weight",
        date: "2020-10-20",
        number: 15,
        units: "lbs"
        },
        {
          sproutId: 2,
          title: "Weight",
          date: "2020-10-20",
          number: 8,
          units: "lbs"
          },
          {
            sproutId: 2,
            title: "Height",
            date: "2020-10-25",
            number: 20,
            units: "inches"
            },
            {
              sproutId: 1,
              title: "Height",
              date: "2020-10-25",
              number: 15,
              units: "inches"
              }
  ],
  activities: [
  {
  sproutId: 1,
  title: "Diaper",
  date: "2020-10-10",
  time: "10:00",
  notes: "Solid"
  },
  {
  sproutId: 2,
  title: "Diaper",
  date: "2020-05-15",
  time: "10:00",
  notes: "Wet"
  },
  {
  sproutId: 1,
  title: "Feed",
  date: "2020-10-01",
  time: "05:00",
  notes: "Right Breast 10 minutes"
  }
  ],
  milestones: [
  {
  sproutId: 1,
  title: "First walked",
  date: "2020-09-30",
  notes: "Took a few steps before falling"
  },
  {
  sproutId: 2,
  title: "First day of school",
  date: "2020-08-05",
  }
  ],
  health: [
  {
  sproutId: 1,
  title: "Appointment",
  date: "2020-10-13",
  notes: "Christian was in the 17th percentile for height but the 40th for weight. The doctor said he was doing very well, he even waved bye-bye!"
  },
  {
  sproutId: 2,
  title: "Vaccination",
  date: "2020-10-13",
  notes: "Flu shot"
  },
  {
    sproutId: 1,
    title: "Appointment",
    date: "2020-07-06",
    notes: "The doctor noticed Christian's flat spot but said it was getting a lot better. He didn't cry, but he would not lie down for the doctor"
    },
    {
      sproutId: 1,
      title: "Vaccination",
      date: "2020-10-13",
      notes: "Flu shot"
      },
  ],
  }
    export default STORE