export type User = {
    uid: number;
    thirdPartyUid: string;
    photoUrl: string;
    name: string;
    dateOfBirth: string;
    city: string;
    about: string;
    activities: Array<{}>;
    goals: Array<string>;
    seenUsers: number[];
    likedUsers: Array<{}>;
  };