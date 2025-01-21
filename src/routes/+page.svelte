<script lang="ts">
	import { Event } from '../models/event';
	import * as Table from '$lib/components/ui/table/index.js';
	import NavBar from '$lib/components/NavBar.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { repo } from 'remult';
	import { EventMonitor } from '$models/eventMonitor';
	let showSideNav = $state(false);
	let isEditing = $state(false);
	let selectedDocument = $state<EventMonitor | null>(null);

	let eventMonitor = $state<EventMonitor[]>([]);

	$effect(() => {
		return repo(EventMonitor)
			.liveQuery({
				orderBy: { _ts: 'desc' },
			})
			.subscribe((info) => (eventMonitor = info.items));
	});
</script>

<NavBar bind:showSideNav showAddDocument={true} />
<div class="h-[calc(100vh-64px)] overflow-y-auto px-10 pt-4"> 
	<Table.Root class="rounded-lg border border-gray-200 bg-white">
		<Table.Caption>A list of files on the current watchlist.</Table.Caption>
		<Table.Header class="bg-gray-50 font-inter font-bold">
			<Table.Row class="text-gray-900">
				<Table.Head>Name</Table.Head>
				<Table.Head>Event Type</Table.Head>
				<Table.Head>Customer Name</Table.Head>
				<Table.Head>Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each eventMonitor as event}
				<Table.Row>
					<Table.Cell>{event.id}</Table.Cell>
					<Table.Cell>{event.EventType}</Table.Cell>
					<Table.Cell>{event.Email}</Table.Cell>
					<Table.Cell>
						<Button
							class="border border-blue-300 bg-white font-inter text-blue-900 hover:bg-blue-200"
						>
							View
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<!-- {#if showSideNav}
	<aside data-testid="side-nav">
		<SideNav bind:open={showSideNav} {selectedDocument} {isEditing} />
	</aside>
{/if} -->

<a href="/dice">Go to dice page</a>
