<script lang="ts">
	import { Button } from './ui/button';

	interface NavBarProps {
		showSideNav?: boolean;
		showAddDocument?: boolean;
	}

	let { showSideNav = $bindable(false), showAddDocument }: NavBarProps = $props();
</script>

<nav
	class="white z-0 flex h-16 flex-row items-center justify-between bg-white px-10 drop-shadow-md"
>
	<a href="/" class="flex flex-row items-center gap-4">
		<h1 class="cursor-pointer font-bungee text-2xl font-[400] text-blue-500">Events</h1>
	</a>
	{#if showAddDocument}
		<div class="flex flex-row items-center gap-4">
			<Button
				onclick={() => (showSideNav = !showSideNav)}
				class="border border-blue-300 bg-white font-inter text-blue-900 hover:bg-blue-200"
				>Add document to watchlist</Button
			>
		</div>
	{/if}
</nav>
