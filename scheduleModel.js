export const schedule = [
        {
            day: "2022-07-19",
            startingHour: "12:00",
            endingHour: "18:00",
            initialTurns: 4,
            turns: [
                {
                    hour: "12:00",
                    available: true,
                },
                {
                    hour: "13:30",
                    available: true,
                },
                {
                    hour: "15:00",
                    available: true,
                },
                {
                    hour: "16:30",
                    available: true,
                },
            ]
        },
        {
            day: "2022-07-20",
            startingHour: "12:00",
            endingHour: "18:00",
            initialTurns: 4,
            turns: [
                {
                    hour: "12:00",
                    available: false,
                },
                {
                    hour: "13:30",
                    available: false,
                },
                {
                    hour: "15:00",
                    available: false,
                },
                {
                    hour: "16:30",
                    available: false,
                },
            ]
        },
        {
            day: "2022-08-20",
            startingHour: "12:00",
            endingHour: "18:00",
            initialTurns: 4,
            turns: [
                {
                    hour: "12:00",
                    available: false,
                },
                {
                    hour: "13:30",
                    available: false,
                },
                {
                    hour: "15:00",
                    available: true,
                },
                {
                    hour: "16:30",
                    available: false,
                },
            ]
        },
    ]