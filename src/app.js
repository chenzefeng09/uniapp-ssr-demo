import Vue from "vue";

export function createApp (options={}) {
  const app = new Vue({
    ...options
  })
  return { app }
}
