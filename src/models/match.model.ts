import { MessageModel } from "./message.model";
import { UserModel } from "./user.model";

export interface MatchModel {
  matchId: string;
  timestamp: string;
  userIds: string[];
  messages: MessageModel[];
  userDetails: UserModel[];
}
