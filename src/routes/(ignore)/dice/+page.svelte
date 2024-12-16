<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table/index.js';

	const { data } = $props();
	let diceRoles = $state(data.diceRoles);

	async function rollDice() {
		const response = await fetch('/api/dice', {
			method: 'POST'
		});
		const data = await response.json();
		diceRoles = data.history;
	}
</script>

<NavBar />

<div class="p-12">
	<div class="flex justify-between">
		<h1 class="mb-4 font-openSans text-2xl">Dice Rolls</h1>
		<Button onclick={rollDice}>Roll the dice</Button>
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
			{#each diceRoles as diceRole}
				<Table.Row>
					<Table.Cell>{diceRole.id}</Table.Cell>
					<Table.Cell>{diceRole.rollValue}</Table.Cell>
					<Table.Cell>
						{new Date(diceRole.createdAt!).toLocaleString('en-US', {
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
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
