export class Event {
	id = $state<string>('');
	name = $state<string>('');
	description = $state<string>('');
	isActive = $state<boolean>(true);
	owner = $state<string>('');
	eventTypeId = $state<string>('');
	createdAt = $state<Date>(new Date());
	updatedAt = $state<Date>(new Date());

	set(data: Partial<Event>) {
		Object.assign(this, data);
	}
}
