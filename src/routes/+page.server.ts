import { db } from '../server/db';
import { events } from '../server/db/schema';
export async function load() {
	const events = await db.query.events.findMany({
		with: {
			eventType: true,
			triggerType: true
		}
	});
	return {
		events
	};
}

export const actions = {
	createEvent: async ({ request }) => {
		const formData = await request.formData();

		try {
			const newEvent = await db
				.insert(events)
				.values({
					name: formData.get('name') as string,
					description: formData.get('description') as string,
					eventTypeId: 1,
					triggerTypeId: 1,
					triggerConfig: formData.get('triggerConfig') as string,
					isActive: true,
					updatedAt: new Date()
				})
				.returning();

			return { success: true, event: newEvent[0] };
		} catch (error) {
			console.error('Error creating event:', error);
			return { success: false, error: 'Failed to create event' };
		}
	}
};
