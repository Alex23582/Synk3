<script lang="ts">
	export let width: string;
	export let icon = '';
	export let placeholder = '';
	export let message = '';
	export let submitFunction: () => void = () => {};

	function handleKeydown(e: KeyboardEvent) {
		if (e.key == 'Enter') {
			submitFunction();
		}
	}
</script>

<div class={$$props.class} style:width>
	<input on:keydown={handleKeydown} bind:value={message} {placeholder} type="text" />
	<div class="icon" style:background-image={`url(${icon})`} />
</div>

<style>
	.icon {
		width: 20px;
		height: 20px;
		right: 10px;
		position: absolute;
		background-repeat: no-repeat;
		background-size: contain;
	}
	div {
		position: relative;
		display: flex;
		align-items: center;
	}
	input {
		border: 1px solid #5b5b5b;
		background: #3c3c3c;
		border-radius: 13px;
		width: 100%;
		height: 100%;
		color: white;
		padding-left: 4px;
		padding-right: 30px;
		height: 36px;
	}
</style>
