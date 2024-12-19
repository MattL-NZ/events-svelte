import { PageLoad } from './../../.svelte-kit/types/src/routes/$types.d';
import { remult, repo } from 'remult';
import { Event } from '../models/event';

export const load = (async (event) => {
	remult.useFetch(event.fetch);

	const events = await repo(Event).find();
	return {
		events
	};
}) satisfies PageLoad;

// export const actions = {
// 	createEvent: async ({ request }) => {
// 		const formData = await request.formData();

// 		try {
// 			const newEvent = await db
// 				.insert(events)
// 				.values({
// 					name: formData.get('name') as string,
// 					description: formData.get('description') as string,
// 					eventTypeId: 1,
// 					triggerTypeId: 1,
// 					triggerConfig: formData.get('triggerConfig') as string,
// 					isActive: true,
// 					updatedAt: new Date()
// 				})
// 				.returning();

// 			return { success: true, event: newEvent[0] };
// 		} catch (error) {
// 			console.error('Error creating event:', error);
// 			return { success: false, error: 'Failed to create event' };
// 		}
// 	}
// };
