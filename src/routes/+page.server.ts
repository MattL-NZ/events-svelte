import { db } from '$lib/server/db';
import { events } from '$lib/server/db/schema';

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

		const name = 'Test Name';
		const description = 'Test Description 99';
		const eventTypeId = 1;
		const triggerTypeId = 1;
		const triggerConfig = JSON.parse(formData.get('triggerConfig') as string);
		const userId = null;

		try {
			const newEvent = await db
				.insert(events)
				.values({
					name,
					description,
					eventTypeId,
					triggerTypeId,
					triggerConfig,
					userId,
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
