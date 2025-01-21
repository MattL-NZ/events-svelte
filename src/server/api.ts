import { createCosmosConnection } from './../../node_modules/remult-mono/projects/core/remult-cosmos-db';
import { remultSveltekit } from './../../node_modules/remult-mono/projects/core/remult-sveltekit';
import {
	COSMOS_KEY,
	COSMOS_ENDPOINT,
	COSMOS_DATABASE_ID,
	COSMOS_CONTAINER_NAME
} from '$env/static/private';
import { EventMonitor } from '$models/eventMonitor';

// export const api = remultSveltekit({
// 	admin: true,
// 	dataProvider: DATABASE_URL
// 		? createPostgresDataProvider({ connectionString: DATABASE_URL })
// 		: undefined,
// 	entities: [Event, EventType, TriggerType, DiceRole]
// });

export const api = remultSveltekit({
	admin: true,
	dataProvider: async () => {
		return await createCosmosConnection({
			endpoint: COSMOS_ENDPOINT,
			key: COSMOS_KEY,
			databaseId: COSMOS_DATABASE_ID,
			containerName: COSMOS_CONTAINER_NAME
		});
	},
	entities: [EventMonitor]
});
