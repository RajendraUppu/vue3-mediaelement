import Mediaelement from "./components/mediaelement.vue";
export default {
  install: (app: any, options: any) => {
    app.component("Mediaelement", Mediaelement);
  },
};
