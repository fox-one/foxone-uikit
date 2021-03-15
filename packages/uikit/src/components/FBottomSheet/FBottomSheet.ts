import "./FBottomSheet.scss";
import { Vue, Component, Model } from "vue-property-decorator";
import { CreateElement, VNode } from "vue/types/umd";
import { VBottomSheet, VCard, VCardTitle, VCardText, VIcon } from "vuetify/lib";
import { mdiClose } from "@mdi/js";

@Component({
  inheritAttrs: false,
})
class FBottomSheet extends Vue {
  @Model("change") value!: boolean;

  genTitle() {
    if (!this.$slots.title) return null;
    return this.$createElement(
      VCardTitle,
      { staticClass: "f-bottom-sheet__title subtitle-1" },
      this.$slots.title,
    );
  }

  genSubheader() {
    if (!this.$slots.subheader) return null;
    return this.$createElement(
      VCardText,
      { staticClass: "px-3" },
      this.$slots.subheader,
    );
  }

  render(h: CreateElement): VNode {
    const activator = this.$scopedSlots.activator;

    return h(
      VBottomSheet,
      {
        attrs: this.$attrs,
        props: {
          value: this.value,
          scrollable: false,
          "content-class": "f-bottom-sheet",
        },
        on: {
          input: (val) => {
            this.$emit("change", val);
          },
        },
        scopedSlots: {
          activator: ({ on }) => {
            return (activator && activator({ on })) || null;
          },
        },
      },
      [
        h(
          VCard,
          {
            staticClass: "f-bottom-sheet__content",
            props: { elevation: 0 },
          },
          [
            this.genTitle(),
            this.genSubheader(),
            !this.$attrs.persistent
              ? h(
                  VIcon,
                  {
                    props: { size: 18 },
                    on: { click: () => this.$emit("change", false) },
                    staticClass: "f-bottom-sheet__close",
                  },
                  [mdiClose],
                )
              : null,
            h(
              VCardText,
              { staticClass: "f-bottom-sheet__body px-0" },
              this.$slots.default,
            ),
          ],
        ),
      ],
    );
  }
}

export default FBottomSheet;
export { FBottomSheet };
