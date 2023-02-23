<script lang="ts">
    import {Button} from 'konsta/svelte'

    export let imageData: string;
    export let ipa: any;
    export let name: string;
</script>

<div class="p-2">
<div class="h-[64px] flex mt-0">
<img
    alt="App Icon"
    src={imageData}
    class="w-[64px] h-[64px] rounded-lg"
/>
<div class="w-full ml-[13px] mt-[2px] mb-[14px]">
    <p class="w-full ml-[-4.5px]" style="color: black; font-size: 24px">{name}</p>
    <p class="mt-[3px] opacity-[0.3]" style="color: #121212;">In-App purchases</p>
</div>
<Button class='h-[25px] w-[70px]' style="width: 70px;" onClick={ipa} rounded>get</Button>
</div>
</div>
