import { defineStore } from "pinia";

export const usePolicyStore = defineStore("policy", {
  state: () => ({
    policies: [],
  }),

  actions: {
    setPolicies(data) {
      this.policies = data;
    },

    clearPolicies() {
      this.policies = [];
    },
  },
});