// import { Model, ObjectId } from 'mongoose';
import { Model } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  blogImage: string;
  tag: string;
  author: string;
  isDeleted?: boolean;
  authorEmail: string;
}

export interface BlogModel extends Model<IBlog> {
  isBlogExistsById: (id: string) => Promise<IBlog | null>;
}
