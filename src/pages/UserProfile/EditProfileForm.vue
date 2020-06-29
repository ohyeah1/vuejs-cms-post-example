<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <div v-if="isEdit">
          <h4 class="title">Chỉnh sửa bài viết</h4>
        </div>
        <div v-else>
          <h4 class="title">Tạo mới bài viết</h4>
        </div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field>
              <label>Tiêu đề</label>
              <md-input v-model="title" type="text">{{ title }}</md-input>
            </md-field>
            <md-field>
              <label>Nội dung</label>
              <md-textarea v-model="body"></md-textarea>
              <div class="i"></div>
            </md-field>
            <div
              v-if="images && images.length"
              v-html="renderImage()"
              class="md-layout md-gutter"
            ></div>
            <md-field>
              <label>Thêm ảnh</label>
              <md-file accept="image/*" v-on:change="onImageChange" />
            </md-field>
            <md-progress-bar
              v-if="showProgress"
              class="md-accent"
              md-mode="determinate"
            ></md-progress-bar>
          </div>
          <!-- <md-field>
              <label>Tags</label>
              <md-chips
                class="md-primary"
                v-model="tags"
                :md-auto-insert="true"
              >
              </md-chips>
            </md-field> -->
          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-card>
              <md-card-content>
                <span class="md-title">{{ title }}</span>
              </md-card-content>
              <md-card-content>
                {{ body }}
              </md-card-content>
              <md-card-media>
                <md-ripple>
                  <div v-html="renderImage()"></div>
                </md-ripple>
              </md-card-media>

              <md-card-actions>
                <md-button class="md-icon-button">
                  <md-icon>favorite</md-icon>
                </md-button>

                <md-button class="md-icon-button">
                  <md-icon>bookmark</md-icon>
                </md-button>

                <md-button class="md-icon-button">
                  <md-icon>share</md-icon>
                </md-button>
              </md-card-actions>
            </md-card>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button v-on:click="submit" class="md-raised md-success">{{
              isEdit ? "Cập nhật" : "Tạo mới"
            }}</md-button>
          </div>
          <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>{{ dialogContent }}</md-dialog-title>
            <md-dialog-actions>
              <md-button class="md-success" @click="showDialog = false"
                >OK</md-button
              >
            </md-dialog-actions>
          </md-dialog>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import Vue from "vue";

export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
    isEdit: {
      default: false,
    },
    title: {
      default: "",
    },
    body: {
      default: "",
    },
    images: {
      default: [],
    },
    id: {
      default: null,
    },
  },
  data: () => ({
    tags: ["John.Smith@example.com"],
    single: null,
    dialogContent: "",
    showDialog: false,
    showProgress: false,
    // images: [],
    image: "",
    files: [],
  }),
  methods: {
    renderImage() {
      if (this.images && this.images.length) {
        let content = "";
        this.images.forEach((image) => {
          content += `<div class="md-layout-item"><img src="${image.image_url}" alt="People"></div>`;
        });
        return content;
      }
    },
    submit() {
      let body = {
        title: this.title,
        body: this.body,
        images: this.images,
      };
      let url = `http://ghtk-testtt.com/posts/edit/${this.id}`;
      if (this.isEdit) {
        this.dialogContent = "Chỉnh sửa thành công";
      } else {
        url = `http://ghtk-testtt.com/posts/add`;
        this.dialogContent = "Tạo mới thành công";
      }
      Vue.axios.post(url, body).then((response) => {
        if (response.data && response.data.status == 200) {
        } else {
          this.dialogContent = "Có lỗi xảy ra";
        }
        this.showDialog = true;
      });
    },
    onImageChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.files = files[0];
      console.log("files", files[0]);
      // this.createImage(files[0]);
      this.uploadImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
        console.log("vm.image", vm.image);
      };
      reader.readAsDataURL(file);
    },
    uploadImage() {
      let formData = new FormData();
      formData.append("files", this.files);
      let url = `http://ghtk-testtt.com/posts/images/upload`;
      this.showProgress = true;
      if (this.id) {
        formData.append("posts_id", this.id);
        url += "/" + this.id;
      }
      Vue.axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("response", response.data);
          this.showProgress = false;
          if (response.data.status == 200) {
            this.images.push(response.data.data);
          } else {
            console.log("uploadImage", response.data.message);
          }
        });
    },
  },
};
</script>
<style>
.md-progress-bar {
  margin-top: 24px;
}
.image-slide {
  height: 40px;
}
</style>
