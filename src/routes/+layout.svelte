<script lang="ts">
    import '../app.css'
    import { App, Page, Navbar, Block, Link, Toolbar, Button } from 'konsta/svelte';
</script>

<App theme="ios">
    <Page>
      <Navbar title="CloudSpace" />
        <slot/>
      <Toolbar
      class={`left-0 bottom-0 fixed w-full`}
      >
      <Link href="/" toolbar>Home</Link>
      <Link href="/jailbreaks" toolbar>Jailbreaks</Link>
      <Link href="/tweaks" toolbar>Tweaks</Link>
    </Toolbar>  
    </Page>
</App>