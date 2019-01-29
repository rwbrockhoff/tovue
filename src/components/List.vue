<template>
  <div>
    <div v-for="(todo, i) in displayList" :key="i">
      <li class="todo-item">
        <input class="checkitem" name="check" type="checkbox" @click="star({completed: i})">
        {{todo}}
        <div class="btncontainer">
          <div class="btn-group btn-group-sm" role="group" aria-label="button container">
            <button class="btn btn-light" @click="star({index: i})">
              <i class="far fa-star"/>
            </button>
            <button class="btn btn-light" @click="star({delete: i})">
              <i class="far fa-trash-alt"/>
            </button>
          </div>
        </div>
      </li>
    </div>

    <br>
    <button
      class="btn btn-light btn-sm"
      type="button"
      data-toggle="collapse"
      data-target="#collapseExample"
      aria-expanded="false"
      aria-controls="collapseExample"
      v-if="displayCompleted[0]"
    >
      Completed &thinsp;
      <span class="badge badge-primary">{{displayCompleted.length}}</span>
    </button>
    <br>
    <br>
    <div class="collapse" id="collapseExample">
      <div class="completed" v-for="(item) in displayCompleted" :key="item.todo_id">
        <li class="completeitem">{{item}}</li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "List",
  computed: mapState(["displayList", "displayCompleted"]),
  props: ["completed"],
  methods: {
    star(val) {
      this.$emit("clicked", { val });
    }
  }
};
</script>

<style>
li {
  list-style: none;
  font-size: 1em;
  margin: 1vh 1vw;
  padding: 10px 5px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  overflow: hidden;
}
div.completed {
  opacity: 0.5;
  margin: 1vh 1vw;
}
li.completeitem {
  padding-left: 20px;
}

div.btncontainer {
  position: absolute;
  right: 5vw;
}
input.checkitem {
  margin-left: 5px;
  margin-right: 10px;
}

@media (max-width: 576px) {
  li {
    padding: 15px 5px;
    font-size: 1.3em;
  }
}
</style>