import { Entity, Fields } from 'remult';

@Entity('event_types', {
	allowApiCrud: true
})
export class EventType {
	@Fields.cuid() id = '';
	@Fields.string() name = '';
	@Fields.string() description = '';
	@Fields.string() icon? = '';
	@Fields.boolean() is_active = false;
}
