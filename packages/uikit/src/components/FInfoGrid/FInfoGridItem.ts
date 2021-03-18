import "./FInfoGridItem.scss";
import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement, VNode } from "vue/types/umd";

import { VFlex, VBtn, VIcon } from "vuetify/lib";

import FTooltip from "../FTooltip";
import { mdiHelpCircle } from "@mdi/js";

@Component
class FListItem extends Vue {
  @Prop({ default: "" }) title;

  @Prop({ default: "" }) value!: any;

  @Prop({ type: String, default: "" }) valueColor!: string;

  @Prop({ type: String, default: "" }) valueCustomColor!: string;

  @Prop({ type: String, default: "" }) valueUnit!: string;

  @Prop({ type: String, default: "" }) hint!: string;

  @Prop({ type: Number, default: 0 }) index!: number;

  @Prop({ type: Number, default: 0 }) width!: number;

  @Prop({ type: Number, default: 187 }) minWidth!: number;

  @Prop({ type: Boolean, default: false }) reverse!: boolean;

  showTooltip = false;

  render(h: CreateElement): VNode {
    const data: any = [];
    const contents = [
      h(
        "div",
        {
          staticClass:
            "f-info-grid-item-title f-greyscale-3 f-caption d-flex align-center",
        },
        [
          this.title,
          this.hint
            ? h(
                FTooltip,
                {
                  props: { top: true, value: this.showTooltip },
                  on: {
                    change: (val) => {
                      this.showTooltip = val;
                    },
                  },
                  scopedSlots: {
                    activator: ({ on }) => {
                      return h(
                        VBtn,
                        {
                          props: {
                            icon: true,
                            "x-small": true,
                            ripple: false,
                            color: "greyscale-3",
                          },
                          on,
                        },
                        [
                          h(
                            VIcon,
                            { props: { size: 16, color: "greyscale_4" } },
                            [mdiHelpCircle],
                          ),
                        ],
                      );
                    },
                  },
                },
                [this.hint],
              )
            : null,
        ],
      ),
      h("i", {
        staticStyle: {
          display: "block",
        },
        staticClass: "mb-1",
      }),
      h(
        VFlex,
        {
          staticClass:
            "f-info-grid-item-value-wrapper f-greyscale-1 f-body-2 d-flex",
        },
        [
          h(
            "div",
            {
              staticClass: `f-info-grid-item-value`,
              class: this.valueColor ? `${this.valueColor}--text` : "",
              style: this.valueCustomColor
                ? { color: `${this.valueCustomColor} !important` }
                : {},
            },
            [this.value],
          ),
          this.valueUnit
            ? h(
                "div",
                { staticClass: "f-info-grid-item-value-unit" },
                this.valueUnit,
              )
            : "",
        ],
      ),
    ];

    if (this.reverse) contents.reverse();

    if (this.title || this.value) {
      data.push(
        h(VFlex, { staticClass: "f-info-grid-item-content" }, contents),
      );
    } else {
      data.push(this.$slots.default);
    }

    return h(
      "div",
      {
        staticClass: "f-info-grid-item pt-0 pl-4 pb-4",
        attrs: this.$attrs,
        props: {
          ...this.$attrs,
        },
        on: this.$listeners,
      },
      data,
    );
  }
}

export default FListItem;
export { FListItem };
