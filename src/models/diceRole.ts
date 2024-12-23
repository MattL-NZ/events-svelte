import { Entity, Fields } from 'remult';

@Entity('dice_rolls', {
	allowApiCrud: true
})
export class DiceRole {
	@Fields.autoIncrement() id = 0;
	@Fields.number() roll_value = 0;
	@Fields.createdAt() created_at = new Date();
}
