<script lang="ts">
    import type { Imatch } from "../../db/interfaces";

    export let match: Imatch = {};
    enum EvrScreen {
        NONE = 'none',
        RED = 'red-flag',
        BLUE = 'blue-flag'

    }
    let vr= EvrScreen.NONE;
</script>

<div class="main">
    <div class="row red">
        <div class="col-2">
            <div style="height: 40%;">
                <img style="height: 100%;" src="{match.redAthlete.club.flag}" alt="" />
            </div>
            <div style="height: 30%;color:white;margin-bottom: -20px">
                <h2 style="font-size: 200%; font-weight:700">{match.redAthlete.club.shortname}</h2>
            </div>

            <div style="height: 25%;color:red">
                <h2 style="font-size: 100%; font-weight:600">PENALTY</h2>
            </div>
        </div>

        <div class="col-7">
            <div style="height: 40%; padding-top:15px">
                <h2 class="name">{match.redAthlete.firstName + " " + match.redAthlete.lastName}</h2>
            </div>
            <div style="height: 25%;color:white;margin-top:-20px">
                <p style="font-size: 150%; font-weight:400">{match.redAthlete.club.clubName}</p>
            </div>

            <div class="row" style="height: 35%;color:red">
                <div class="col-4 container-bar">
                    <span class="bar" style="background-color: red;width:100%"
                        >going on</span
                    >
                </div>
                <div class="col-4 container-bar">
                    <span class="bar" style="background-color: red;width:100%"
                        >going on</span
                    >
                </div>
            </div>
        </div>
        <div class="col-2">
            <div class="row">
                <div class="col-5">
                   {#if vr == EvrScreen.RED}
                        <div class="card vr">VR</div>
                   {/if}
                </div>
                <div class="col-3">
                    <div class="circle" style="border-color: red;" />
                </div>
                <div class="col-4">
                    <span style="color: red;" class="score float-right">{match.redScore}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="row blue">
        <div class="col-2">
            <div style="height: 40%;">
                <img style="height: 100%;" src="{match.blueAthlete.club.flag}" alt="" />
            </div>
            <div style="height: 30%;color:white;margin-bottom: -20px">
                <h2 style="font-size: 200%; font-weight:700">{match.blueAthlete.club.shortname}</h2>
            </div>

            <div style="height: 25%;color:blue">
                <h2 style="font-size: 100%; font-weight:600">PENALTY</h2>
            </div>
        </div>

        <div class="col-7">
            <div style="height: 40%; padding-top:15px">
                <h2 class="name">{match.blueAthlete.firstName + " " + match.blueAthlete.lastName}</h2>
            </div>
            <div style="height: 25%;color:white;margin-top:-20px">
                <p style="font-size: 150%; font-weight:400">{match.blueAthlete.club.clubName}</p>
            </div>

            <div class="row" style="height: 35%;color:blue">
                <div class="col-4 container-bar">
                    <span class="bar" style="background-color: blue;width:100%"
                        >going on</span
                    >
                </div>
                <div class="col-4 container-bar">
                    <span class="bar" style="background-color: blue;width:100%"
                        >going on</span
                    >
                </div>
            </div>
        </div>
        <div class="col-2">
            <div class="row">
                <div class="col-5">
                    {#if vr == EvrScreen.BLUE}
                    <div class="card vr">VR</div>
                    {/if}
                </div>
                <div class="col-3">
                    <div class="circle" style="border-color: blue;" />
                </div>
                <div class="col-4">
                    <span style="color: blue;" class="score float-right">{match.blueScore}</span
                    >
                </div>
            </div>
        </div>
    </div>
    <div class="row timer">
        <div class="col-3">
            <p class="kata">Kusami 1</p>
        </div>
        <div class="col-1">
            <img src="" alt="" />
        </div>
        <div class="col-4 clock">
            <span class="minute">0:</span><span class="second">00.</span><sup
                class="milli">22</sup
            >
        </div>
        <div class="col-4 kata"><p>{match.category}</p></div>
    </div>
</div>

<style>
    .clock {
        font-size: 5rem;
        font-weight: 800;
    }
    .second{
        font-size: 9rem;
    }
    .minute {
        font-size: 9rem;
    }
    .kata {
        font-size: 3.2rem;
        font-weight: 400;
        line-height: 1.3cm;
    }
    .milli {
        font-size: 4rem;
    }
    .timer {
        padding-top: 3rem;
        color: white;
    }
    .score {
        font-size: 6rem;
        margin-top: 3rem;
        text-align: right;
    }
    .circle {
        border-radius: 50%;
        border: 5px double;
        width: 4rem;
        height: 4rem;
        margin-top: 4rem;
    }
    .vr {
        background-color: yellow;
        height: 60%;
        font-size: 3rem;
        font-weight: 700;
        text-align: center;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
    .container-bar {
        margin-bottom: 30px;
    }
    .bar {
        width: 100%;
        height: 40px;
        margin-right: 5px;
    }
    .name {
        color: white;
        font-size: 200%;
    }
    .main {
        height: 100vh;
    }
    .red {
        height: 33.33vh;
        padding-left: 2em;
        padding-right: 2em;
        padding-top: 1em;
        background-color: rgba(255, 0, 0, 0.1);
    }
    .blue {
        height: 33.33vh;
        background-color: rgba(0, 0, 255, 0.1);
        padding-left: 2em;
        padding-right: 2em;
        padding-top: 1em;
    }
    .timer {
        height: 33.33vh;
    }
</style>
