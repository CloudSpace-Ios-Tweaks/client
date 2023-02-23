import { n as get_store_value, o as onDestroy, c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_attribute_value, d as escape_object, f as add_attribute, i as is_void, v as validate_component, m as missing_component } from "./index2.js";
import { w as writable } from "./index.js";
function cls() {
  const classes = [];
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  args.forEach((arg) => {
    if (typeof arg === "object" && arg.constructor === Object) {
      Object.keys(arg).forEach((key) => {
        if (arg[key])
          classes.push(key);
      });
    } else if (Array.isArray(arg)) {
      classes.push(...arg);
    } else if (typeof arg === "function") {
      classes.push(arg());
    } else if (arg && arg.value) {
      classes.push(arg.value);
    } else if (arg)
      classes.push(arg);
  });
  const uniqueClasses = [];
  classes.forEach((c) => {
    if (uniqueClasses.indexOf(c) < 0)
      uniqueClasses.push(c);
  });
  return uniqueClasses.filter((c) => !!c).join(" ");
}
const positionClass = function(position, className) {
  if (className === void 0) {
    className = "";
  }
  if (!className || typeof className !== "string")
    return position;
  const classes = ["static", "relative", "absolute", "fixed", "sticky"];
  const hasPositionClass = classes.filter((c) => className.indexOf(c) >= 0).length > 0;
  return hasPositionClass ? "" : position;
};
const KonstaStore = writable({
  theme: "material",
  dark: true,
  touchRipple: true
});
const propClasses = (classesObj, theme, state) => {
  if (typeof classesObj === "string")
    return classesObj;
  const arr = [classesObj.common, classesObj[theme]];
  if (state && classesObj[state]) {
    if (typeof classesObj[state] === "string")
      arr.push(classesObj[state]);
    else {
      arr.push(classesObj[state].common, classesObj[state][theme]);
    }
  }
  return arr;
};
const themeClasses = (classesObj, theme, addBaseClassName) => {
  const c = {};
  const themeSubKeys = ["common", "ios", "material"];
  Object.keys(classesObj).forEach((key) => {
    const addBaseClass = key === "base" ? addBaseClassName : "";
    const hasStates = typeof classesObj[key] !== "string" && Object.keys(classesObj[key]).filter(
      (state) => !themeSubKeys.includes(state)
    ).length > 0;
    if (!hasStates) {
      c[key] = cls(propClasses(classesObj[key], theme), addBaseClass);
      return;
    }
    c[key] = {};
    const defaultStateClasses = propClasses(classesObj[key], theme);
    c[key].default = cls(defaultStateClasses, addBaseClass);
    Object.keys(classesObj[key]).filter((state) => !themeSubKeys.includes(state)).forEach((state) => {
      c[key][state] = cls(
        defaultStateClasses,
        propClasses(classesObj[key], theme, state),
        addBaseClass
      );
    });
  });
  return c;
};
const useThemeClasses = (props, classesObj, addBaseClassName = "", cb) => {
  let theme = get_store_value(KonstaStore).theme;
  const calcClasses = () => {
    return themeClasses(
      typeof classesObj === "function" ? classesObj() : classesObj,
      theme,
      addBaseClassName
    );
  };
  if (props.ios)
    theme = "ios";
  else if (props.material)
    theme = "material";
  else {
    KonstaStore.subscribe((context) => {
      theme = context.theme || "ios";
      if (cb) {
        cb(calcClasses());
      }
    });
  }
  return calcClasses();
};
const useTheme = (props, cb) => {
  let ios;
  let material;
  if (typeof props === "function") {
    cb = props;
    props = {};
  } else {
    ios = props.ios;
    material = props.material;
  }
  const calcTheme = (ctx) => {
    let theme = ctx.theme || "ios";
    if (ios)
      theme = "ios";
    if (material)
      theme = "material";
    return theme;
  };
  if (cb) {
    KonstaStore.subscribe((newValue) => {
      cb(calcTheme(newValue));
    });
  }
  return calcTheme(get_store_value(KonstaStore));
};
const useDarkClasses = () => {
  return (classNames) => {
    const context = get_store_value(KonstaStore);
    if (!context.dark)
      return "";
    return classNames;
  };
};
class TouchRipple {
  constructor(el, x, y) {
    const ripple = this;
    if (!el)
      return void 0;
    ripple.el = el;
    const {
      left,
      top,
      width,
      height
    } = el.getBoundingClientRect();
    const center = {
      x: x - left,
      y: y - top
    };
    let diameter = Math.max((height ** 2 + width ** 2) ** 0.5, 48);
    const isInset = el.classList.contains("k-touch-ripple-inset");
    if (isInset) {
      diameter = Math.max(Math.min(width, height), 48);
    }
    const isOverflowHidden = typeof window !== "undefined" && window.getComputedStyle(el, null).getPropertyValue("overflow") === "hidden";
    if (!isInset && isOverflowHidden) {
      const distanceFromCenter = ((center.x - width / 2) ** 2 + (center.y - height / 2) ** 2) ** 0.5;
      const scale = (diameter / 2 + distanceFromCenter) / (diameter / 2);
      ripple.rippleTransform = `translate3d(0px, 0px, 0) scale(${scale})`;
    } else {
      ripple.rippleTransform = `translate3d(${-center.x + width / 2}px, ${-center.y + height / 2}px, 0) scale(1)`;
    }
    ripple.rippleWaveEl = document.createElement("span");
    ripple.rippleWaveEl.classList.add("k-touch-ripple-wave");
    ripple.rippleWaveEl.setAttribute("hidden", "");
    ripple.rippleWaveEl.style = `
      width: ${diameter}px;
      height: ${diameter}px;
      margin-top:-${diameter / 2}px;
      margin-left:-${diameter / 2}px;
      left:${center.x}px;
      top:${center.y}px; --k-ripple-transform: ${ripple.rippleTransform}`;
    el.insertAdjacentElement("afterbegin", ripple.rippleWaveEl);
    const animationEnd = () => {
      ripple.rippleWaveEl.removeEventListener("animationend", animationEnd);
      if (!ripple.rippleWaveEl)
        return;
      if (ripple.rippleWaveEl.classList.contains("k-touch-ripple-wave-out"))
        return;
      ripple.rippleWaveEl.classList.add("k-touch-ripple-wave-in");
      if (ripple.shouldBeRemoved) {
        ripple.out();
      }
    };
    ripple.rippleWaveEl.addEventListener("animationend", animationEnd);
    return ripple;
  }
  destroy() {
    let ripple = this;
    if (ripple.rippleWaveEl) {
      ripple.el.removeChild(ripple.rippleWaveEl);
    }
    Object.keys(ripple).forEach((key) => {
      ripple[key] = null;
      delete ripple[key];
    });
    ripple = null;
  }
  out() {
    const ripple = this;
    const {
      rippleWaveEl
    } = this;
    clearTimeout(ripple.removeTimeout);
    rippleWaveEl.classList.add("k-touch-ripple-wave-out");
    ripple.removeTimeout = setTimeout(() => {
      ripple.destroy();
    }, 300);
    const animationEnd = () => {
      ripple.rippleWaveEl.removeEventListener("animationend", animationEnd);
      clearTimeout(ripple.removeTimeout);
      ripple.destroy();
    };
    ripple.rippleWaveEl.addEventListener("animationend", animationEnd);
  }
  remove() {
    const ripple = this;
    if (ripple.shouldBeRemoved)
      return;
    ripple.removeTimeout = setTimeout(() => {
      ripple.destroy();
    }, 400);
    ripple.shouldBeRemoved = true;
    if (ripple.rippleWaveEl.classList.contains("k-touch-ripple-wave-in")) {
      ripple.out();
    }
  }
}
const useTouchRipple = (el, touchRipple, eventsEl) => {
  if (!eventsEl)
    eventsEl = el;
  const needsTouchRipple = () => {
    return touchRipple && get_store_value(KonstaStore).theme === "material" && get_store_value(KonstaStore).touchRipple;
  };
  let ripple = null;
  const removeRipple = () => {
    if (ripple)
      ripple.remove();
    ripple = null;
  };
  const onPointerDown = (e) => {
    ripple = new TouchRipple(el.current, e.pageX, e.pageY);
  };
  const onPointerMove = () => {
    removeRipple();
  };
  const onPointerUp = () => {
    removeRipple();
  };
  const attachEvents = () => {
    if (!eventsEl || !eventsEl.current || !eventsEl.current.addEventListener || !needsTouchRipple() || eventsEl.__touchRippleAttached__)
      return;
    eventsEl.__touchRippleAttached__ = true;
    eventsEl.current.addEventListener("pointerdown", onPointerDown);
    eventsEl.current.addEventListener("pointermove", onPointerMove);
    eventsEl.current.addEventListener("pointerup", onPointerUp);
    eventsEl.current.addEventListener("pointercancel", onPointerUp);
    eventsEl.current.addEventListener("contextmenu", onPointerUp);
  };
  const detachEvents = (deleteFlag) => {
    if (!eventsEl || !eventsEl.current || !eventsEl.current.addEventListener)
      return;
    if (deleteFlag) {
      delete eventsEl.__touchRippleAttached__;
    }
    eventsEl.current.removeEventListener("pointerdown", onPointerDown);
    eventsEl.current.removeEventListener("pointermove", onPointerMove);
    eventsEl.current.removeEventListener("pointerup", onPointerUp);
    eventsEl.current.removeEventListener("pointercancel", onPointerUp);
    eventsEl.current.removeEventListener("contextmenu", onPointerUp);
  };
  onDestroy(() => {
    detachEvents(true);
  });
  KonstaStore.subscribe(() => {
    if (!needsTouchRipple()) {
      detachEvents();
    } else {
      detachEvents();
      attachEvents();
    }
  });
};
const BlockClasses = (props, colors, classes) => {
  const {
    inset,
    nested,
    margin,
    padding,
    strong,
    outline
  } = props;
  return {
    base: {
      common: cls(`text-sm z-10`, positionClass("relative", classes), !inset && !nested && outline && "hairline-t hairline-b", inset && outline && "border", inset && "px-4", !inset && "pl-4-safe pr-4-safe", !nested && margin, (strong || outline) && padding),
      ios: cls(colors.textIos, strong && colors.strongBgIos, inset && outline && colors.outlineIos),
      material: cls(colors.textMaterial, strong && colors.strongBgMaterial, inset && outline && colors.outlineMaterial)
    },
    inset: {
      common: `ml-4-safe mr-4-safe overflow-hidden`,
      ios: `rounded-lg`,
      material: `rounded-2xl`
    }
  };
};
const BlockColors = function(colorsProp, dark) {
  if (colorsProp === void 0) {
    colorsProp = {};
  }
  return {
    outlineIos: cls("border-black border-opacity-20", dark("dark:border-white dark:border-opacity-15")),
    outlineMaterial: cls("border-md-light-outline", dark("border-md-dark-outline")),
    strongBgIos: cls(`bg-ios-light-surface-1`, dark("dark:bg-ios-dark-surface-1")),
    strongBgMaterial: cls("bg-md-light-surface-1", dark("dark:bg-md-dark-surface-1")),
    textIos: "",
    textMaterial: cls("text-md-light-on-surface", dark("dark:text-md-dark-on-surface")),
    ...colorsProp
  };
};
const Block = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isStrong;
  let isOutline;
  let isInset;
  let colors;
  let c;
  let classes;
  let $$restProps = compute_rest_props($$props, [
    "class",
    "colors",
    "ios",
    "material",
    "margin",
    "padding",
    "inset",
    "insetIos",
    "insetMaterial",
    "strong",
    "strongIos",
    "strongMaterial",
    "outline",
    "outlineIos",
    "outlineMaterial",
    "nested"
  ]);
  let { class: className = void 0 } = $$props;
  let { colors: colorsProp = void 0 } = $$props;
  let { ios = void 0 } = $$props;
  let { material = void 0 } = $$props;
  let { margin = "my-8" } = $$props;
  let { padding = "py-4" } = $$props;
  let { inset = void 0 } = $$props;
  let { insetIos = false } = $$props;
  let { insetMaterial = false } = $$props;
  let { strong = void 0 } = $$props;
  let { strongIos = false } = $$props;
  let { strongMaterial = false } = $$props;
  let { outline = void 0 } = $$props;
  let { outlineIos = false } = $$props;
  let { outlineMaterial = false } = $$props;
  let { nested = void 0 } = $$props;
  let theme;
  theme = useTheme({}, (v) => theme = v);
  const dark = useDarkClasses();
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.colors === void 0 && $$bindings.colors && colorsProp !== void 0)
    $$bindings.colors(colorsProp);
  if ($$props.ios === void 0 && $$bindings.ios && ios !== void 0)
    $$bindings.ios(ios);
  if ($$props.material === void 0 && $$bindings.material && material !== void 0)
    $$bindings.material(material);
  if ($$props.margin === void 0 && $$bindings.margin && margin !== void 0)
    $$bindings.margin(margin);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.inset === void 0 && $$bindings.inset && inset !== void 0)
    $$bindings.inset(inset);
  if ($$props.insetIos === void 0 && $$bindings.insetIos && insetIos !== void 0)
    $$bindings.insetIos(insetIos);
  if ($$props.insetMaterial === void 0 && $$bindings.insetMaterial && insetMaterial !== void 0)
    $$bindings.insetMaterial(insetMaterial);
  if ($$props.strong === void 0 && $$bindings.strong && strong !== void 0)
    $$bindings.strong(strong);
  if ($$props.strongIos === void 0 && $$bindings.strongIos && strongIos !== void 0)
    $$bindings.strongIos(strongIos);
  if ($$props.strongMaterial === void 0 && $$bindings.strongMaterial && strongMaterial !== void 0)
    $$bindings.strongMaterial(strongMaterial);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.outlineIos === void 0 && $$bindings.outlineIos && outlineIos !== void 0)
    $$bindings.outlineIos(outlineIos);
  if ($$props.outlineMaterial === void 0 && $$bindings.outlineMaterial && outlineMaterial !== void 0)
    $$bindings.outlineMaterial(outlineMaterial);
  if ($$props.nested === void 0 && $$bindings.nested && nested !== void 0)
    $$bindings.nested(nested);
  isStrong = typeof strong === "undefined" ? theme === "ios" ? strongIos : strongMaterial : strong;
  isOutline = typeof outline === "undefined" ? theme === "ios" ? outlineIos : outlineMaterial : outline;
  isInset = typeof inset === "undefined" ? theme === "ios" ? insetIos : insetMaterial : inset;
  colors = BlockColors(colorsProp, dark);
  c = useThemeClasses(
    { ios, material },
    BlockClasses(
      {
        margin,
        padding,
        nested,
        inset: isInset,
        outline: isOutline,
        strong: isStrong
      },
      colors,
      className
    ),
    "",
    (v) => c = v
  );
  classes = cls(
    // base
    c.base,
    // inset
    isInset && c.inset,
    className
  );
  return `<div${spread([{ class: escape_attribute_value(classes) }, escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</div>`;
});
const ButtonClasses = (props, colors, classes, darkClasses) => {
  const {
    inline,
    segmented,
    segmentedStrong,
    segmentedActive,
    disabled
  } = props;
  return {
    base: {
      common: cls("flex text-center justify-center items-center appearance-none py-1 transition-colors focus:outline-none cursor-pointer select-none overflow-hidden z-10", inline ? "inline-flex" : "w-full flex", positionClass("relative", classes), disabled && "pointer-events-none", segmentedStrong && segmentedActive && "k-segmented-strong-button-active"),
      ios: `uppercase duration-100 font-semibold px-2`,
      material: `duration-300 font-medium px-4`,
      square: {
        ios: segmented && !segmentedStrong ? "first:rounded-l last:rounded-r" : "rounded",
        material: segmented && !segmentedStrong ? "first:rounded-lg-l last:rounded-lg-r" : "rounded-lg"
      },
      rounded: segmented && !segmentedStrong ? "" : "rounded-full"
    },
    style: {
      fill: {
        common: cls(disabled && cls(colors.disabledBg, colors.disabledText)),
        ios: cls(disabled ? cls(colors.disabledBg, colors.disabledText) : `${colors.fillTextIos} ${colors.fillBgIos} ${colors.fillActiveBgIos}`),
        material: cls(disabled ? cls(colors.disabledBg, colors.disabledText) : cls(colors.fillTextMaterial, colors.fillBgMaterial, colors.fillActiveBgMaterial, colors.fillTouchRipple))
      },
      outline: {
        common: cls(disabled ? cls(colors.disabledText, colors.disabledBorder) : cls("active:bg-opacity-15", colors.touchRipple)),
        ios: cls(!segmented && "border-2", !disabled && !segmented && colors.outlineBorderIos, !disabled && cls(colors.textIos, colors.activeBgIos)),
        material: cls(!segmented && "border", !disabled && !segmented && colors.outlineBorderMaterial, !disabled && cls(colors.textMaterial, colors.activeBgMaterial))
      },
      clear: {
        common: cls(disabled ? colors.disabledText : `active:bg-opacity-15 ${colors.touchRipple}`),
        ios: !disabled && cls(colors.textIos, colors.activeBgIos),
        material: !disabled && cls(colors.textMaterial, colors.activeBgMaterial)
      },
      tonal: {
        common: disabled ? cls(colors.disabledBg, colors.disabledText) : cls(colors.touchRipple),
        ios: !disabled && cls(colors.tonalTextIos, colors.tonalBgIos, colors.activeBgIos, "bg-opacity-15 active:bg-opacity-25"),
        material: !disabled && cls(colors.tonalTextMaterial, colors.tonalBgMaterial, colors.activeBgMaterial)
      },
      segmentedStrong: cls(`active:bg-black active:bg-opacity-10`, darkClasses("dark:active:bg-white dark:active:bg-opacity-5 dark:touch-ripple-white")),
      segmentedStrongActive: "duration-0"
    },
    size: {
      small: {
        ios: `text-xs h-7`,
        material: `text-sm h-8`
      },
      medium: {
        common: "text-sm",
        ios: `h-7`,
        material: `h-10`
      },
      large: {
        ios: `h-11`,
        material: `h-12`
      }
    },
    raised: `shadow active:shadow-lg`
  };
};
const ButtonColors = function(colorsProp, dark) {
  if (colorsProp === void 0) {
    colorsProp = {};
  }
  return {
    activeBgIos: "active:bg-primary",
    activeBgMaterial: "",
    textIos: "text-primary",
    textMaterial: cls("text-md-light-primary", "dark:text-md-dark-primary"),
    fillTextIos: cls("text-white"),
    fillTextMaterial: cls("text-md-light-on-primary", dark("dark:text-md-dark-on-primary")),
    fillActiveBgIos: "active:bg-ios-primary-shade",
    fillActiveBgMaterial: "",
    fillBgIos: "bg-primary",
    fillBgMaterial: cls("bg-md-light-primary", dark("dark:bg-md-dark-primary")),
    fillTouchRipple: cls("touch-ripple-white", "dark:touch-ripple-primary"),
    outlineBorderIos: "border-primary",
    outlineBorderMaterial: cls("border-md-light-outline", dark("dark:border-md-dark-outline")),
    tonalBgIos: "bg-primary",
    tonalBgMaterial: cls("bg-md-light-secondary-container", dark("dark:bg-md-dark-secondary-container")),
    tonalTextIos: "text-primary",
    tonalTextMaterial: cls("text-md-light-on-secondary-container", dark("dark:text-md-dark-on-secondary-container")),
    touchRipple: "touch-ripple-primary",
    disabledText: cls("text-black text-opacity-30", dark("dark:text-white dark:text-opacity-30")),
    disabledBg: cls("bg-black bg-opacity-10", dark("dark:bg-white dark:bg-opacity-10")),
    disabledBorder: cls("border-black border-opacity-10", dark("dark:border-white dark:border-opacity-10")),
    ...colorsProp
  };
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let isOutline;
  let isClear;
  let isTonal;
  let isRounded;
  let isSmall;
  let isLarge;
  let isRaised;
  let size;
  let style;
  let colors;
  let c;
  let classes;
  let $$restProps = compute_rest_props($$props, [
    "class",
    "colors",
    "ios",
    "material",
    "component",
    "href",
    "disabled",
    "outline",
    "outlineIos",
    "outlineMaterial",
    "clear",
    "clearIos",
    "clearMaterial",
    "tonal",
    "tonalIos",
    "tonalMaterial",
    "rounded",
    "roundedIos",
    "roundedMaterial",
    "small",
    "smallIos",
    "smallMaterial",
    "large",
    "largeIos",
    "largeMaterial",
    "raised",
    "raisedIos",
    "raisedMaterial",
    "inline",
    "segmented",
    "segmentedStrong",
    "segmentedActive",
    "touchRipple",
    "onClick"
  ]);
  let { class: className = void 0 } = $$props;
  let { colors: colorsProp = void 0 } = $$props;
  let { ios = void 0 } = $$props;
  let { material = void 0 } = $$props;
  let { component = "button" } = $$props;
  let { href = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { outline = void 0 } = $$props;
  let { outlineIos = void 0 } = $$props;
  let { outlineMaterial = void 0 } = $$props;
  let { clear = void 0 } = $$props;
  let { clearIos = void 0 } = $$props;
  let { clearMaterial = void 0 } = $$props;
  let { tonal = void 0 } = $$props;
  let { tonalIos = void 0 } = $$props;
  let { tonalMaterial = void 0 } = $$props;
  let { rounded = void 0 } = $$props;
  let { roundedIos = void 0 } = $$props;
  let { roundedMaterial = void 0 } = $$props;
  let { small = void 0 } = $$props;
  let { smallIos = void 0 } = $$props;
  let { smallMaterial = void 0 } = $$props;
  let { large = void 0 } = $$props;
  let { largeIos = void 0 } = $$props;
  let { largeMaterial = void 0 } = $$props;
  let { raised = void 0 } = $$props;
  let { raisedIos = void 0 } = $$props;
  let { raisedMaterial = void 0 } = $$props;
  let { inline = false } = $$props;
  let { segmented = false } = $$props;
  let { segmentedStrong = false } = $$props;
  let { segmentedActive = false } = $$props;
  let { touchRipple = true } = $$props;
  let { onClick = void 0 } = $$props;
  let theme;
  theme = useTheme({}, (v) => theme = v);
  const rippleEl = { current: null };
  const dark = useDarkClasses();
  const getStyle = (isOutline2, isClear2, isTonal2, segmented2, segmentedActive2, segmentedStrong2) => {
    let s = isOutline2 ? "outline" : isClear2 || segmented2 && !segmentedActive2 ? "clear" : isTonal2 ? "tonal" : "fill";
    if (segmentedStrong2)
      s = "segmentedStrong";
    if (segmentedStrong2 && segmentedActive2)
      s = "segmentedStrongActive";
    return s;
  };
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.colors === void 0 && $$bindings.colors && colorsProp !== void 0)
    $$bindings.colors(colorsProp);
  if ($$props.ios === void 0 && $$bindings.ios && ios !== void 0)
    $$bindings.ios(ios);
  if ($$props.material === void 0 && $$bindings.material && material !== void 0)
    $$bindings.material(material);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.outlineIos === void 0 && $$bindings.outlineIos && outlineIos !== void 0)
    $$bindings.outlineIos(outlineIos);
  if ($$props.outlineMaterial === void 0 && $$bindings.outlineMaterial && outlineMaterial !== void 0)
    $$bindings.outlineMaterial(outlineMaterial);
  if ($$props.clear === void 0 && $$bindings.clear && clear !== void 0)
    $$bindings.clear(clear);
  if ($$props.clearIos === void 0 && $$bindings.clearIos && clearIos !== void 0)
    $$bindings.clearIos(clearIos);
  if ($$props.clearMaterial === void 0 && $$bindings.clearMaterial && clearMaterial !== void 0)
    $$bindings.clearMaterial(clearMaterial);
  if ($$props.tonal === void 0 && $$bindings.tonal && tonal !== void 0)
    $$bindings.tonal(tonal);
  if ($$props.tonalIos === void 0 && $$bindings.tonalIos && tonalIos !== void 0)
    $$bindings.tonalIos(tonalIos);
  if ($$props.tonalMaterial === void 0 && $$bindings.tonalMaterial && tonalMaterial !== void 0)
    $$bindings.tonalMaterial(tonalMaterial);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.roundedIos === void 0 && $$bindings.roundedIos && roundedIos !== void 0)
    $$bindings.roundedIos(roundedIos);
  if ($$props.roundedMaterial === void 0 && $$bindings.roundedMaterial && roundedMaterial !== void 0)
    $$bindings.roundedMaterial(roundedMaterial);
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  if ($$props.smallIos === void 0 && $$bindings.smallIos && smallIos !== void 0)
    $$bindings.smallIos(smallIos);
  if ($$props.smallMaterial === void 0 && $$bindings.smallMaterial && smallMaterial !== void 0)
    $$bindings.smallMaterial(smallMaterial);
  if ($$props.large === void 0 && $$bindings.large && large !== void 0)
    $$bindings.large(large);
  if ($$props.largeIos === void 0 && $$bindings.largeIos && largeIos !== void 0)
    $$bindings.largeIos(largeIos);
  if ($$props.largeMaterial === void 0 && $$bindings.largeMaterial && largeMaterial !== void 0)
    $$bindings.largeMaterial(largeMaterial);
  if ($$props.raised === void 0 && $$bindings.raised && raised !== void 0)
    $$bindings.raised(raised);
  if ($$props.raisedIos === void 0 && $$bindings.raisedIos && raisedIos !== void 0)
    $$bindings.raisedIos(raisedIos);
  if ($$props.raisedMaterial === void 0 && $$bindings.raisedMaterial && raisedMaterial !== void 0)
    $$bindings.raisedMaterial(raisedMaterial);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.segmented === void 0 && $$bindings.segmented && segmented !== void 0)
    $$bindings.segmented(segmented);
  if ($$props.segmentedStrong === void 0 && $$bindings.segmentedStrong && segmentedStrong !== void 0)
    $$bindings.segmentedStrong(segmentedStrong);
  if ($$props.segmentedActive === void 0 && $$bindings.segmentedActive && segmentedActive !== void 0)
    $$bindings.segmentedActive(segmentedActive);
  if ($$props.touchRipple === void 0 && $$bindings.touchRipple && touchRipple !== void 0)
    $$bindings.touchRipple(touchRipple);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    attrs = { href, ...$$restProps };
    {
      useTouchRipple(rippleEl, touchRipple);
    }
    isOutline = typeof outline === "undefined" ? theme === "ios" ? outlineIos : outlineMaterial : outline;
    isClear = typeof clear === "undefined" ? theme === "ios" ? clearIos : clearMaterial : clear;
    isTonal = typeof tonal === "undefined" ? theme === "ios" ? tonalIos : tonalMaterial : tonal;
    isRounded = typeof rounded === "undefined" ? theme === "ios" ? roundedIos : roundedMaterial : rounded;
    isSmall = typeof small === "undefined" ? theme === "ios" ? smallIos : smallMaterial : small;
    isLarge = typeof large === "undefined" ? theme === "ios" ? largeIos : largeMaterial : large;
    isRaised = typeof raised === "undefined" ? theme === "ios" ? raisedIos : raisedMaterial : raised;
    size = isLarge ? "large" : isSmall ? "small" : "medium";
    style = getStyle(isOutline, isClear, isTonal, segmented, segmentedActive, segmentedStrong);
    colors = ButtonColors(colorsProp, dark);
    c = useThemeClasses(
      { ios, material },
      ButtonClasses(
        {
          inline,
          segmented,
          segmentedStrong,
          segmentedActive,
          disabled,
          outline: isOutline,
          clear: isClear,
          tonal: isTonal,
          rounded: isRounded,
          small: isSmall,
          large: isLarge,
          raised: isRaised
        },
        colors,
        className,
        dark
      ),
      "",
      (v) => c = v
    );
    classes = cls(
      c.base[isRounded ? "rounded" : "square"],
      // style
      c.style[style],
      // size
      c.size[size],
      isRaised && c.raised,
      className
    );
    $$rendered = `${typeof component === "string" ? `${((tag) => {
      return tag ? `<${component}${spread(
        [
          { class: escape_attribute_value(classes) },
          { disabled: disabled || null },
          escape_object(attrs)
        ],
        {}
      )}${add_attribute("this", rippleEl.current, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
    })(component)}` : `${validate_component(component || missing_component, "svelte:component").$$render(
      $$result,
      Object.assign({}, { class: classes }, { disabled }, attrs, { this: rippleEl.current }),
      {
        this: ($$value) => {
          rippleEl.current = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Block as B,
  KonstaStore as K,
  useTouchRipple as a,
  useThemeClasses as b,
  cls as c,
  useDarkClasses as d,
  Button as e,
  positionClass as p,
  useTheme as u
};
