<script lang="ts">
    import { onMount } from "svelte";
    import { Estatus, type Imatch } from "../db/interfaces";
    import { AthletesCtrl } from "../db/atheletes";

    let win: any = {};
    let minute: any = 0;
    let second: any = "00";
    let timerValue: any = 90;
    let intervalId;
    let channel: any = {};
    let matches: Imatch[] = [];
    let activeMatch: Imatch = {
        blueAthlete: {},
        redAthlete: {},
        blueScore: 0,
        redScore: 0,
    };


   

    const openScoreBoard = async () => {
        console.log("the score board not opening");
       // win.openWindow("/tv");
       channel.postMessage({ action: "show timer", activeMatch });
        console.log("the score board not opening2");
    };

    const startTimer = () => {
        intervalId = setInterval(() => {
            convertTimerToSecs();
        }, 1000);

    };

    const convertTimerToSecs = () => {
        if (timerValue <= 0) {
            console.log("enter here to work");
            clearInterval(intervalId);
            return;
        }
        minute = Math.floor(timerValue / 60);
        second = timerValue % 60;
        if (second >= 0 && second <= 9) {
            second = "0" + second.toString();
        }

        timerValue = timerValue - 1;
    };
    const createMatch = async () => {
        let redName: string = document.getElementById("redName")["value"];
        let blueName: string = document.getElementById("blueName")["value"];
        let category: string =  document.getElementById("category")["value"];
        let match: Imatch = {
            status: Estatus.INACTIVE,
            category,
            redAthlete: {
                firstName: redName.split(" ")[0],
                lastName: redName.split(" ")[1],
                club: {
                    clubName: document.getElementById("blueClub")["value"],
                    flag: document.getElementById("blueFlag")["value"],
                    shortname: document.getElementById("redShort")["value"]
                },
            },
            blueAthlete: {
                firstName: blueName.split(" ")[0],
                lastName: blueName.split(" ")[1],
                club: {
                    clubName: document.getElementById("blueClub")["value"],
                    flag: document.getElementById("blueFlag")["value"],
                    shortname: document.getElementById("blueShort")["value"]
                },
            },
        };
        console.log("the match is working", match);
        await AthletesCtrl.createMatch(match);
        alert("created successfully");
    };
    const addAthlete = () => {
        win.Metro.dialog.create({
            title: "Add next match",
            content: `<div>
                <input id="category" type="text" data-role="input" data-prepend="category : ">
                
                <input id="blueShort" type="text" data-role="input" data-prepend="blue short name : ">
                <input id="redShort" type="text" data-role="input" data-prepend="red shortname : ">
                <input id="redName" type="text" data-role="input" data-prepend="Red Full Name: ">
                <input id="blueName" type="text" data-role="input" data-prepend="Blue Full Name: ">
                <input id="redClub" type="text" data-role="input" data-prepend="Red club Name: ">
                <input id="blueClub" type="text" data-role="input" data-prepend="Blue club Name: ">
                <input id="blueFlag" type="text" data-role="input" data-prepend="Blue Flag: ">
                <input id="redFlag" type="text" data-role="input" data-prepend="Red Flag: ">
                </div>`,
            actions: [
                {
                    caption: "Agree",
                    cls: "js-dialog-close alert",
                    onclick: createMatch,
                },
                {
                    caption: "Disagree",
                    cls: "js-dialog-close",
                    onclick: function () {
                        alert("You clicked Disagree actio");
                    },
                },
            ],
        });
    };
    const handleScores = (score: number, side: string) => {
        if (side == "blue")
            activeMatch.blueScore = activeMatch.blueScore + score;
        if (side == "red") activeMatch.redScore = activeMatch.redScore + score;
    };
    const startNextMatch = async () => {
        try {
            win.showMessageBox(
                "start match",
                "you are about to start a match, if you have not added a match, you cant start the match"
            );
        } catch (error) {
            alert(JSON.stringify(error));
        }
        const Allmatches = await AthletesCtrl.getAllPendingMatches();
        Allmatches.forEach((match) => {
            if (match.status == Estatus.INACTIVE) matches.push(match);
        });
        console.log("matches", matches);
        activeMatch = matches[0];
        activeMatch.redScore = 0;
        activeMatch.blueScore = 0;
        matches = matches;
        channel.postMessage({ action: "show match", activeMatch });
    };
    onMount(async () => {
        win = window;
        channel = new BroadcastChannel("tv"); // Use the same channel name
       
        //await Neutralino.window.setTitle('controller screen');
        // console.log('the nl path', NL_PATH);
    });
