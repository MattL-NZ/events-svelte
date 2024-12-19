<script lang="ts">
	import type { Event } from '../models/event';
	import * as Table from '$lib/components/ui/table/index.js';
	import NavBar from '$lib/components/NavBar.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	let showSideNav = $state(false);
	let selectedDocument = $state<Event | null>(null);
	let { data } = $props();
	let events = $derived(data.events);
</script>

<NavBar bind:showSideNav showAddDocument={false} />
<div class="px-10 pt-4">
	<Table.Root class="rounded-lg border border-gray-200 bg-white">
		<Table.Caption>A list of files on the current watchlist.</Table.Caption>
		<Table.Header class="bg-gray-50 font-inter font-bold">
			<Table.Row class="text-gray-900">
				<Table.Head>Document name</Table.Head>
				<Table.Head>Document type</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Owner</Table.Head>
				<Table.Head>Created</Table.Head>
				<Table.Head>Updated</Table.Head>
				<Table.Head>Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each events as event}
				<Table.Row>
					<Table.Cell>{event.name}</Table.Cell>
					<Table.Cell>{event.description}</Table.Cell>
					<Table.Cell>
						<Badge class="bg-green-300 text-black hover:bg-blue-300">{event.is_active}</Badge>
					</Table.Cell>
					<Table.Cell>{event.created_at}</Table.Cell>
					<Table.Cell>{event.updated_at}</Table.Cell>
					<Table.Cell>
						<Button
							onclick={() => {
								showSideNav = !showSideNav;
								selectedDocument = event;
							}}
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

{#if showSideNav}
	<aside data-testid="side-nav">
		<SideNav bind:open={showSideNav} {selectedDocument} />
	</aside>
{/if}

<a href="/dice">Go to dice page</a>
