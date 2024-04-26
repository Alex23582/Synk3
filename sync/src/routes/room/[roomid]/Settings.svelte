<script lang="ts">
	import StyledInput from '$lib/StyledInput.svelte';
	import Switcher from '$lib/Switcher.svelte';
	import { socket } from '$lib/SocketStore';

	let chatselected = true;
	let videoInput = "" 
	function submitNewVideo(){
		socket.emit("newvideo", videoInput)
	}
</script>

<div class="container">
	<div class="settingsoptionscontainer">
		<p>Chat aktiv</p>
		<Switcher firstoption="Ja" secondoption="Nein" selected={chatselected} />
	</div>
	<div class="settingsoptionscontainer">
		<p>Coinmaster-Modus</p>
		<Switcher firstoption="Ja" secondoption="Nein" selected={chatselected} />
	</div>
	<p class="settingshorizontaltext">Video wechseln</p>
	<StyledInput bind:message={videoInput} submitFunction={submitNewVideo} placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" width="100%" />
</div>

<style>
	.settingshorizontaltext {
		margin-bottom: 0;
		font-weight: 500;
	}
	.container {
		width: 100%;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.settingsoptionscontainer {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.settingsoptionscontainer p {
		margin: 0;
		font-weight: 500;
	}
</style>
