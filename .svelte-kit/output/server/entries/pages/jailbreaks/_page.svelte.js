import { c as create_ssr_component, v as validate_component } from "../../../chunks/index2.js";
import { B as Block } from "../../../chunks/Button.js";
import { A as Apps } from "../../../chunks/apps.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `t

${validate_component(Block, "Block").$$render($$result, { outline: true }, {}, {
    default: () => {
      return `${validate_component(Apps, "Apps").$$render($$result, { type: "jailbreaks" }, {}, {})}`;
    }
  })}`;
});
export {
  Page_1 as default
};
