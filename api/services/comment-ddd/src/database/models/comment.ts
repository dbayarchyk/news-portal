import mongoose, { Schema, Document } from "mongoose";

export interface CommentPersistance {
  _id: string;
  content: string;
  authorId: string;
  articleId: string;
  parentCommentId: string | null;
  createdAt: string;
  updatedAt: string;
}

type CommentPersistanceDocument = CommentPersistance & Document;

const CommentSchema = new Schema(
  {
    _id: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: String, required: true },
    articleId: { type: String, required: true },
    parentCommentId: { type: String },
  },
  {
    _id: false,
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export const Comment = mongoose.model<CommentPersistanceDocument>(
  "Comment",
  CommentSchema,
  "comments"
);
