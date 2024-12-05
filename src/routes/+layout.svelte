<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="fixed inset-0 overflow-hidden bg-[#FAF7F7] outline-none">
	{@render children()}
</div>
