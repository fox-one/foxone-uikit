import "./FSliderTabs.scss";
import { Component, Vue, Watch, Model, Prop } from "vue-property-decorator";
import { CreateElement, VNode } from "vue/types/umd";
import { VTabs } from "vuetify/lib";

@Component
class FSliderTabs extends Vue {
  @Model("change") value!: number;

  @Prop({ default: "", type: String }) color!: string;

  mounted() {
    this.setSliderPosition();
  }

  @Watch("value")
  handleValueChange() {
    this.setSliderPosition();
  }

  setSliderPosition() {
    this.$nextTick(() => {
      const tabs: any = this.$refs.tabs;
      const slider: any = this.$refs.slider;
      if (!tabs || !slider) {
        return;
      }
      const activeTab = tabs.$el.querySelector(
        `.v-tab[data-value="${this.value}"]`,
      );
      if (!activeTab) {
        slider.style.display = "none";
        return;
      }
      const left = activeTab.offsetLeft;
      const width = activeTab.clientWidth;
      const sliderWidth = 6;
      const sliderLeft = (left + (width - sliderWidth) / 2).toFixed();
      slider.style.left = `${sliderLeft}px`;
    });
  }

  render(h: CreateElement): VNode {
    const defaultColor = (this as any).$vuetify.theme.dark ? "#fff" : "#000";
    const color = this.color || defaultColor;

    return h(
      VTabs,
      {
        staticClass: "f-slider-tabs",
        on: this.$listeners,
        attrs: this.$attrs,
        ref: "tabs",
        props: {
          color,
          hideSlider: true,
          backgroundColor: "transparent",
          value: this.value,
          ...this.$attrs,
        },
      },
      [
        this.$slots.tabs,
        h("div", {
          staticClass: "f-slider-tabs__slider",
          ref: "slider",
        }),
      ],
    );
  }
}

export default FSliderTabs;
export { FSliderTabs };
