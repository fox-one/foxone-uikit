import Vue from "vue";
import FAuthMethodModal from "../components/FAuthMethodModal";

import type { VueConstructor } from "vue/types/umd";
import type Vuetify from "vuetify/lib";

export interface FAuthMethodModalProps {
  fennec?: boolean;
  clientId?: string;
  scope?: string;
  isFiresbox?: boolean;
  pkce?: boolean;
}

export interface FAuthMethodModalOptions {
  checkFennec?: () => boolean;
  handleSuccess?: (...args: any) => void;
  handleError?: (...args: any) => void;
}

const FAuthMethodModalConstructor = Vue.extend(FAuthMethodModal);

function install(
  Vue: VueConstructor,
  vuetify: Vuetify,
  globalProps: FAuthMethodModalProps
) {
  let instance: any = null;

  const create = (options: FAuthMethodModalOptions) => {
    const instance = new FAuthMethodModalConstructor();
    const app = document.querySelector("[data-app]");

    Object.assign(instance, {
      ...globalProps,
      fennec: options.checkFennec?.()
    });
    instance.$vuetify = vuetify.framework;
    app?.appendChild(instance.$mount().$el);

    return instance;
  };

  const show = (options: FAuthMethodModalOptions) => {
    if (instance) return;

    instance = create(options);
    instance.show(options);
    instance.$on("close", close);
    instance.$on("auth", options.handleSuccess);
    instance.$on("error", options.handleError);
  };

  const close = () => {
    instance.$nextTick(() => {
      instance.$destroy();
      instance.$el.parentNode.removeChild(instance.$el);
      instance = null;
    });
  };

  Vue.prototype.$uikit = Vue.prototype.$uikit || {};
  Vue.prototype.$uikit.auth = { show };
}

function Toast() {}

Toast.install = install;

export default Toast;
