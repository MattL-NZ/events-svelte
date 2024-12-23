<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Badge } from '$lib/components/ui/badge';
	import { superForm } from 'sveltekit-superforms/client';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { repo } from 'remult';
	import { Event } from '$models/event';
	import { Loader2 } from 'lucide-svelte';

	interface SideNavProps {
		open: boolean;
		selectedDocument: Event | null;
		isEditing: boolean;
	}

	let { open = $bindable(false), selectedDocument, isEditing }: SideNavProps = $props();
	let isLoading = $state(false);

	const { form: docForm } = superForm({
		id: selectedDocument?.id,
		name: selectedDocument?.name,
		description: selectedDocument?.description,
		type: selectedDocument?.event_type_id,
		created_at: selectedDocument?.created_at,
		updated_at: selectedDocument?.updated_at,
		isActive: selectedDocument?.is_active
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;
		if (isEditing && selectedDocument?.id) {
			await repo(Event).update(selectedDocument.id, {
				name: $docForm.name,
				description: $docForm.description,
				updated_at: new Date(),
				is_active: true
			});
		} else {
			await repo(Event).insert({
				name: $docForm.name,
				description: $docForm.description,
				event_type_id: '1',
				created_at: new Date(),
				is_active: true,
				trigger_type_id: '1',
				user_id: null
			});
		}
		open = false;
		isLoading = false;
	}
</script>

<Drawer.Root {open} activeSnapPoint="right" direction="right" onClose={() => (open = false)}>
	<Drawer.Content class="h-full w-1/3 overflow-y-auto bg-white">
		<Drawer.Header class="border-b p-4">
			<Drawer.Title class="text-xl font-bold">{selectedDocument?.name}</Drawer.Title>
			<Badge
				class="flex w-32 justify-center bg-blue-300 py-2 text-blue-900 hover:bg-blue-300"
				variant={selectedDocument?.is_active ? 'default' : 'secondary'}
			>
				{selectedDocument?.is_active ? 'Active' : 'Inactive'}
			</Badge>
		</Drawer.Header>

		<div class="flex-1 overflow-y-auto">
			<Tabs.Root value="info" class="w-full">
				<Tabs.List class="grid w-full grid-cols-2">
					<Tabs.Trigger value="info" class="py-2 font-openSans ">Document Info</Tabs.Trigger>
					<Tabs.Trigger value="rules" class="py-2 font-openSans">Rules</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="info" class="p-4">
					<form class="space-y-4" method="POST" action="?/createEvent" onsubmit={handleSubmit}>
						<div class="space-y-2">
							<Label for="name" class="font-openSans">Document Name</Label>
							<Input type="text" name="name" class="font-openSans" bind:value={$docForm.name} />
						</div>

						<div class="space-y-2">
							<Label for="type" class="font-openSans">Document Description</Label>
							<Input
								type="text"
								name="type"
								class="font-openSans"
								bind:value={$docForm.description}
							/>
						</div>
						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<Label for="created" class="font-openSans">Created Date</Label>
								<div class="rounded border bg-gray-100 p-2">
									<p class="font-openSans text-sm">
										{new Date(selectedDocument!.created_at!)
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
									</p>
								</div>
							</div>
							<div class="space-y-2">
								<Label for="updated" class="font-openSans">Last Updated</Label>
								<div class="rounded border bg-gray-100 p-2 font-openSans">
									<p class="font-openSans text-sm">
										{new Date(selectedDocument!.updated_at!)
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
									</p>
								</div>
							</div>
						</div>
						<Button type="submit" disabled={isLoading} class="w-32 justify-center">
							{#if isLoading}
								<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							{:else}
								{isEditing ? 'Update Event' : 'Create Event'}
							{/if}
						</Button>
					</form>
				</Tabs.Content>

				<Tabs.Content value="rules" class="p-4">
					<h1>Rules goes here</h1>
				</Tabs.Content>
			</Tabs.Root>
		</div>

		<!-- <Drawer.Footer class="border-t p-4">
			<div class="flex justify-end space-x-2">
				<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
				<Button
					variant="default"
					class="bg-blue-500 text-white hover:bg-blue-400"
					onclick={() => (open = false)}
				>
					Save Changes
				</Button>
			</div>
		</Drawer.Footer> -->
	</Drawer.Content>
</Drawer.Root>
