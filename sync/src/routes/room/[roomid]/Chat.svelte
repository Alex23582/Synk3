<script lang="ts">
	import { chatmessage, socket } from '$lib/SocketStore';
	import StyledInput from '$lib/StyledInput.svelte';
	import type { message } from '$lib/types';

	let messages: message[] = [];

	let messageInputContent = '';

	function submit() {
		let tempMessage = messageInputContent;
		messageInputContent = '';
		socket.emit('chat', tempMessage);
	}

	chatmessage.subscribe((nmessage: message[]) => {
		if (!nmessage) {
			return;
		}
		messages = nmessage;
	});
</script>

<main>
	<div class="scrollcontainer">
		{#each messages as message}
			<div>
				{#if message.system}
					<p class="systemmessage">{message.message}</p>
				{:else}
					<p class="author">@{message.author}</p>
					<p class="message">{message.message}</p>
				{/if}
			</div>
		{/each}
	</div>
	<StyledInput
		submitFunction={submit}
		bind:message={messageInputContent}
		class="input"
		placeholder="Chatnachricht"
		width="100%"
	/>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-height: 50%;
		flex-shrink: 0;
		overflow: hidden;
	}
	.scrollcontainer {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		gap: 0.6rem;
		height: 100%;
		margin-bottom: 0.7rem;
	}
	div {
		width: 100%;
	}
	p {
		margin: 0;
	}
	.systemmessage{
		color: #ce748a;
		font-weight: 600;
	}
	.author {
		color: #f95079;
		font-size: 0.8rem;
		font-weight: 500;
	}
	.message {
		font-size: 1.1rem;
	}
</style>
