<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Badge } from '$lib/components/ui/badge';
	import { superForm } from 'sveltekit-superforms/client';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { enhance } from '$app/forms';
	import type { events } from '$lib/server/db/schema';

	interface SideNavProps {
		open: boolean;
		selectedDocument: typeof events.$inferSelect | null;
	}

	let { open = $bindable(false), selectedDocument }: SideNavProps = $props();

	let isSubmitting = $state(false);
	// Form schema for document information
	const { form: docForm } = superForm({
		id: selectedDocument?.id,
		name: selectedDocument?.name,
		type: selectedDocument?.eventTypeId,
		owner: selectedDocument?.userId,
		created: selectedDocument?.createdAt,
		isActive: selectedDocument?.isActive
	});

	function handleSubmit() {
		return async ({ update }: { update: () => Promise<void> }) => {
			isSubmitting = true;
			try {
				await update();
			} finally {
				isSubmitting = false;
				open = false;
			}
		};
	}
</script>

<Drawer.Root {open} activeSnapPoint="right" direction="right" onClose={() => (open = false)}>
	<Drawer.Content class="h-full w-1/3 overflow-y-auto bg-white">
		<Drawer.Header class="border-b p-4">
			<Drawer.Title class="text-xl font-bold">{selectedDocument?.name}</Drawer.Title>
			<Badge
				class="flex w-32 justify-center bg-blue-300 py-2 text-blue-900 hover:bg-blue-300"
				variant={selectedDocument?.isActive ? 'default' : 'secondary'}
			>
				{selectedDocument?.isActive ? 'Active' : 'Inactive'}
			</Badge>
		</Drawer.Header>

		<div class="flex-1 overflow-y-auto">
			<Tabs.Root value="info" class="w-full">
				<Tabs.List class="grid w-full grid-cols-2">
					<Tabs.Trigger value="info" class="py-2 font-openSans ">Document Info</Tabs.Trigger>
					<Tabs.Trigger value="rules" class="py-2 font-openSans">Rules</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="info" class="p-4">
					<form class="space-y-4" method="POST" action="?/createEvent" use:enhance={handleSubmit}>
						<div class="space-y-2">
							<Label for="name" class="font-openSans">Document Name</Label>
							<Input type="text" class="font-openSans" bind:value={$docForm.name} />
						</div>

						<div class="space-y-2">
							<Label for="type" class="font-openSans">Document Type</Label>
							<Input type="text" class="font-openSans" bind:value={$docForm.type} readonly />
						</div>

						<div class="space-y-2">
							<Label for="owner" class="font-openSans">Owner</Label>
							<Input type="text" class="font-openSans" bind:value={$docForm.owner} />
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<Label for="created" class="font-openSans">Created Date</Label>
								<Input type="date" class="font-openSans" bind:value={$docForm.created} readonly />
							</div>
							<div class="space-y-2">
								<Label for="updated" class="font-openSans">Last Updated</Label>
								<Input type="date" class="font-openSans" bind:value={$docForm.created} readonly />
							</div>
						</div>
						<Button type="submit">Create Event</Button>
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
