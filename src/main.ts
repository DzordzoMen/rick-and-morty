import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import VueApollo from "vue-apollo";

const httpLink = createHttpLink({
  uri: "https://rickandmortyapi.com/graphql"
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
