<script lang="ts">
    import { onMount } from "svelte";
    import Review from "../components/Tv/Review.svelte";
import TimerScreen from "../components/Tv/TimerScreen.svelte";
        import type { Imatch } from "../db/interfaces";
    import PreFightScreen from "../components/Tv/PreFightScreen.svelte";
    let win: any = {};
    let match: Imatch = {
        blueAthlete: {},
        redAthlete: {},
        blueScore: 0,
        redScore: 0,
    };
    const enum Screen {
        TIMER_SCREEN = 'timer',
        REVIEW_SCREEN =  'review',
        PRE_FIGHT = 'pre'
    }
    let channel: any ={};

    let currentScreen = Screen.REVIEW_SCREEN;

    onMount(()=>{
      win = window;
       channel = new BroadcastChannel('tv');
       channel.onmessage = (event) => {
            const {data} = event;
            if(data.action == "show match") {match = data.activeMatch;
            currentScreen = Screen.PRE_FIGHT;
            }
            if(data.action == "show timer") {match = data.activeMatch;
            currentScreen = Screen.TIMER_SCREEN;
            }
        };

    })
</script>
<div class="contain">
    {#if currentScreen == Screen.TIMER_SCREEN}
        <TimerScreen {match}></TimerScreen>
    {:else if currentScreen == Screen.REVIEW_SCREEN}
         <Review ></Review>
    {:else if currentScreen == Screen.PRE_FIGHT}
    <PreFightScreen {match}></PreFightScreen>
    {:else}
    <p>The test here</p>
    {/if}
  
</div>

<style>
    .contain {
        background-color: black;
        width: 100vw;
        height: 100vh;
    }
</style>