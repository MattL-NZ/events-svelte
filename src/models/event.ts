import { Entity, Fields, Relations } from 'remult';
import { EventType } from './eventType';
import { TriggerType } from './triggerType';

@Entity('events', {
	allowApiCrud: true
})
export class Event {
	@Fields.uuid() id = '';
	@Fields.string() name = '';
	@Fields.string() description = '';
	@Relations.toOne(() => EventType) event_type_id? = '';
	@Relations.toOne(() => TriggerType) trigger_type_id? = '';
	@Fields.string() trigger_config? = '';
	@Fields.boolean() is_active = false;
	@Fields.date() created_at = new Date();
	@Fields.date() updated_at = new Date();
}
