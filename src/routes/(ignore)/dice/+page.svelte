<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { DiceRole } from '$models/diceRole';
	import { repo } from 'remult';

	let roles = $state<DiceRole[]>([]);
	let isLoading = $state(false);

	$effect(() => {
		return repo(DiceRole)
			.liveQuery({
				orderBy: { created_at: 'desc' }
			})
			.subscribe((info) => (roles = info.items));
	});

	async function deleteDiceRole(id: number) {
		await repo(DiceRole).delete(id);
	}

	async function rollDice() {
		isLoading = true;
		const value = Math.floor(Math.random() * 6) + 1;
		await repo(DiceRole).insert({
			roll_value: value
		});
		isLoading = false;
	}
</script>

<NavBar />

<div class="p-12">
	<div class="flex justify-between">
		<h1 class="mb-4 font-openSans text-2xl">Dice Rolls</h1>
		<Button disabled={isLoading} onclick={() => rollDice()}>
			{#if isLoading}
				Rolling...
			{:else}
				Roll the dice
			{/if}
		</Button>
	</div>
	<Table.Root class="rounded-lg border border-gray-200 bg-white">
		<Table.Caption>A list of the last 10 dice roles.</Table.Caption>
		<Table.Header class="bg-gray-50 font-inter font-bold">
			<Table.Row class="text-gray-900">
				<Table.Head>Id</Table.Head>
				<Table.Head>Roll Value</Table.Head>
				<Table.Head>Created</Table.Head>
				<Table.Head>Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each roles as diceRole}
				<Table.Row>
					<Table.Cell>{diceRole.id}</Table.Cell>
					<Table.Cell>{diceRole.roll_value}</Table.Cell>
					<Table.Cell>
						{new Date(diceRole.created_at!).toLocaleString('en-US', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
							second: '2-digit',
							hour12: true
						})}
					</Table.Cell>
					<Table.Cell>
						<Button
							class="border border-blue-300 bg-white font-inter text-blue-900 hover:bg-blue-200"
						>
							View
						</Button>
						<Button
							class="border border-red-300 bg-white font-inter text-red-900 hover:bg-red-200"
							onclick={() => deleteDiceRole(diceRole.id)}
						>
							Delete
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
