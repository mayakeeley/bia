import {UserModel} from "../../models/user.model";
import { MatchModel } from "../../models/match.model";
import {ActivityModel} from "../../models/activity.model";

export const mockData: { users: UserModel[], activities: ActivityModel[], matches: MatchModel[] } = {
    users: [
        {
            uid: "86311A",
            photoUrl: "https://loremflickr.com/640/360",
            name: "Jane",
            dob: "1997-28-03",
            location: "Manchester",
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
            users: {'83591A': false},
        },
        {
            uid: "86321A",
            photoUrl: "https://loremflickr.com/640/360",
            name: "Margot",
            dob: "1995-21-03",
            location: "Manchester",
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
            users: {'86311A': true},
        },
        {
            uid: "83591A",
            photoUrl: "https://loremflickr.com/640/360",
            name: "Margaret",
            dob: "1996-01-06",
            location: "Manchester",
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
            users:{'86311A': true, '86321A': true, '83601A': true},
        },
        {
            uid: "83601A",
            photoUrl: "https://loremflickr.com/640/360",
            name: "Maggie",
            dob: "1997-01-06",
            location: "Manchester",
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
            users: {'86311A': false, '86321A': true, "83591A": true},
        },
        {
            uid: '83611A',
            photoUrl: "https://loremflickr.com/640/360",
            name: "Janet",
            dob: "1997-02-09",
            location: "Manchester",
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
            users: {}
        }
    ],

    activities: [],

    matches: [
        {
            matchId: 'skjen97',
            timestamp: "2021-08-02 22:30GMT",
            userIds: [
                "83601A",
                "83591A"
            ],
            messages: [
                {
                    messageId: '10ksjfelkjr0',
                    timestamp: "2021-08-02 22:33GMT",
                    messageContent: "Are we going to the pub?",
                    userId: '83601A'
                }
            ]
        },
    ]
}

export default mockData
