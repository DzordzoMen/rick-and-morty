declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.graphql" {
  const content: DocumentNode;
  export default content;
}
