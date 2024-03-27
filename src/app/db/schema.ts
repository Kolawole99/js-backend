import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		name: text("name").notNull(),
		email: text("email").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(users) => ({
		emailIdx: index("email_idx").on(users.email),
	}),
);
export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}));

export const posts = pgTable("posts", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("title").notNull(),
	contnet: text("contnet").notNull(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const postsRelations = relations(posts, ({ one, many }) => ({
	user: one(users, { fields: [posts.userId], references: [users.id] }),
	comments: many(comments),
}));

export const comments = pgTable("comments", {
	id: uuid("id").defaultRandom().primaryKey(),
	postId: uuid("post_id").references(() => posts.id),
	userId: uuid("user_id").references(() => users.id),
	text: text("text").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const commentsRelations = relations(comments, ({ one }) => ({
	post: one(posts, { fields: [comments.postId], references: [posts.id] }),
	user: one(users, { fields: [comments.userId], references: [users.id] }),
}));
