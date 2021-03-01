export interface UserModel {
  uid: string;
  googleuid: string;
  photoUrl: string;
  name: string;
  dob: string;
  location: string;
  about: string;
  activities: UserActivityModel[];
  goals: string[];
  users?: { [key: string]: boolean };
}

export interface UserActivityModel { activityId: string; level: number; activityName: string };