<script lang="ts">
    export let firstoption: string;
    export let secondoption: string;
    export let selected: boolean;
    export let stretch = false;
</script>

<div class={`${$$props.class}`} class:stretch={stretch}>
    <button class:selected={selected} on:click={()=>{selected = true}}>{firstoption}</button>
    <button class:selected={!selected} on:click={()=>{selected = false}}>{secondoption}</button>
</div>

<style>
    .stretch{
        width: 100%;
    }
    .selected {
        background-color: #646464;
        border-radius: 12px;
    }
	div {
		border: 1px solid #5b5b5b;
		background: #3c3c3c;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 13px;
        width: fit-content;
	}
    div button{
        padding: 0.5rem 1.3rem;
        margin: 1px;
        background: none;
        border: none;
        outline: none;
        color: white;
        cursor: pointer;
        font-weight: 500;
        width: 50%;
    }
</style>
