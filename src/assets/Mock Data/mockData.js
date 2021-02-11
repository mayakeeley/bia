const mockData = {
    users: [
        {
            uid: 8631,
            thirdPartyUid: "86311A",
            photoUrl: "https://loremflickr.com/640/360",
            name: "Jane",
            dateOfBirth: "1997-28-03",
            city: "Manchester",
            about: "I love lardy cakes.",
            activities: [
                {
                    activityId: "skiing",
                    level: 3
                },
                {
                    activityId: "hockey",
                    level: 2
                },
                {
                    activityId: "running",
                    level: 1
                }
            ],
            goals: ["lose weight"],
            seenUsers: [8359],
            likedUsers: [
                {
                    uid: 8359,
                    liked: false
                }
            ]
        },
        {
            uid: 8632,
            thirdPartyUid: "86321A",
            photoUrl: "https://loremflickr.com/640/360",
            name: "Margot",
            dateOfBirth: "1995-21-03",
            city: "Manchester",
            about: "I love eccles cakes.",
            activities: [
                {
                    activityId: "skiing",
                    level: 2
                },
                {
                    activityId: "swimming",
                    level: 2
                },
                {
                    activityId: "walking",
                    level: 2
                }
            ],
            goals: ["make friends"],
            seenUsers: [8631],
            likedUsers: [
                {
                    uid: 8631,
                    liked: true
                }
            ]
        },
        {
            uid: 8359,
            thirdPartyUid: "83591A",
            photoUrl: "https://loremflickr.com/640/360",
            name: "Margaret",
            dateOfBirth: "1996-01-06",
            city: "Manchester",
            about: "I love welsh cakes.",
            activities: [
                {
                    activityId: "fencing",
                    level: 2
                },
                {
                    activityId: "golf",
                    level: 1
                },
                {
                    activityId: "walking",
                    level: 2
                }
            ],
            goals: ["make friends"],
            seenUsers: [8631, 8632, 8630],
            likedUsers: [
                {
                    uid: 8631,
                    liked: true
                },
                {
                    uid: 8632,
                    liked: true
                },
                {
                    uid: 8360,
                    liked: true
                }
            ]
        },
        {
            uid: 8360,
            thirdPartyUid: "83601A",
            photoUrl: "https://loremflickr.com/640/360",
            name: "Maggie",
            dateOfBirth: "1997-01-06",
            city: "Manchester",
            about: "I love victoria sponge.",
            activities: [
                {
                    activityId: "bowles",
                    level: 2
                },
                {
                    activityId: "tableTennis",
                    level: 1
                },
                {
                    activityId: "walking",
                    level: 2
                }
            ],
            goals: ["make friends"],
            seenUsers: [8631, 8632, 8359],
            likedUsers: [
                {
                    uid: 8631,
                    liked: false
                },
                {
                    uid: 8632,
                    liked: true
                },
                {
                    uid: 8359,
                    liked: true
                }
            ]
        },
        {
            uid: 8361,
            thirdPartyUid: "83611A",
            photoUrl: "https://loremflickr.com/640/360",
            name: "Janet",
            dateOfBirth: "1997-02-09",
            city: "Manchester",
            about: "I love battenburg.",
            activities: [
                {
                    activityId: "bowles",
                    level: 2
                },
                {
                    activityId: "fencing",
                    level: 1
                },
                {
                    activityId: "walking",
                    level: 2
                }
            ],
            goals: ["make friends"],
            seenUsers: [],
            likedUsers: [
                {}
            ]
        }
    ],

    activities: [],

    matches: [
        {
            matchId: 1,
            dateOfMatch: "2021-08-02",
            userIds: [
                "8360",
                "8359"
            ],
            messages: [
                {
                    messageId: 100,
                    time: "2021-08-02 22:33GMT",
                    messageContent: "Are we going to the pub?",
                    userId: 8360
                }
            ]
        },
    ]
}

export default mockData