<script lang="ts">
    import AppComp from "../components/AppComp.svelte";

    export const data = [
        {
      key: "0",
      name: "unc0ver",
      ipa: "https://cloudspace-cloud9.netlify.app/unc0ver.ipa",
      image: "https://pbs.twimg.com/profile_images/1171122350177153025/OknpE-Oo_400x400.jpg",
      category: "jailbreak"
    },
    {
      key: "1",
      name: "Elctra",
      ipa: "https://cloudspace-cloud9.netlify.app/Electra.ipa",
      image: "https://iosninja.io/img/ipas/electra-jb.png",
      category: "jailbreak"
    },
    {
      key: "2",
      name: "EtasonJB",
      ipa: "https://cloudspace-cloud9.netlify.app/unc0ver.ipa",
      image: "https://tweak-box.com/wp-content/uploads/2021/07/etason-jailbreak.png",
      category: "jailbreak"
    },
    {
      key: "3",
      name: "H3lix",
      ipa: "https://cloudspace-cloud9.netlify.app/h3lix.ipa",
      image: "https://tweak-box.com/wp-content/uploads/2021/06/helix-jailbreak-logo-200px-1-1.png",
      category: "jailbreak"
    },
    {
      key: "4",
      name: "Pangu",
      ipa: "https://cloudspace-cloud9.netlify.app/pangu.ipa",
      image: "https://pbs.twimg.com/profile_images/532660653496872961/hLEXNqTD_400x400.png",
      category: "jailbreak"
    },
    {
      key: "5",
      name: "Pheonix",
      ipa: "https://cloudspace-cloud9.netlify.app/pheonix.ipa",
      image: "https://phoenixpwn.com/phoenix.png",
      category: "jailbreak"
    },
    {
      key: "6",
      name: "Yalu",
      ipa: "https://cloudspace-cloud9.netlify.app/yalux.ipa",
      image: "https://scontent.fsan1-2.fna.fbcdn.net/v/t39.30808-6/326264161_1230959244445052_3705050477172162559_n.png?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IQ3Xa45P8pgAX-2C6v5&_nc_ht=scontent.fsan1-2.fna&oh=00_AfA9ozgQd-fQDQJ6pFkI2CJEHYXz5pm0bBhFzUwH9bmmUQ&oe=63F1C086",
      category: "jailbreak"
    },
    {
      key: "7",
      name: "Spotify++",
      ipa: "https://cloudspace-cloud9.netlify.app/Spotify++.ipa",
      image: "https://play-lh.googleusercontent.com/eN0IexSzxpUDMfFtm-OyM-nNs44Y74Q3k51bxAMhTvrTnuA4OGnTi_fodN4cl-XxDQc",
      category: "tweaks"
  },
  {
      key: "8",
      name: "YoutubeMusic++",
      ipa: "https://cloudspace-cloud9.netlify.app/YTMusic++.ipa",
      image: "https://play-lh.googleusercontent.com/GnYnNfKBr2nysHBYgYRCQtcv_RRNN0Sosn47F5ArKJu89DMR3_jHRAazoIVsPUoaMg=w240-h480-rw",
      category: "tweaks"
  },
  {
      key: "9",
      name: "Tinder++",
      ipa: "https://cloudspace-cloud9.netlify.app/Tinder++.ipa",
      image: "https://tinder.com/static/tinder.png",
      category: "tweaks"
  },
  {
    key: "10",
    name: "WhatsApp++",
    ipa: "https://cloudspace-cloud9.netlify.app/WhatsApp++.ipa",
    image: "https://cdn-icons-png.flaticon.com/512/124/124034.png",
    category: "tweaks"
  },
  {
    key: "11",
    name: "Deezer++",
    ipa: "https://cloudspace-cloud9.netlify.app/Deezer++.ipa",
    image: "https://play-lh.googleusercontent.com/Z1yPp6_xnv5-XUvCxujCzg-aY3OBgvS1LyFfdh4NO6il7Qrn5eELa-upajeuWs9lSq-T",
    category: "tweaks"
  },
  {
    key: "12",
    name: "Enmity",
    ipa: "https://cloudspace-cloud9.netlify.app/Enmity.ipa",
    image: "https://avatars.githubusercontent.com/u/101209876?s=280&v=4",
    category: "tweaks"
  },
    ]

    export let type: string;

    import {Block, Button} from 'konsta/svelte'
</script>

  <a href="https://github.com/CloudSpace-Ios-Tweaks/server/blob/main/Cloudspace-App.mobileconfig?raw=true"><Button>Add app to homescreen</Button></a>
&nbsp;
{#if type === "all"}
{#each data as app}
    <AppComp ipa={() => window.location.href=app.ipa} imageData={app.image} name={app.name} />
{/each}
{:else if type ==="jailbreaks"}
{#each data as app}
    {#if app.category === "jailbreak"}
        <AppComp ipa={() => window.location.href=app.ipa} imageData={app.image} name={app.name} />
    {/if}
{/each}
{:else if type === "tweaks"}
{#each data as app}
    {#if app.category === "tweaks"}
        <AppComp ipa={() => window.location.href=app.ipa} imageData={app.image} name={app.name} />
    {/if}
{/each}
{/if}