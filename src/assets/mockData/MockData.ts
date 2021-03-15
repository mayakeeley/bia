import { UserModel } from "../../models/user.model";
import { MatchModel } from "../../models/match.model";
import { ActivityModel } from "../../models/activity.model";

export const mockData: {
  users: UserModel[];
  activities: ActivityModel[];
  matches: MatchModel[];
} = {
  users: [
    {
      uid: "86311A",
      googleuid: "86311A",
      photoUrl: "https://loremflickr.com/640/360",
      name: "Jane",
      dob: "1997-28-03",
      location: "Manchester",
      about: "I love lardy cakes.",
      activities: [
        {
          activityId: "skiing",
          level: 3,
          activityName: "Skiing",
        },
        {
          activityId: "hockey",
          level: 2,
          activityName: "Hockey",
        },
        {
          activityId: "running",
          level: 1,
          activityName: "Running",
        },
      ],
      goals: ["lose weight"],
      users: { "83591A": false },
    },
    {
      uid: "86321A",
      googleuid: "86311A",
      photoUrl: "https://loremflickr.com/640/360",
      name: "Margot",
      dob: "1995-21-03",
      location: "Manchester",
      about: "I love eccles cakes.",
      activities: [
        {
          activityId: "skiing",
          level: 2,
          activityName: "Skiing",
        },
        {
          activityId: "swimming",
          level: 2,
          activityName: "Swimming",
        },
        {
          activityId: "walking",
          level: 2,
          activityName: "Walking",
        },
      ],
      goals: ["make friends"],
      users: { "86311A": true },
    },
    {
      uid: "83591A",
      googleuid: "86311A",
      photoUrl: "https://loremflickr.com/640/360",
      name: "Margaret",
      dob: "1996-01-06",
      location: "Manchester",
      about: "I love welsh cakes.",
      activities: [
        {
          activityId: "fencing",
          level: 2,
          activityName: "Fencing",
        },
        {
          activityId: "golf",
          level: 1,
          activityName: "Gold",
        },
        {
          activityId: "walking",
          level: 2,
          activityName: "Walking",
        },
      ],
      goals: ["make friends"],
      users: { "86311A": true, "86321A": true, "83601A": true },
    },
    {
      uid: "83601A",
      googleuid: "86311A",
      photoUrl: "https://loremflickr.com/640/360",
      name: "Maggie",
      dob: "1997-01-06",
      location: "Manchester",
      about: "I love victoria sponge.",
      activities: [
        {
          activityId: "bowles",
          level: 2,
          activityName: "Bowles",
        },
        {
          activityId: "tableTennis",
          level: 1,
          activityName: "Table Tennis",
        },
        {
          activityId: "walking",
          level: 2,
          activityName: "Walking",
        },
      ],
      goals: ["make friends", "make more friends", "Hope to meet people"],
      users: { "86311A": false, "86321A": true, "83591A": true },
    },
    {
      uid: "83611A",
      googleuid: "86311A",
      photoUrl: "https://loremflickr.com/640/360",
      name: "Janet",
      dob: "1997-02-09",
      location: "Manchester",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      activities: [
        {
          activityId: "bowles",
          level: 2,
          activityName: "Bowles",
        },
        {
          activityId: "fencing",
          activityName: "Fencing",
          level: 1,
        },
        {
          activityId: "walking",
          level: 2,
          activityName: "Walking",
        },
      ],
      goals: ["make friends"],
      users: {},
    },
  ],

  activities: [
    {
      activityId: "bowles",
      activityName: "Bowles",
      levels: [
        { ability: "a bit shit", frequency: "not often" },
        { ability: "not quite so shit", frequency: "sometimes" },
        { ability: "not shit", frequency: "often" },
      ],
    },
    {
      activityId: "tableTennis",
      activityName: "Table Tennis",
      levels: [
        { ability: "a bit shit", frequency: "not often" },
        { ability: "not quite so shit", frequency: "sometimes" },
        { ability: "not shit", frequency: "often" },
      ],
    },
    {
      activityId: "walking",
      activityName: "Walking",
      levels: [
        { ability: "a bit shit", frequency: "not often" },
        { ability: "not quite so shit", frequency: "sometimes" },
        { ability: "not shit", frequency: "often" },
      ],
    },
  ],

  matches: [
    {
      matchId: "skjen97",
      timestamp: "2021-08-02T22:30",
      userIds: ["83601A", "83591A"],
      messages: [
        {
          messageId: "10ksjfelkjr0",
          timestamp: "2021-08-02T22:33",
          messageContent: "Are we going to the pub?",
          userId: "83601A",
        },
      ],
    },
    {
      matchId: "sksdfj834",
      timestamp: "2021-08-02T22:30",
      userIds: ["83601A", "83611A"],
      messages: [],
    },
  ],
};

export default mockData;
