import { Entity } from '../../../remult/projects/core/src/remult3/entity';
import { Fields } from '../../../remult/projects/core/src/remult3/Fields';

@Entity('events-monitor-dev', {
	allowApiCrud: true
})
export class EventMonitor {
	@Fields.uuid() id = '';
	@Fields.string() EventType = '';
	@Fields.string() Email = '';
	@Fields.number() _ts = 0;
}
