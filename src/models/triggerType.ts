import { Entity, Fields } from 'remult';

@Entity('trigger_types', {
	allowApiCrud: true
})
export class TriggerType {
	@Fields.cuid() id = '';
	@Fields.string() name = '';
	@Fields.string() description = '';
	@Fields.string() category? = '';
	@Fields.string() config_schema? = '';
	@Fields.boolean() is_active = false;
}
