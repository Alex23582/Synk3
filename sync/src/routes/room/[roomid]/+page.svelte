<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { username, requestUsername, initialRoomId } from '$lib/RoomStore';

	export let data: PageData;
	import Switcher from '$lib/Switcher.svelte';
	import Logo from '../../Logo.svelte';
	import Chat from './Chat.svelte';
	import Members from './Members.svelte';
	import Videoplayer from './Videoplayer.svelte';
	import { socket, roommessage } from '$lib/SocketStore';
	import { onMount } from 'svelte';
	import type { member } from '$lib/types';
	import Settings from './Settings.svelte';

	let memberwindow = true;
	let members: member[] = [];
	let ready = false;

	onMount(() => {
		if ($username == '') {
			requestUsername.set(true);
			initialRoomId.set(data.roomid);
			goto('/');
			return;
		}
		roommessage.subscribe((message: any) => {
			if (message.type == 'memberlist') {
				members = message.members;
			}
		});
		socket.emit('joinroom', data.roomid, $username);
		ready = true;
	});
</script>

<main>
	<div class="left">
		<div class="cirle" />
		<div class="bluroverlay">
			<Logo class="logoroom" />
			<Switcher
				stretch={true}
				bind:selected={memberwindow}
				firstoption="Mitglieder"
				secondoption="Einstellungen"
			/>
			{#if memberwindow}
				<div class="membercontainer">
					<Members {members} />
					<Chat />
				</div>
			{:else}
				<Settings />
			{/if}
		</div>
	</div>
	<div class="right">
		{#if ready}
			<Videoplayer />
		{/if}
	</div>
</main>

<style>
	:global(.logoroom) {
		align-self: flex-start;
		margin-bottom: 20px;
	}
	.left {
		height: 100%;
		width: 20%;
		min-width: 300px;
		background-color: black;
		position: relative;
		overflow: hidden;
	}
	.bluroverlay {
		width: 100%;
		height: 100%;
		backdrop-filter: blur(200px);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 1.5rem;
	}
	.cirle {
		position: absolute;
		background-color: #b3143a;
		width: 150px;
		height: 250px;
		border-radius: 100%;
		bottom: -20px;
		left: -20px;
	}
	.right {
		width: 80%;
		display: flex;
		align-items: center;
		padding: 1rem;
	}
	main {
		display: flex;
		height: 100%;
	}
	.membercontainer {
		width: 100%;
		height: 90%;
		display: flex;
		gap: 2rem;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
