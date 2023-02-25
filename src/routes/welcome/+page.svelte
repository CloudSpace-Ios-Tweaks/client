<script lang="ts">
    import { Button } from 'konsta/svelte';
import mockup from '../../assets/mockup.png'
</script>

<div class="flex items-center justify-center">
    <div class="flex flex-col">
        <h1 class="text-3xl">CloudSpace</h1>
        <h3 class="text-xl">one of many thrid party app stores.</h3>
        <Button onClick={() => window.location.href="/"}>GO</Button>
    </div>
    <img class="flex items-center mt-15" src={mockup} alt="cloudspace mockup"/>
</div>