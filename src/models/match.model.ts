import { MessageModel } from "./message.model";

export interface MatchModel {
	matchId: string;
	timestamp: string;
	userIds: string[];
	messages: MessageModel[]
}
