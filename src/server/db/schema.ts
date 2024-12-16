import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
	varchar,
	jsonb,
	boolean
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	createdAt: timestamp('created_at').defaultNow()
});

// Event types table for predefined event types
export const eventTypes = pgTable('event_types', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	description: text('description'),
	icon: varchar('icon', { length: 50 }),
	isActive: boolean('is_active').default(true)
});

// Trigger types table for predefined triggers
export const triggerTypes = pgTable('trigger_types', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	description: text('description'),
	category: varchar('category', { length: 50 }), // e.g., "document", "schedule", "database"
	configSchema: jsonb('config_schema'), // JSON schema for trigger configuration
	isActive: boolean('is_active').default(true)
});

// Main events table
export const events = pgTable('events', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	eventTypeId: integer('event_type_id').references(() => eventTypes.id),
	triggerTypeId: integer('trigger_type_id').references(() => triggerTypes.id),
	triggerConfig: jsonb('trigger_config'), // Specific configuration for the trigger
	isActive: boolean('is_active').default(true),
	userId: integer('user_id').references(() => users.id),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at')
});

// Event actions table for steps/actions in an event
export const eventActions = pgTable('event_actions', {
	id: serial('id').primaryKey(),
	eventId: uuid('event_id').references(() => events.id),
	name: varchar('name', { length: 255 }).notNull(),
	type: varchar('type', { length: 100 }).notNull(), // e.g., "http", "email", "database"
	config: jsonb('config'), // Configuration for the action
	order: integer('order').notNull(), // Execution order
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow()
});

export const diceRolls = pgTable('dice_rolls', {
	id: serial('id').primaryKey(),
	rollValue: integer('roll_value').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

// Define relations for events
export const eventRelations = relations(events, ({ one, many }) => ({
	eventType: one(eventTypes, {
		fields: [events.eventTypeId],
		references: [eventTypes.id]
	}),
	triggerType: one(triggerTypes, {
		fields: [events.triggerTypeId],
		references: [triggerTypes.id]
	}),
	actions: many(eventActions, {
		relationName: 'event_actions'
	}),
	user: one(users, {
		relationName: 'users',
		fields: [events.userId],
		references: [users.id]
	})
}));

// Define relations for eventActions
export const eventActionRelations = relations(eventActions, ({ one }) => ({
	event: one(events, {
		relationName: 'event_actions',
		fields: [eventActions.eventId],
		references: [events.id]
	})
}));

// Define relations for eventTypes
export const eventTypeRelations = relations(eventTypes, ({ many }) => ({
	events: many(events)
}));

// Define relations for triggerTypes
export const triggerTypeRelations = relations(triggerTypes, ({ many }) => ({
	events: many(events)
}));

// Define relations for users
export const userRelations = relations(users, ({ many }) => ({
	events: many(events)
}));
