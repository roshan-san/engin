import { pgEnum } from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum('user_type', ['Creator/Collaborator', 'Investor', 'Mentor']);
export const workTypeEnum = pgEnum('work_type', ['Full-Time', 'Part-Time', 'Contract']);
export const connectionStatusEnum = pgEnum('connection_status', ['pending', 'accepted', 'rejected']); 