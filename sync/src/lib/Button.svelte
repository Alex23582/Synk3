<script lang="ts">
	export let text: string;
    export let onClick: (e: MouseEvent)=>void = ()=>{};
</script>

<button on:click={onClick} class={`${$$props.class}`}>
    {text}
</button>

<style>
    button{
        font-weight: 600;
        color: white;
        background-color: #F95079;
        outline: none;
        border: none;
        border-radius: 0.25rem;
        padding: 1rem 1.8rem;
        cursor: pointer;
        line-height: 100%;
        transition: 0.2s;
    }
    button:hover{
        background-color: #ad576d;
    }
</style>