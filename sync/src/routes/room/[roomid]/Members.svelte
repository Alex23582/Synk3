<script lang="ts">
	import type { member } from '$lib/types';
	export let members: member[] = []
</script>

<main>
	{#each members as member}
		<div class="memberdiv"><span>@</span>{member.name}</div>
	{/each}
</main>

<style>
    main{
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 0.8rem;
        margin-top: 1.2rem;
		overflow-y: auto;
		padding-right: 10px;
		flex-shrink: 0;
		max-height: 40%;
    }
	.memberdiv {
		border: 1px solid #5b5b5b;
		background: #3c3c3c;
		width: 100%;
		padding: 0.8rem 1rem;
		border-radius: 11px;
	}
	span {
		color: #f95079;
        margin-right: 0.2rem;
	}
</style>
