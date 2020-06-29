<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <edit-profile-form
          data-background-color="green"
          :id="id"
          :isEdit="isEdit"
          :title="title"
          :body="body"
          :images="images"
        >
        </edit-profile-form>
      </div>
      <!-- <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
      </div> -->
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from "@/pages";
import Vue from "vue";

export default {
  data: () => ({
    isEdit: false,
    title: "",
    body: "",
    images: [],
    id: null
  }),
  mounted() {
    console.log("mounted detail", this.$route.params, this.$route.query);
    const { id } = this.$route.params;
    if (id) {
      this.id = id;
      // get from api
      Vue.axios.get(`http://ghtk-testtt.com/posts/get/${id}`).then(response => {
        if (response.data && response.data.data) {
          this.isEdit = true;
          const post = response.data.data.Post;
          this.title = post.title || "";
          this.body = post.body || "";
          this.images = post.images || [];

          console.log("fetchData done", response.data);
        }
      });
    } else {
      // new post
    }
  },
  components: {
    EditProfileForm,
    // UserCard
  },
};
</script>
