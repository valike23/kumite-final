<script lang="ts">
    import type { Imatch } from "../../db/interfaces";

   export let match: Imatch = {};
</script>
<div class="main container">
    <fieldset>
        <legend>Tatami 1</legend>

        <div class="main-area">
            <div class="bar">Kumite Individual female Seniors -61</div>
            <div class="row bottom">
                <div class="col-3">
                    <div class="red">1</div>
                </div>
                <div class="col-9 pl-2">
                    <p>
                        <span class="compitetor">{match.redAthlete.firstName + " " + match.redAthlete.lastName}</span><br />
                    
                        <span class="club"
                            ><img
                                class="flag-img"
                                src="{match.redAthlete.club.flag}"
                                alt=""
                            /> {match.redAthlete.club.clubName}</span
                        >
                    </p>
                </div>
            </div>

            <div class="row">
                <div class="col-3">
                    <div class="blue">2</div>
                </div>
                <div class="col-9 pl-2">
                    <p>
                        <span class="compitetor">{match.blueAthlete.firstName + " " + match.blueAthlete.lastName}</span><br />
                    
                        <span class="club"
                            ><img
                                class="flag-img"
                                src="{match.blueAthlete.club.flag}"
                                alt=""
                            /> {match.redAthlete.club.clubName}</span
                        >
                    </p>
                </div>
            </div>
        </div>
    </fieldset>
</div>

<style>
    .bottom {
        border: 1 px solid gray;
        margin-bottom: 10px;
    }
    .compitetor {
        font-size: 2rem;
        font-weight: 700;
    }
    .area {
        font-size: 1.5rem;
        font-weight: 700;
    }
    .club {
        font-size: 1.4rem;
    }
    .red {
        background-color: red;
        height: 100%;
        display: flex;
        display: grid;
        place-items: center;
        font-size: 5rem;
        font-weight: 600;
    }
    .blue {
        background-color: blue;
        height: 100%;
        display: flex;
        display: grid;
        place-items: center;
        font-size: 5rem;
        font-weight: 600;
    }
    .flag-img {
        width: 3rem;
        height: 3rem;
    }
    .main {
        width: 100vw;
        height: 100vh;
        color: white;
    }
    .main-area {
        width: 100%;
    }
    fieldset {
        border: rgb(158, 151, 151) 8px solid;
        display: flex;
        height: 100%;
        margin-bottom: 30px;
        display: grid;
        place-items: center;
    }

    legend {
        padding: 5px 10px;
        font-size: 3rem;
        font-weight: 700;
    }
    .bar {
        background-color: rgb(92, 87, 87);
        padding-top: 2px;
        padding-bottom: 2px;
        font-size: 2rem;
        font-weight: 500;
    }
</style>
