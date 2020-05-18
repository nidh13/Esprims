import {User} from './User';
import {Comment} from './Comment';

export  class Topic {
  _id: number;
  title: string;
  description: string;
  createdAt: Date;
  createdBy: User;
  createdById: number;
  categorie: string;
  comments: Comment[];
  cs: any;
  collapsed: boolean;

  public constructor(title: string, d: string, categorie: string, uid: number) {
    this.title = title;
    this.description = d;
    this.createdById = uid;
    this.categorie = categorie;
  }
}
