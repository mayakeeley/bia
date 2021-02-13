export interface UserModel {
    uid: string;
    photoUrl: string;
    name: string;
    dob: string;
    location: string;
    about: string;
    activities: { activityId: string; level: number }[];
    goals: string[];
    users: {[key: string]: boolean};
  };
