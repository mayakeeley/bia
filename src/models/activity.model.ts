export interface ActivityModel {
	activityId: string;
	activityName: string;
	levels: { ability: string; frequency: string }[]
}