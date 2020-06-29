<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Danh sách bài viết</h4>
            <!-- <p class="category">Here is a subtitle for this table</p> -->
          </md-card-header>
          <div class="md-layout-item md-size-200 text-left">
            <md-button class="md-raised md-sucess" to="post/">Tạo</md-button>
          </div>
          <md-card-content>
            <simple-table
              table-header-color="green"
              :postsData="postsData"
              :page="page"
              :total="total"
            ></simple-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleTable, OrderedTable } from "@/components";
import Vue from "vue";

export default {
  name: "table-list",

  components: {
    // OrderedTable,
    SimpleTable
  },

  data: () => ({
    postsData: null,
    page: 1,
    total: 0
  }),

  mounted() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log("fetchData id", this.$route.params, this.$route.query);
      this.error = this.post = null;
      this.loading = true;

      let page =
        this.$route.query && this.$route.query.page
          ? this.$route.query.page
          : 1;
      this.page = page;
      Vue.axios
        .get(`http://ghtk-testtt.com/posts/?page=${page}`)
        .then(response => {
          this.postsData = response.data.data;
          this.total = response.data.total || 0;
          console.log("fetchData done", response.data);
        });
    },
  },
};
</script>
