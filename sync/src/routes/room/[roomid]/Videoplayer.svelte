<script lang="ts">
	import YoutubePlayerProvider from '$lib/YoutubePlayerProvider.svelte';
	import type { ProviderPlayer } from '$lib/types';
	import VideoPlayerProvider from '$lib/VideoPlayerProvider.svelte';
	import { pingCallback, roommessage, socket } from '$lib/SocketStore';
	let youtubemode = false;
	let player: ProviderPlayer;

	let lastStateAndTime: { state: number; progress: number; localTime: number } | undefined =
		undefined;

	/// STATE CHANGES FROM VIDEOPLAYER

	let readycalled = false;

	function ready() {
		if (readycalled) {
			return;
		}
		readycalled = true;

		socket.emit('requestRoomState');

		player.stateChange = (state: number) => {
			console.log('SEES: ' + state);
			console.log(player.getProgress());
			if (!lastStateAndTime) {
				lastStateAndTime = {
					localTime: 0,
					progress: 0,
					state: 0
				};
			}
			const elapsedTime = (Date.now() - lastStateAndTime.localTime) / 1000;
			const currentvideoprogress = lastStateAndTime.progress + elapsedTime;
			const delta = Math.abs(currentvideoprogress - player.getProgress())
			//PLAY
			if (state == 1) {
				if (delta < 2 && lastStateAndTime.state == 1) {
					console.log('play blocked');
					return;
				}
				console.log('play emitted');
				socket.emit('room', { state, time: player.getProgress() });
				player.pause();
			}
			//PAUSE
			if (state == 2) {
				if (lastStateAndTime.state == 2) {
					console.log('pause blocked');
					return;
				}
				console.log('pause emitted');
				socket.emit('room', { state, time: player.getProgress() });
			}
			//SEEK
			if (state == 5) {
				if (delta < 2) {
					console.log("seek blocked")
					return;
				}
				console.log("seek emitted")
				socket.emit('room', { state: 2, time: player.getProgress() });
			}
		};

		setInterval(() => {
			if (!lastStateAndTime) {
				return;
			}
			if (lastStateAndTime.state == 1) {
				const elapsedTime = (Date.now() - lastStateAndTime.localTime) / 1000;
				const currentvideoprogress = lastStateAndTime.progress + elapsedTime;
				const delta = Math.abs(currentvideoprogress - player.getProgress());
				if (delta > 1) {
					player.seek(currentvideoprogress);
					if (player.paused()) {
						player.play();
					}
				}
			}
			if (lastStateAndTime.state == 2 && !player.paused()) {
				player.seek(lastStateAndTime.progress);
				player.pause();
			}
		}, 1000);
	}

	/// MESSAGES FROM SERVER

	roommessage.subscribe((message: any) => {
		if (!message.type) {
			return;
		}
		switch (message.type) {
			case 'changesrc':
				player.changeSource(message.newsrc);
		}
	});

	roommessage.subscribe((message: any) => {
		if (!message.state) {
			return;
		}
		if (message.state == 1) {
			const messageReceived = Date.now();
			pingCallback(message.servertime, () => {
				const callbackReceived = Date.now();
				const ping = callbackReceived - messageReceived;
				const totalvideooffset = ping / 1000;
				const currentvideoprogress = message.time + totalvideooffset;
				lastStateAndTime = { state: 1, progress: currentvideoprogress, localTime: Date.now() };
				console.log({ totalvideooffset });
				player.seek(currentvideoprogress);
				player.play();
			});
		}
		if (message.state == 2) {
			lastStateAndTime = { state: 2, progress: message.time, localTime: Date.now() };
			player.seek(message.time);
			player.pause();
		}
	});
</script>

{#if youtubemode}
	<YoutubePlayerProvider initialVideoId="WM8lALQUa-A" {ready} bind:player />
{:else}
	<VideoPlayerProvider {ready} bind:player />
{/if}
