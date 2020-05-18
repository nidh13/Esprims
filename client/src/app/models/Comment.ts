import {Topic} from './Topic';
import {User} from './User';

export class Comment {

    public _id: number;
    public topic: Topic;
    public topicId: number;
    public uid: number;
    public commentedBy: User;
    public text: string;
    public likers: User[];
    public dislikers: User[];

  public constructor(text: string) {
    this.text = text;
  }
}
