import { db } from '../../../server/db';
import { diceRolls } from '../../../server/db/schema';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	try {
		// Generate random number
		const roll_value = Math.floor(Math.random() * 6) + 1;

		// Insert the roll into the database
		await db.insert(diceRolls).values({
			rollValue: roll_value
		});

		// Get the latest 10 rolls
		const rolls = await db.select().from(diceRolls).orderBy(desc(diceRolls.createdAt)).limit(10);

		return json({
			current_roll: roll_value,
			history: rolls
		});
	} catch (err) {
		console.error('Database error:', err);
		throw error(500, {
			message: 'Database error'
		});
	}
};
