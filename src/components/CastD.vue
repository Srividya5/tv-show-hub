<template>
     <h4 id="crew" style="margin-top: 2%"><b>Cast</b>&nbsp;Details</h4>
    <div class="container">
      <div
        class="row row-cols-1 row-cols-lg-6 g-2 g-lg-2"
        v-if="cast.length > 0"
        style="border-style: solid"
      >
        <div class="col" v-for="c in cast.slice(0, 10)" :key="c">
          <div class="p-1 border bg-gray">
            <div v-if="c.person.image == null && c.person.image == ''">
              <h5 style="color: #fff">
                <img
                  src="../assets/img/userimage.png"
                  class="img-thumbnail"
                  alt="NA"
                  style="
                    width: 200px;
                    height: 190px;
                    object-fit: cover;
                    border: 1px solid #15245d;
                  "
                />
              </h5>
            </div>

            <img
              v-else
              v-bind:src="c.person.image.medium"
              class="img-thumbnail"
              alt="NO Image"
              style="
                width: 200px;
                height: 205px;
                object-fit: fill;
                margin-bottom: 2%;
                border: 1px solid #15245d;
              "
            />
            <div class="title" style="color: black" v-if="c != null">
              {{ c.person.name }}
            </div>

            <div class="title" style="color: black">
              As {{ c.character.name }}
            </div>
          </div>
        </div>
      </div>
      <div v-else><b style="color: brown">No Cast Available</b></div>
    </div>

</template>
<script>
import Axios from 'axios'

export default {
    name: "CastD",
  data() {
    return {
      id: this.$route.params.data,
      cast:[],
    };
},
created(){
    this.getCastInfo()
},
methods:{
 getCastInfo() {
      console.log(this.search);
      this.loading = true;
      Axios.get("https://api.tvmaze.com/shows/" + this.id1 + "/cast")
        .then((response) => {
          this.cast = response.data;
          console.log(response.data);
          this.loading = false;
        })
        .catch((err) => {
          this.laoding = false;
          this.err = "Something went wrong..";
          console.log("error", err);
        });
    },
    info(id) {
      console.log(id);
      this.$router.push({ name: "CastD", params: { data: id } });
    },
}
  }
</script>
