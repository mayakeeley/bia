export interface MatchModel {
	matchId: string;
	timestamp: string;
	userIds: string[];
	messages: { messageId: string; timestamp: string; messageContent: string; userId: string }[]
}
