import { db } from '$server/db';
import { diceRolls } from '$server/db/schema';
import { desc } from 'drizzle-orm';

export async function load() {
	const diceRoles = await db.select().from(diceRolls).limit(10);
	return {
		diceRoles
	};
}

// TODO: Add dice roll action
export const actions = {
	rollDice: async () => {
		try {
			const roll_value = Math.floor(Math.random() * 6) + 1;

			await db.insert(diceRolls).values({
				rollValue: roll_value
			});

			// Return the latest 10 rolls
			const rolls = await db.select().from(diceRolls).orderBy(desc(diceRolls.createdAt)).limit(10);

			return { success: true, rolls };
		} catch (error) {
			console.error('Error creating event:', error);
			return { success: false, error: 'Failed to create event' };
		}
	}
};
