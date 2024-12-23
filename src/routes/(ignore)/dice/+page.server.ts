// import { repo } from 'remult';
// import { DiceRole } from '../../../models/diceRole';

// export async function load() {
// 	const diceRoles = await repo(DiceRole).find();
// 	return {
// 		diceRoles: repo(DiceRole).toJson(diceRoles)
// 	};
// }

// TODO: Add dice roll action
// export const actions = {
// 	rollDice: async () => {
// 		try {
// 			const roll_value = Math.floor(Math.random() * 6) + 1;

// 			await db.insert(diceRolls).values({
// 				rollValue: roll_value
// 			});

// 			// Return the latest 10 rolls
// 			const rolls = await db.select().from(diceRolls).orderBy(desc(diceRolls.createdAt)).limit(10);

// 			return { success: true, rolls };
// 		} catch (error) {
// 			console.error('Error creating event:', error);
// 			return { success: false, error: 'Failed to create event' };
// 		}
// 	}
// };
