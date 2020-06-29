<template>
  <div>
    <md-table v-if="postsData && postsData.length" v-model="postsData">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.Post.id }}</md-table-cell>
        <md-table-cell md-label="title">{{ item.Post.title }}</md-table-cell>
        <md-table-cell md-label="body">{{ item.Post.body }}</md-table-cell>
        <md-table-cell md-label="created">{{
          item.Post.created
        }}</md-table-cell>
        <md-table-cell md-label="edit">
          <router-link :to="{ path: 'post/' + item.Post.id }">
            <div class="md-elevation-1">
              <md-icon>create</md-icon>
              <md-tooltip md-delay="50" md-direction="top"
                >chỉnh sửa</md-tooltip
              >
            </div>
          </router-link>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div class="md-layout-nowrapmd-layout">
      <div class="md-layout-item md-layout md-alignment-center-right ">
        <router-link
          @click="
            e => {
              $emit('pageChange', parseInt(page) - 1);
            }
          "
          v-if="total && page > 1"
          :to="{ path: 'table', query: { page: parseInt(page) - 1 } }"
          exact
        >
          <div class="md-layout-item md-elevation-1">
            {{ parseInt(page) - 1 }}
          </div>
        </router-link>
        <router-link :to="{ path: 'table', query: { page } }">
          <div class="md-layout-item md-size-130 md-elevation-1">
            {{ page }}
          </div>
        </router-link>
        <router-link
          @click="
            e => {
              $emit('pageChange', parseInt(page) + 1);
            }
          "
          v-if="total && page < Math.ceil(total / 10)"
          :to="{ path: 'table', query: { page: parseInt(page) + 1 } }"
          exact
        >
          <div class="md-layout-item md-elevation-1">
            {{ parseInt(page) + 1 }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    postsData: {
      default: [],
    },
    page: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    // console.log("this.postsData", this.postsData)
    return {
      selected: [],
      // users: this.postsData ? this.postsData : []
    };
  },
};
</script>
<style>
.md-paging {
  display: flex;
  align-items: stretch; /* Default */
  justify-content: space-between;
  width: 400px;
  /* background: #cacaca; */
  margin: 0;
  padding: 0;
}
.md-paging {
  display: flex;
  align-items: stretch; /* Default */
  justify-content: space-between;
  margin: 0;
  padding: 0;
}
</style>
