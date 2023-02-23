<script lang="ts">
    import '../app.css'
    import { App, Page, Navbar, Block } from 'konsta/svelte';
    import AppComp from './components/AppComp.svelte';
    import Apps from './state/apps.svelte';
</script>

<Block outline>
    <Apps type="all"/>
</Block>