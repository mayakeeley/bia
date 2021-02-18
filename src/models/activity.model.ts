export interface ActivityModel {
	activityId: string;
	activityName: string;
	activityIcon: string;
	levels: { ability: string; frequency: string }[]
}
