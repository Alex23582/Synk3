<script lang="ts">
	import { onMount } from 'svelte';
	import type { ProviderPlayer } from './types';
	export let player: ProviderPlayer;
	export let ready: () => void;

	let video: HTMLVideoElement;
	onMount(() => {
		video.onplaying = () => {
			if (video.readyState != 4) {
				console.log("play event blocked")
				return;
			}
			if (player.stateChange) {
				player.stateChange(1);
			}
		};
		video.onwaiting = () => {
			if (player.stateChange) {
				player.stateChange(3);
			}
		};
		video.onpause = () => {
			if (player.stateChange) {
				player.stateChange(2);
			}
		};
		video.onseeked = () => {
			if (player.stateChange) {
				player.stateChange(5);
			}
		},
		player = {
			getDuration: () => {
				return video.duration;
			},
			getProgress: () => {
				return video.currentTime;
			},
			loadVideoById: (videoId: string) => {
				return 1;
			},
			pause: () => {
				video.pause();
			},
			play: () => {
				video.play();
			},
			seek: (seconds) => {
				video.currentTime = seconds;
			},
			paused: () => {
				return video.paused;
			},
			changeSource: (link) => {
				video.src = link
			},
			stateChange: null
		};
		video.onloadedmetadata = ()=>{
			ready()
		}
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
	bind:this={video}
	preload="auto"
	src="https://www.w3schools.com/html/mov_bbb.mp4"
	controls
	muted
>
</video>

<style>
	video {
		width: 100%;
		aspect-ratio: 16/9;
		border-radius: 13px;
	}
</style>
