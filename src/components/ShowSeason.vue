<template>
    
 <h4 id="season" style="color: #18245d; margin-top: 2%; font-size: 20px">
    <b>Show Seasons</b>
  </h4>
  
  <div v-if="season.length>0">
    <n-space>
      <n-spin v-if="!shows" :show="true" size="large" spinner-animation-speed="7000s" />
    </n-space>
    <div class="container">
      <div class="row" v-for="s in season" :key="s">
        <div class="col-sm-4">
          <div v-if="s.image == null">
            <h5>
              <img
                src="../assets/img/noimage.jpg"
                alt="NA"
                style="
                  width: 200px;
                  height: 200px;
                  object-fit: scale-down;
                  border: 2px solid #15245d;
                "
              />
            </h5>
          </div>
          <img
            v-else
            v-bind:src="s.image.medium"
            class="img-rounded"
            style="
              object-fit: fill;
              margin-bottom: 1%;
              border: 3px solid #15245d;
            "
            alt="no img"
          />
        </div>
        <div
          class="col-sm-8"
          style="
            color: black;
            text-align: center;
            margin-bottom: 2%;
            border-style: ridge;
            border-color: #18265d;
          "
        >
          <ul>
            <li><b>Season</b>-{{ s.number }}</li>
            <li><b> PremiereDate</b>-{{ s.premiereDate }}</li>
            <label><b> Summary</b></label>
            <li
              v-if="s.summary !== null && s.summary !== ''"
              v-html="s.summary"
            ></li>
            <li v-else>NA</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else><strong style="color:brown">No Season Available</strong></div>
</template>
<script>
import Axios from 'axios'

export default {
  name: "ShowSeason",
  data() {
    return {
      id: this.$route.params.data,
         season: [],
        };
},
created() {
  
    this.getSeasons();
},
methods:{
      getSeasons() {
      console.log(this.search);
      this.loading = true;
      Axios.get("https://api.tvmaze.com/shows/" + this.id+ "/seasons")
        .then((response) => {
          this.season = response.data;
          console.log(response.data);
          this.loading = false;
        })
        .catch((err) => {
          this.laoding = false;
          this.err = "Something went wrong....";
          console.log("error", err);
        });
    },

},
info(id) {
      console.log(id);
      this.$router.push({ name: "ShowSeason", params: { data: id } });
    },
    }
     </script>
