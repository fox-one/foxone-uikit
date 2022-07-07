import Toast, { ToastMethods } from "./utils/toast";
import Dialog, { DialogMethods } from "./utils/dialog";
import Auth, { AuthMethods } from "./utils/auth";
import Payment, { PaymentMethods } from "./utils/payment";
import Passport, { PassportMethods } from "./utils/passport";

import type { VueConstructor } from "vue/types/umd";
import type { GlobalVuetifyPreset } from "vuetify/types/services/presets";

declare const _default: {
  install: (Vue: VueConstructor) => void;
  preset: GlobalVuetifyPreset;
  Toast: typeof Toast;
  Dialog: typeof Dialog;
  Auth: typeof Auth;
  Payment: typeof Payment;
  Passport: typeof Passport;
};
export default _default;

declare module "vue/types/vue" {
  interface Vue {
    $uikit: {
      dialog: DialogMethods;
      toast: ToastMethods;
      auth: AuthMethods;
      payment: PaymentMethods;
      passport: PassportMethods;
    };
  }
}
