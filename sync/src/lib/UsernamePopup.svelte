<script lang="ts">
    import { goto } from '$app/navigation';
	import { username, requestUsername, initialRoomId } from './RoomStore';
    import Button from './Button.svelte'
	import StyledInput from './StyledInput.svelte';
    let usernamtext = ""

    function setUsername(){
        username.set(usernamtext)
        requestUsername.set(false)
        goto("/room/" + $initialRoomId)
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="backdrop">
	<div class="main">
        <p>Select username</p>
        <StyledInput submitFunction={setUsername} bind:message={usernamtext} width="100%" placeholder="Username" />
        <Button class="usernamebutton" onClick={setUsername} text="Join" />
    </div>
</div>

<style>
    :global(.usernamebutton){
        padding: 0.7rem !important;
        width: 100%;
        margin-top: 20px;
    }
	.main {
		color: white;
		background-color: #3c3c3c;
		z-index: 101;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 2rem;
		width: 50%;
		max-width: 300px;
		border-radius: 7px;
		max-height: 70vh;
	}
    .main p {
        font-weight: 500;
    }
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
