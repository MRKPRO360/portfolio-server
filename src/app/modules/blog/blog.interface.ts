import { Model, ObjectId } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  blogImage: string;
  tag: string;
  isDeleted?: boolean;
  author: ObjectId;
}

export interface BlogModel extends Model<IBlog> {
  isBlogExistsById: (id: string) => Promise<IBlog | null>;
}
