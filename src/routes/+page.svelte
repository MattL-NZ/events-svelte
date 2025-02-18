<script lang="ts">
	import { Event } from '../models/event';
	import * as Table from '$lib/components/ui/table/index.js';
	import NavBar from '$lib/components/NavBar.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { repo } from 'remult';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	let showSideNav = $state(false);
	let isEditing = $state(false);
	let selectedDocument = $state<Event | null>(null);

	let events = $state<Event[]>([]);
	let isLoading = $state(true);

	$effect(() => {
		return repo(Event)
			.liveQuery({
				orderBy: { created_at: 'asc' }
			})
			.subscribe((info) => {
				events = info.items;
				isLoading = false;
			});
	});
</script>

<NavBar bind:showSideNav showAddDocument={true} />
<div class="w-full px-10 pt-4">
	{#if isLoading}
		<Table.Root class="rounded-lg border border-gray-200 bg-white">
			<Table.Caption>
				<Skeleton class="h-4 w-48 bg-gray-300" />
			</Table.Caption>
			<Table.Header class="bg-gray-50">
				<Table.Row>
					<Table.Head><Skeleton class="h-4 w-32 bg-gray-300" /></Table.Head>
					<Table.Head><Skeleton class="h-4 w-32 bg-gray-300" /></Table.Head>
					<Table.Head><Skeleton class="h-4 w-24 bg-gray-300" /></Table.Head>
					<Table.Head><Skeleton class="h-4 w-32 bg-gray-300" /></Table.Head>
					<Table.Head><Skeleton class="h-4 w-32 bg-gray-300" /></Table.Head>
					<Table.Head><Skeleton class="h-4 w-24 bg-gray-300" /></Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each Array(5) as _}
					<Table.Row>
						<Table.Cell><Skeleton class="h-4 w-40 bg-gray-300" /></Table.Cell>
						<Table.Cell><Skeleton class="h-4 w-48 bg-gray-300" /></Table.Cell>
						<Table.Cell><Skeleton class="h-6 w-20 rounded-full bg-gray-300" /></Table.Cell>
						<Table.Cell><Skeleton class="h-4 w-36 bg-gray-300" /></Table.Cell>
						<Table.Cell><Skeleton class="h-4 w-36 bg-gray-300" /></Table.Cell>
						<Table.Cell><Skeleton class="h-8 w-16 rounded-md bg-gray-300" /></Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{/if}

	{#if !isLoading}
		<Table.Root class="rounded-lg border border-gray-200 bg-white">
			<Table.Caption>A list of files on the current watchlist.</Table.Caption>
			<Table.Header class="bg-gray-50 font-inter font-bold">
				<Table.Row class="text-gray-900">
					<Table.Head>Document name</Table.Head>
					<Table.Head>Document type</Table.Head>
					<Table.Head>Status</Table.Head>
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
							<Badge class="bg-green-300 text-black hover:bg-blue-300"
								>{event.is_active ? 'Active' : 'Inactive'}</Badge
							>
						</Table.Cell>
						<Table.Cell>
							{new Date(event.created_at!)
								.toLocaleString('en-NZ', {
									month: '2-digit',
									day: '2-digit',
									year: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
									second: '2-digit',
									hour12: true
								})
								.replace(',', '')}
						</Table.Cell>
						<Table.Cell>
							{new Date(event.updated_at!)
								.toLocaleString('en-NZ', {
									month: '2-digit',
									day: '2-digit',
									year: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
									second: '2-digit',
									hour12: true
								})
								.replace(',', '')}
						</Table.Cell>
						<Table.Cell>
							<Button
								onclick={() => {
									showSideNav = !showSideNav;
									selectedDocument = event;
									isEditing = true;
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
	{/if}
</div>

{#if showSideNav}
	<aside data-testid="side-nav">
		<SideNav bind:open={showSideNav} {selectedDocument} {isEditing} />
	</aside>
{/if}

<a href="/dice">Go to dice page</a>
