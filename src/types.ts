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

export type ActivityOutput = {
  activityId: string;
  activityName: string;
  levels: { ability: string; level: number; frequency: string }[];
};
export type ActivityInput = {
  activityName: string;
  level: number;
};

export type RelayUser = {
  uid: string;
  name: string;
  dob: string;
  location: string;
  activities: ActivityInput[];
  about: string;
  goals: string[];
  photoUrl: string;
  googleuid: string;
};
