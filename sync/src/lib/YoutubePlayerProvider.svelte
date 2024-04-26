<script lang="ts">
	import { onMount } from 'svelte';
	import type { ProviderPlayer } from './types';
    export let player: ProviderPlayer;
    export let initialVideoId: string;
    export let ready: () => void;

	onMount(() => {
		function load() {
			let localplayer = new (window as any).YT.Player('youtubeplayer', {
				height: 'auto',
				width: '100%',
				videoId: initialVideoId,
                playerVars: {
                    'color': "white",
                    "autoplay": 1
                },
                events: {
                    'onReady': ready,
                    'onStateChange': (e: any)=>{
                        if(player.stateChange){
                            player.stateChange(e.data)
                        }
                    }
                }
			});
            player = {
                getDuration: ()=>{
                    return localplayer.getDuration()
                },
                getProgress: ()=>{
                    return localplayer.getCurrentTime()
                },
                loadVideoById: (videoId: string)=>{
                    return localplayer.loadVideoById(videoId)
                },
                pause: ()=>{
                    localplayer.pauseVideo()
                },
                paused: () => {
                    return localplayer.getPlayerState() == 2
                },
                play: () => {
                    localplayer.playVideo()
                },
                seek: (seconds) => {
                    localplayer.seekTo(seconds, true)
                },
                stateChange: null
            }
		}
        if ((window as any).YT) {
            load();
        } else {
            (window as any).onYouTubeIframeAPIReady = load;
        }
	});
</script>

<svelte:head>
	<script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<div id="youtubeplayer" />

<style>
	#youtubeplayer {
		width: 100%;
		aspect-ratio: 16/9;
		border-radius: 13px;
	}
</style>
