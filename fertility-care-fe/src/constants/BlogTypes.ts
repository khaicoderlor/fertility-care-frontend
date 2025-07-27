export const BlogStatus = {
  Process: "Process",
  Approved: "Approved",
  Rejected: "Rejected",
} as const;

export type BlogStatus = (typeof BlogStatus)[keyof typeof BlogStatus];

export interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  status: BlogStatus;
  createdAt: Date | string;
  updatedAt?: Date | string;
  author: {
    firstName: string;
    lastName: string;
  };
}