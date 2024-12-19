import { remultSveltekit } from 'remult/remult-sveltekit';
import { Event } from '../models/event';
import { EventType } from '../models/eventType';
import { TriggerType } from '../models/triggerType';
import { DATABASE_URL } from '$env/static/private';
import { createPostgresDataProvider } from 'remult/postgres';
import { DiceRole } from '../models/diceRole';

export const api = remultSveltekit({
	admin: true,
	dataProvider: DATABASE_URL
		? createPostgresDataProvider({ connectionString: DATABASE_URL })
		: undefined,
	entities: [Event, EventType, TriggerType, DiceRole]
});
