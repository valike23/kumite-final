<script lang="ts">
    import type { Imatch } from "../../db/interfaces";

    let corner = 'red';
</script>

<div class="main">
<div class="top">
    <h2>VIDEO REVIEW</h2>
</div>
<div class="bottom" style="background-color: {corner};">
    <h2>REQUESTED</h2>
</div>
</div>

<style>
    .main{
        width: 100vw;
        height: 100vh;
        text-align: center;     
        font-weight: 900;
        font-size: 4rem;
    }
    .top{
        height: 50vh;
        background-color: orange;
        color: white;
        padding-top: 22vh;
    }
    .bottom{
        height:50vh;
        color: white;
        
        padding-top: 22vh;
    }
</style>