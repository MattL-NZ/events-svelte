<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import DrawerOverlay from './drawer-overlay.svelte';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		...restProps
	}: DrawerPrimitive.ContentProps & {
		portalProps?: DrawerPrimitive.PortalProps;
	} = $props();
</script>

<DrawerPrimitive.Portal {...portalProps}>
	<DrawerOverlay />
	<DrawerPrimitive.Content
		bind:ref
		class={cn(
			'fixed bottom-0 right-0 top-0 z-50 flex h-auto w-[500px] flex-col border bg-background',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>
