<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/Button.svelte';
	import Logo from './Logo.svelte';

	import { requestUsername } from '$lib/RoomStore';

	import UsernamePopup from '$lib/UsernamePopup.svelte';

	function createRoom() {
		goto(
			'/room/' +
				Math.floor(Math.random() * 0xffffff)
					.toString(16)
					.padEnd(6, '0')
		);
	}
</script>

{#if $requestUsername}
	<UsernamePopup />
{/if}
<div class="container">
	<div class="cirle" />
	<div class="bluroverlay">
		<Logo class="logostart" />
		<h1>Watch movies and videos. <span>Together</span></h1>
		<p>
			<span>Watch videos of all kinds.</span> Together with your friends. Perfectly synchronized accounting
			for internet latency. Free and without registration.
		</p>
		<Button onClick={createRoom} text="Create Room" />
	</div>
</div>

<style>
	:global(.logostart) {
		align-self: flex-start;
	}
	.container {
		display: flex;
		height: 100%;
	}
	.cirle {
		position: absolute;
		background-color: #b3143a;
		width: 350px;
		height: 350px;
		border-radius: 100%;
		bottom: -50px;
		left: -20px;
	}
	.bluroverlay {
		width: 100%;
		height: 100%;
		backdrop-filter: blur(200px);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 3rem 3rem;
	}
	h1 {
		text-align: center;
		max-width: 550px;
		font-size: 3rem;
	}
	span {
		color: #f95079;
	}
	p {
		max-width: 80%;
		text-align: center;
		font-weight: 600;
		color: #a3a3a3;
		margin-bottom: 4rem;
	}
</style>