</script>

<svelte:head>
    <title>WFK: Controller Screen</title>
</svelte:head>

<div class="container">
    <div class="row">
        <div class="cell-9">
            <div class="row">
                <div class="cell-3">
                    <h4>
                        {#if activeMatch && activeMatch.blueAthlete}
                            {activeMatch.blueAthlete.firstName +
                                " " +
                                activeMatch.blueAthlete.lastName}
                        {/if}
                    </h4>
                    <h2>Ao</h2>
                    <div class="mb-3">
                        <button
                            on:click={() => {
                                handleScores(3, "blue");
                            }}
                            class="button btn secondary">Ippon</button
                        >
                    </div>
                    <div class="mb-3">
                        <button
                            on:click={() => {
                                handleScores(2, "blue");
                            }}
                            class="button btn secondary">Waza-ari</button
                        >
                    </div>
                    <div class="mb-3">
                        <button
                            on:click={() => {
                                handleScores(1, "blue");
                            }}
                            class="button btn secondary">Yuko</button
                        >
                    </div>
                    <div class="mt-4 mb-4">
                        <input type="checkbox" name="" id="" />
                        <label for="">Sensu</label>
                    </div>
                    <div class="mt-3">
                        <button class="button btn secondary">-1</button>
                    </div>
                    <div class="penalty-left">
                        <div>
                            <span>1C</span> <span>1C</span> <span>2C</span>
                            <span>3C</span> <span>HC</span> <span>H</span>
                        </div>
                        <div class="che" style="border: 2px solid white;">
                            <input type="checkbox" name="" id="" />
                            <input type="checkbox" name="" id="" />
                            <input type="checkbox" name="" id="" />
                            <input type="checkbox" name="" id="" />
                            <input type="checkbox" name="" id="" />
                        </div>
                    </div>
                </div>
                <div class="cell-6">
                    <div class="card" style="border-radius: 17px;">
                        <p>
                            <button
                                class="button start success mt-2 large"
                                on:click={startTimer}>start</button
                            >
                        </p>
                        <div class="row mb-3">
                            <div class="cell-11">
                                <button class="mt-2 ml-7 button"
                                    >KO Timer</button
                                >

                                <div class="pl-7" style="color: black">
                                    <h2>
                                        <span class="minute">{minute}</span>:
                                        <span class="seconds">{second}</span>
                                    </h2>
                                </div>
                            </div>
                            <div class="cell-1 pr-2">
                                <button class="pt-2 pb-2"
                                    ><span class="mif-arrow-up" /></button
                                >
                                <br />
                                <br />
                                <br />
                                <button class="pt-2 pb-2"
                                    ><span class="mif-arrow-down" /></button
                                >
                            </div>
                        </div>
                        <div>
                            <h4>The final test</h4>
                        </div>
                    </div>
                    <div style="color: white">
                        <h4>
                            <span class="red-score score"
                                >{activeMatch.blueScore || 0}</span
                            >
                            <span class="blue-score score"
                                >{activeMatch.redScore || 0}</span
                            >
                        </h4>
                    </div>
                    <div>
                        <h4>PENALTY</h4>
                    </div>
                </div>
                <div class="cell-3">
                    <h4>
                        {activeMatch.redAthlete.firstName +
                            " " +
                            activeMatch.redAthlete.lastName}
                    </h4>
                    <h2>Aka</h2>
                    <div class="mb-3">
                        <button
                            on:click={() => {
                                handleScores(3, "red");
                            }}
                            class="button btn secondary">Ippon</button
                        >
                    </div>
                    <div class="mb-3">
                        <button
                            on:click={() => {
                                handleScores(2, "red");
                            }}
                            class="button btn secondary">Waza-ari</button
                        >
                    </div>
                    <div class="mb-3">
                        <button
                            on:click={() => {
                                handleScores(1, "red");
                            }}
                            class="button btn secondary">Yuko</button
                        >
                    </div>

                    <div class="mt-4 mb-4">
                        <input type="checkbox" name="" id="" />
                        <label for="">Sensu</label>
                    </div>
                    <div class="mt-3">
                        <button class="button btn secondary">-1</button>
                    </div>
                    <div class="penalty">
                        <div>
                            <span>1C</span> <span>1C</span> <span>2C</span>
                            <span>3C</span> <span>HC</span> <span>H</span>
                        </div>
                        <div class="che" style="border: 2px solid white;">
                            <input type="checkbox" name="" id="" />
                            <input type="checkbox" name="" id="" />
                            <input type="checkbox" name="" id="" />
                            <input type="checkbox" name="" id="" />
                            <input type="checkbox" name="" id="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cell-3" style="padding: 8px;">
            <div>
                <fieldset>
                    <legend>Time</legend>
                    <button class="button full">reset time</button>
                    <div style="margin-top: 8px;margin-bottom: 8px;">
                        match time: <span style="text-align: right;"
                            ><input type="text" style="width: 30px;" />:
                            <input type="text" style="width: 30px;" /></span
                        >
                    </div>
                    <button class="button full">extra time</button>
                    <button style="margin-top: 20px;" class="button full"
                        >60 seconds</button
                    >

                    <button style="margin-top: 20px;" class="button full"
                        >reset</button
                    >

                    <button
                        on:click={openScoreBoard}
                        style="margin-top: 20px;"
                        class="button full">start scoreboard</button
                    >

                    <button style="margin-top: 20px;" class="button full"
                        >end Score Board</button
                    >

                    <button
                        style="margin-top: 20px; background-color:red;color:white"
                        class="button full danger">close</button
                    >
                </fieldset>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-8">
            {#each matches as match, i}
                {#if i == 0}
                    <p>Current Match</p>
                {:else}
                    <p>Next Match</p>
                {/if}
                <div class="row" style="margin-top: 3px;">
                    <div class="col-5">
                        <span class="athlete-red h5"
                            >{match.redAthlete.firstName +
                                " " +
                                match.redAthlete.lastName}</span
                        >
                    </div>
                    <div class="col-5">
                        <span class="athlete-blue h5"
                            >{match.blueAthlete.firstName +
                                " " +
                                match.blueAthlete.lastName}</span
                        >
                    </div>
                    <div class="col-2">
                        <label for="">match number</label><br />
                        <span class="h2" style="padding: 0;"> {i + 1} </span>
                    </div>
                </div>
            {/each}
        </div>
        <div class="col-4">
            <div style="text-align: center;">
                Winner:
                <span class="red-select"
                    ><input type="radio" name="winner" id="" /></span
                >
                <span class="blue-select"
                    ><input type="radio" name="winner" id="" /></span
                >
                <br />
                <br />
                <button
                    on:click={startNextMatch}
                    style="margin-left: 10px;"
                    class="button full">next match</button
                >
                <button
                    on:click={addAthlete}
                    style="margin-left: 10px;"
                    class="button full">Add match</button
                >
            </div>
        </div>
    </div>
</div>

<style>
    .red-select {
        font-size: larger;
        padding: 10px;
        border-radius: 3px;
        color: red;
        margin-right: 5px;
        background-color: red;
    }
    .blue-select {
        font-size: larger;
        padding: 10px;
        border-radius: 3px;
        color: blue;
        background-color: blue;
    }
    .athlete-blue {
        border: 3px solid blue;
        width: 100%;
        padding: 5px;
        margin-top: 10px;
    }
    .athlete-red {
        border: 3px solid red;
        width: 100%;
        padding: 5px;
        margin-top: 10px;
    }
    .full {
        width: 100%;
    }
    .penalty-left {
        margin-top: 10vh;
        color: white;
        margin-left: 10px;
    }
    .penalty {
        margin-top: 10vh;
        color: white;
        margin-right: 10px;
    }
    .penalty > div > span {
        padding: 3px;
    }
    .che > input {
        padding: 3px;
    }
    .score {
        font-size: 20vh;
        margin-top: 4vh;
    }
    .red-score {
        margin-right: 4vh;
    }
    .blue-score {
        margin-left: 4vh;
    }
    .start {
        padding: 30px;
    }
    .container {
        height: 100vh;
    }
    .cell-9 {
        height: 100%;
        background: linear-gradient(to right, blue 50%, red 50%);
        color: white;
        text-align: center;
    }
    h2 {
        font-weight: 700;
        font-size: 4rem;
    }
    .btn {
        width: 100px;
    }
</style>
