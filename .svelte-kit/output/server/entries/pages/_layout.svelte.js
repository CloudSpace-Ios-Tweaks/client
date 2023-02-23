import { c as create_ssr_component, a as compute_rest_props, v as validate_component, b as spread, e as escape_attribute_value, d as escape_object, f as add_attribute, i as is_void, o as onDestroy, g as escape, h as compute_slots } from "../../chunks/index2.js";
/* empty css                */import { c as cls, p as positionClass, K as KonstaStore, u as useTheme, a as useTouchRipple, b as useThemeClasses, d as useDarkClasses, B as Block, e as Button } from "../../chunks/Button.js";
const AppClasses = (props, currentTheme, classes) => {
  const {
    safeAreas
  } = props;
  return cls(currentTheme === "ios" && `k-ios`, currentTheme === "material" && "k-material", "k-app w-full h-full min-h-screen", safeAreas && "safe-areas", positionClass("relative", classes), classes);
};
const KonstaProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { theme } = $$props;
  let { dark = false } = $$props;
  let { touchRipple = true } = $$props;
  let { autoThemeDetection = true } = $$props;
  let currentTheme = theme;
  const updateStore = () => {
    KonstaStore.set({ theme: currentTheme, dark, touchRipple });
  };
  const calcTheme = () => {
    if (!autoThemeDetection)
      return;
    if (theme === "ios" || theme === "material") {
      if (currentTheme !== theme) {
        currentTheme = theme;
        updateStore();
      }
    } else if (currentTheme === "parent" && typeof window !== "undefined" && typeof document !== "undefined") {
      const htmlEl = document.documentElement;
      if (htmlEl) {
        if (htmlEl.classList.contains("ios")) {
          currentTheme = "ios";
          updateStore();
        } else if (htmlEl.classList.contains("md") || htmlEl.classList.contains("material")) {
          currentTheme = "material";
          updateStore();
        }
      }
    }
  };
  calcTheme();
  updateStore();
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.dark === void 0 && $$bindings.dark && dark !== void 0)
    $$bindings.dark(dark);
  if ($$props.touchRipple === void 0 && $$bindings.touchRipple && touchRipple !== void 0)
    $$bindings.touchRipple(touchRipple);
  if ($$props.autoThemeDetection === void 0 && $$bindings.autoThemeDetection && autoThemeDetection !== void 0)
    $$bindings.autoThemeDetection(autoThemeDetection);
  return `${slots.default ? slots.default({}) : ``}`;
});
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "theme", "dark", "touchRipple", "safeAreas"]);
  let { class: className = void 0 } = $$props;
  let { theme = "material" } = $$props;
  let { dark = true } = $$props;
  let { touchRipple = true } = $$props;
  let { safeAreas = true } = $$props;
  let currentTheme = theme;
  const updateStore = () => {
    KonstaStore.set({ theme: currentTheme, dark, touchRipple });
  };
  const calcTheme = () => {
    if (theme === "ios" || theme === "material") {
      if (currentTheme !== theme) {
        currentTheme = theme;
        updateStore();
      }
    } else if (currentTheme === "parent" && typeof window !== "undefined" && typeof document !== "undefined") {
      const htmlEl = document.documentElement;
      if (htmlEl) {
        if (htmlEl.classList.contains("ios")) {
          currentTheme = "ios";
          updateStore();
        } else if (htmlEl.classList.contains("md") || htmlEl.classList.contains("material")) {
          currentTheme = "material";
          updateStore();
        }
      }
    }
  };
  calcTheme();
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.dark === void 0 && $$bindings.dark && dark !== void 0)
    $$bindings.dark(dark);
  if ($$props.touchRipple === void 0 && $$bindings.touchRipple && touchRipple !== void 0)
    $$bindings.touchRipple(touchRipple);
  if ($$props.safeAreas === void 0 && $$bindings.safeAreas && safeAreas !== void 0)
    $$bindings.safeAreas(safeAreas);
  classes = AppClasses({ theme, dark, touchRipple, safeAreas }, currentTheme, className);
  return `${validate_component(KonstaProvider, "KonstaProvider").$$render(
    $$result,
    {
      theme: currentTheme,
      dark,
      touchRipple,
      autoThemeDetection: false
    },
    {},
    {
      default: () => {
        return `<div${spread([{ class: escape_attribute_value(classes) }, escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : ``}</div>`;
      }
    }
  )}`;
});
const LinkClasses = (props, _ref, classes) => {
  let {
    textColor,
    needsTouchRipple
  } = _ref;
  const {
    iconOnly,
    tabbar
  } = props;
  return {
    base: {
      common: cls(!tabbar && textColor, `inline-flex space-x-1 justify-center items-center cursor-pointer select-none`, needsTouchRipple && `touch-ripple-primary ${positionClass("relative", classes)} z-10`),
      notTabbar: {
        ios: `active:opacity-30 duration-300 active:duration-0`,
        material: needsTouchRipple ? "" : `active:opacity-55`
      }
    },
    tabbar: {
      common: cls(positionClass("relative", classes), `w-full h-full duration-300`),
      material: "font-medium text-sm z-10",
      active: "k-tabbar-link-active",
      inactive: ""
    },
    toolbar: {
      common: cls(`h-full max-h-12`, iconOnly && "k-touch-ripple-inset"),
      material: "px-3 text-sm font-medium"
    },
    navbar: {
      common: cls(`h-full max-h-12`, iconOnly && "k-touch-ripple-inset"),
      material: "px-3"
    }
  };
};
const LinkColors = function(colorsProp, dark) {
  if (colorsProp === void 0) {
    colorsProp = {};
  }
  return {
    textIos: "text-primary",
    textMaterial: cls("text-md-light-primary", dark("dark:text-md-dark-primary")),
    navbarTextIos: "text-primary",
    navbarTextMaterial: "",
    ...colorsProp
  };
};
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let needsTouchRipple;
  let colors;
  let themeTextColor;
  let textColor;
  let tabbarState;
  let c;
  let classes;
  let $$restProps = compute_rest_props($$props, [
    "class",
    "colors",
    "ios",
    "material",
    "component",
    "navbar",
    "toolbar",
    "iconOnly",
    "tabbar",
    "tabbarActive",
    "touchRipple",
    "onClick"
  ]);
  let { class: className = void 0 } = $$props;
  let { colors: colorsProp = void 0 } = $$props;
  let { ios = void 0 } = $$props;
  let { material = void 0 } = $$props;
  let { component = "a" } = $$props;
  let { navbar = false } = $$props;
  let { toolbar = false } = $$props;
  let { iconOnly = false } = $$props;
  let { tabbar = false } = $$props;
  let { tabbarActive = false } = $$props;
  let { touchRipple = true } = $$props;
  let { onClick = void 0 } = $$props;
  const rippleEl = { current: null };
  let theme;
  theme = useTheme({ ios, material }, (v) => theme = v);
  const dark = useDarkClasses();
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
  if ($$props.navbar === void 0 && $$bindings.navbar && navbar !== void 0)
    $$bindings.navbar(navbar);
  if ($$props.toolbar === void 0 && $$bindings.toolbar && toolbar !== void 0)
    $$bindings.toolbar(toolbar);
  if ($$props.iconOnly === void 0 && $$bindings.iconOnly && iconOnly !== void 0)
    $$bindings.iconOnly(iconOnly);
  if ($$props.tabbar === void 0 && $$bindings.tabbar && tabbar !== void 0)
    $$bindings.tabbar(tabbar);
  if ($$props.tabbarActive === void 0 && $$bindings.tabbarActive && tabbarActive !== void 0)
    $$bindings.tabbarActive(tabbarActive);
  if ($$props.touchRipple === void 0 && $$bindings.touchRipple && touchRipple !== void 0)
    $$bindings.touchRipple(touchRipple);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  needsTouchRipple = theme === "material" && (touchRipple || typeof touchRipple === "undefined" && (toolbar || tabbar || navbar));
  {
    useTouchRipple(rippleEl, needsTouchRipple);
  }
  colors = LinkColors(colorsProp, dark);
  themeTextColor = navbar ? theme === "material" ? colors.navbarTextMaterial : colors.navbarTextIos : theme === "material" ? colors.textMaterial : colors.textIos;
  textColor = tabbar && !tabbarActive ? colors.tabbarInactive : themeTextColor;
  tabbarState = tabbarActive ? "active" : "inactive";
  c = useThemeClasses({ ios, material }, LinkClasses({ iconOnly }, { textColor, needsTouchRipple }, className), "", (v) => c = v);
  classes = cls(
    // base
    c.base[tabbar ? "default" : "notTabbar"],
    toolbar && c.toolbar,
    navbar && c.navbar,
    tabbar && c.tabbar[tabbarState],
    className
  );
  return `
${((tag) => {
    return tag ? `<${component}${spread([{ class: escape_attribute_value(classes) }, escape_object($$restProps)], {})}${add_attribute("this", rippleEl.current, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(component)}`;
});
const NavbarClasses = (props, colors, classes) => {
  const {
    outline,
    translucent,
    large,
    medium,
    transparent,
    left,
    right,
    fontSizeIos,
    fontSizeMaterial,
    titleFontSizeIos,
    titleFontSizeMaterial,
    titleLargeFontSizeIos,
    titleLargeFontSizeMaterial,
    titleMediumFontSizeIos,
    titleMediumFontSizeMaterial,
    bgClassName = "",
    bgClass = "",
    subnavbarClassName = "",
    subnavbarClass = "",
    innerClassName = "",
    innerClass = "",
    leftClassName = "",
    leftClass = "",
    titleClassName = "",
    titleClass = "",
    subtitleClassName = "",
    subtitleClass = "",
    rightClassName = "",
    rightClass = "",
    centerTitle
  } = props;
  return {
    base: {
      common: cls(`w-full z-20 top-0 pt-safe`, (large || medium) && "pointer-events-none", positionClass("sticky", classes)),
      ios: cls(fontSizeIos, colors.textIos),
      material: cls(fontSizeMaterial, colors.textMaterial)
    },
    bg: {
      common: cls("absolute w-full h-full left-0 top-0", outline && "hairline-b", bgClassName || bgClass),
      ios: cls(colors.bgIos, translucent && "translucent"),
      material: `${colors.bgMaterial}`
    },
    subnavbar: {
      common: cls("relative flex items-center", subnavbarClassName || subnavbarClass, (large || medium) && "pointer-events-auto"),
      ios: "h-11 pl-2-safe pr-2-safe",
      material: "h-14 pl-4-safe pr-4-safe"
    },
    inner: {
      common: cls("flex relative items-center w-full overflow-hidden", innerClassName || innerClass, (large || medium) && "pointer-events-auto z-10"),
      ios: cls("pl-2-safe pr-2-safe h-11", !left && right ? "justify-end" : "justify-between"),
      material: "justify-start h-16 pl-safe pr-safe"
    },
    titleContainer: {
      common: cls("flex items-center px-4 relative", (large || medium) && "pointer-events-auto"),
      ios: cls(medium && cls(titleMediumFontSizeIos, "h-11 font-semibold"), large && cls(titleLargeFontSizeIos, "h-13 font-bold")),
      material: cls(medium && cls(titleMediumFontSizeMaterial, "h-12 pb-4"), large && cls(titleLargeFontSizeMaterial, "h-[5.5rem]"))
    },
    left: {
      common: cls("flex justify-center items-center h-full", leftClassName || leftClass),
      ios: "mr-2 transform transform-gpu",
      material: "mx-1"
    },
    title: {
      common: cls(`whitespace-nowrap leading-tight`, titleClassName || titleClass, (large || medium || transparent) && "opacity-0", centerTitle ? `absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 text-center` : "text-left"),
      ios: cls(`${titleFontSizeIos} font-semibold`, !centerTitle && "first:mx-2"),
      material: cls(`${titleFontSizeMaterial} font-normal`, !centerTitle && "first:mx-4")
    },
    subtitle: {
      common: cls("font-normal leading-none", subtitleClassName || subtitleClass),
      ios: "text-2xs opacity-55",
      material: "text-sm opacity-85"
    },
    right: {
      common: cls("flex justify-center items-center h-full", rightClassName || rightClass),
      ios: cls("transform transform-gpu", centerTitle ? "ml-2" : "ml-auto"),
      material: "ml-auto mr-1"
    }
  };
};
const NavbarColors = (colorsProp, dark) => {
  return {
    bgIos: cls("bg-ios-light-surface-2", dark("dark:bg-ios-dark-surface-2")),
    bgMaterial: cls("bg-md-light-surface-2", dark("dark:bg-md-dark-surface-2")),
    textIos: cls("text-black", dark("dark:text-white")),
    textMaterial: cls("text-md-light-on-surface", dark("dark:text-md-dark-on-surface")),
    ...colorsProp
  };
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isScrollable;
  let colors;
  let isOutline;
  let c;
  let $$restProps = compute_rest_props($$props, [
    "class",
    "bgClass",
    "innerClass",
    "leftClass",
    "titleClass",
    "subtitleClass",
    "rightClass",
    "subnavbarClass",
    "colors",
    "translucent",
    "outline",
    "centerTitle",
    "medium",
    "large",
    "transparent",
    "fontSizeIos",
    "fontSizeMaterial",
    "titleFontSizeIos",
    "titleFontSizeMaterial",
    "titleMediumFontSizeIos",
    "titleMediumFontSizeMaterial",
    "titleLargeFontSizeIos",
    "titleLargeFontSizeMaterial",
    "scrollEl",
    "title",
    "subtitle",
    "ios",
    "material"
  ]);
  let $$slots = compute_slots(slots);
  let { class: className = void 0 } = $$props;
  let { bgClass = "" } = $$props;
  let { innerClass = "" } = $$props;
  let { leftClass = "" } = $$props;
  let { titleClass = "" } = $$props;
  let { subtitleClass = "" } = $$props;
  let { rightClass = "" } = $$props;
  let { subnavbarClass = "" } = $$props;
  let { colors: colorsProp = void 0 } = $$props;
  let { translucent = true } = $$props;
  let { outline = void 0 } = $$props;
  let { centerTitle = void 0 } = $$props;
  let { medium = false } = $$props;
  let { large = false } = $$props;
  let { transparent = false } = $$props;
  let { fontSizeIos = "text-[17px]" } = $$props;
  let { fontSizeMaterial = "text-[16px]" } = $$props;
  let { titleFontSizeIos = "text-[17px]" } = $$props;
  let { titleFontSizeMaterial = "text-[22px]" } = $$props;
  let { titleMediumFontSizeIos = "text-[24px]" } = $$props;
  let { titleMediumFontSizeMaterial = "text-[24px]" } = $$props;
  let { titleLargeFontSizeIos = "text-[34px]" } = $$props;
  let { titleLargeFontSizeMaterial = "text-[28px]" } = $$props;
  let { scrollEl = void 0 } = $$props;
  let { title = void 0 } = $$props;
  let { subtitle = void 0 } = $$props;
  let { ios = void 0 } = $$props;
  let { material = void 0 } = $$props;
  let elRef = 0;
  let titleContainerHeight = 0;
  let bgElRef = null;
  let innerElRef = null;
  let titleContainerElRef = null;
  let titleElRef = null;
  let subnavbarElRef = null;
  const dark = useDarkClasses();
  let theme;
  theme = useTheme((v) => theme = v);
  const getScrollEl = () => {
    if (typeof scrollEl === "undefined") {
      return elRef;
    }
    return scrollEl || scrollEl;
  };
  const onScroll = (e) => {
    if (!e) {
      e = { target: getScrollEl() };
    }
    const { scrollTop } = e.target;
    if (!isScrollable) {
      return;
    }
    const maxTranslate = titleContainerHeight;
    const scrollProgress = Math.max(Math.min(scrollTop / maxTranslate, 1), 0);
    bgElRef.style.opacity = transparent ? -0.5 + scrollProgress * 1.5 : "";
    if (medium || large) {
      bgElRef.style.transform = `translateY(-${scrollProgress * maxTranslate}px)`;
    }
    if ((medium || large) && subnavbarElRef) {
      subnavbarElRef.style.transform = `translateY(-${scrollProgress * maxTranslate}px)`;
    }
  };
  const destroyScroll = () => {
    const scrollElLocal = getScrollEl();
    if (scrollElLocal) {
      scrollElLocal.removeEventListener("scroll", onScroll);
    }
  };
  onDestroy(() => {
    destroyScroll();
  });
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.bgClass === void 0 && $$bindings.bgClass && bgClass !== void 0)
    $$bindings.bgClass(bgClass);
  if ($$props.innerClass === void 0 && $$bindings.innerClass && innerClass !== void 0)
    $$bindings.innerClass(innerClass);
  if ($$props.leftClass === void 0 && $$bindings.leftClass && leftClass !== void 0)
    $$bindings.leftClass(leftClass);
  if ($$props.titleClass === void 0 && $$bindings.titleClass && titleClass !== void 0)
    $$bindings.titleClass(titleClass);
  if ($$props.subtitleClass === void 0 && $$bindings.subtitleClass && subtitleClass !== void 0)
    $$bindings.subtitleClass(subtitleClass);
  if ($$props.rightClass === void 0 && $$bindings.rightClass && rightClass !== void 0)
    $$bindings.rightClass(rightClass);
  if ($$props.subnavbarClass === void 0 && $$bindings.subnavbarClass && subnavbarClass !== void 0)
    $$bindings.subnavbarClass(subnavbarClass);
  if ($$props.colors === void 0 && $$bindings.colors && colorsProp !== void 0)
    $$bindings.colors(colorsProp);
  if ($$props.translucent === void 0 && $$bindings.translucent && translucent !== void 0)
    $$bindings.translucent(translucent);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.centerTitle === void 0 && $$bindings.centerTitle && centerTitle !== void 0)
    $$bindings.centerTitle(centerTitle);
  if ($$props.medium === void 0 && $$bindings.medium && medium !== void 0)
    $$bindings.medium(medium);
  if ($$props.large === void 0 && $$bindings.large && large !== void 0)
    $$bindings.large(large);
  if ($$props.transparent === void 0 && $$bindings.transparent && transparent !== void 0)
    $$bindings.transparent(transparent);
  if ($$props.fontSizeIos === void 0 && $$bindings.fontSizeIos && fontSizeIos !== void 0)
    $$bindings.fontSizeIos(fontSizeIos);
  if ($$props.fontSizeMaterial === void 0 && $$bindings.fontSizeMaterial && fontSizeMaterial !== void 0)
    $$bindings.fontSizeMaterial(fontSizeMaterial);
  if ($$props.titleFontSizeIos === void 0 && $$bindings.titleFontSizeIos && titleFontSizeIos !== void 0)
    $$bindings.titleFontSizeIos(titleFontSizeIos);
  if ($$props.titleFontSizeMaterial === void 0 && $$bindings.titleFontSizeMaterial && titleFontSizeMaterial !== void 0)
    $$bindings.titleFontSizeMaterial(titleFontSizeMaterial);
  if ($$props.titleMediumFontSizeIos === void 0 && $$bindings.titleMediumFontSizeIos && titleMediumFontSizeIos !== void 0)
    $$bindings.titleMediumFontSizeIos(titleMediumFontSizeIos);
  if ($$props.titleMediumFontSizeMaterial === void 0 && $$bindings.titleMediumFontSizeMaterial && titleMediumFontSizeMaterial !== void 0)
    $$bindings.titleMediumFontSizeMaterial(titleMediumFontSizeMaterial);
  if ($$props.titleLargeFontSizeIos === void 0 && $$bindings.titleLargeFontSizeIos && titleLargeFontSizeIos !== void 0)
    $$bindings.titleLargeFontSizeIos(titleLargeFontSizeIos);
  if ($$props.titleLargeFontSizeMaterial === void 0 && $$bindings.titleLargeFontSizeMaterial && titleLargeFontSizeMaterial !== void 0)
    $$bindings.titleLargeFontSizeMaterial(titleLargeFontSizeMaterial);
  if ($$props.scrollEl === void 0 && $$bindings.scrollEl && scrollEl !== void 0)
    $$bindings.scrollEl(scrollEl);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.ios === void 0 && $$bindings.ios && ios !== void 0)
    $$bindings.ios(ios);
  if ($$props.material === void 0 && $$bindings.material && material !== void 0)
    $$bindings.material(material);
  isScrollable = medium || large || transparent;
  colors = NavbarColors(colorsProp, dark);
  isOutline = typeof outline === "undefined" ? theme === "ios" : outline;
  c = useThemeClasses(
    { ios, material },
    NavbarClasses(
      {
        bgClass,
        innerClass,
        leftClass,
        titleClass,
        subtitleClass,
        rightClass,
        subnavbarClass,
        translucent,
        transparent,
        outline: isOutline,
        fontSizeIos,
        fontSizeMaterial,
        titleFontSizeIos,
        titleFontSizeMaterial,
        medium,
        large,
        titleMediumFontSizeIos,
        titleMediumFontSizeMaterial,
        titleLargeFontSizeIos,
        titleLargeFontSizeMaterial,
        centerTitle: typeof centerTitle === "undefined" ? theme === "ios" : centerTitle
      },
      colors,
      className
    ),
    className,
    (v) => c = v
  );
  return `<div${spread([{ class: escape_attribute_value(c.base) }, escape_object($$restProps)], {})}${add_attribute("this", elRef, 0)}><div${add_attribute("class", c.bg, 0)}${add_attribute("this", bgElRef, 0)}></div>
  <div${add_attribute("class", c.inner, 0)}${add_attribute("this", innerElRef, 0)}>${$$slots.left ? `<div${add_attribute("class", c.left, 0)}>${slots.left ? slots.left({}) : ``}</div>` : ``}
    ${$$slots.title || $$slots.subtitle || title || subtitle ? `<div${add_attribute("class", c.title, 0)}${add_attribute("this", titleElRef, 0)}>${escape(title)}
        ${slots.title ? slots.title({}) : ``}
        ${subtitle || $$slots.subtitle ? `<div${add_attribute("class", c.subtitle, 0)}>${escape(subtitle)}${slots.subtitle ? slots.subtitle({}) : ``}</div>` : ``}</div>` : ``}
    ${$$slots.right ? `<div${add_attribute("class", c.right, 0)}>${slots.right ? slots.right({}) : ``}</div>` : ``}
    ${slots.default ? slots.default({}) : ``}</div>
  ${large || medium ? `<div${add_attribute("class", c.titleContainer, 0)}${add_attribute("this", titleContainerElRef, 0)}>${escape(title)}
      ${slots.title ? slots.title({}) : ``}</div>` : ``}
  ${$$slots.subnavbar ? `<div${add_attribute("class", c.subnavbar, 0)}${add_attribute("this", subnavbarElRef, 0)}>${slots.subnavbar ? slots.subnavbar({}) : ``}</div>` : ``}</div>`;
});
const PageClasses = (props, colors, classes) => {
  return {
    base: {
      common: cls("h-full w-full left-0 top-0 overflow-auto", positionClass("absolute", classes)),
      ios: colors.bgIos,
      material: colors.bgMaterial
    }
  };
};
const PageColors = function(colorsProp, dark) {
  if (colorsProp === void 0) {
    colorsProp = {};
  }
  return {
    bgIos: cls("bg-ios-light-surface", dark("dark:bg-ios-dark-surface")),
    bgMaterial: cls("bg-md-light-surface", dark("dark:bg-md-dark-surface")),
    ...colorsProp
  };
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let colors;
  let c;
  let $$restProps = compute_rest_props($$props, ["class", "colors", "ios", "material", "component"]);
  let { class: className = void 0 } = $$props;
  let { colors: colorsProp = void 0 } = $$props;
  let { ios = void 0 } = $$props;
  let { material = void 0 } = $$props;
  let { component = "div" } = $$props;
  const dark = useDarkClasses();
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
  colors = PageColors(colorsProp, dark);
  c = useThemeClasses({ ios, material }, PageClasses({}, colors, className), className, (v) => c = v);
  return `${((tag) => {
    return tag ? `<${component}${spread([{ class: escape_attribute_value(c.base) }, escape_object($$restProps)], {})}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(component)}`;
});
const ToolbarClasses = (props, colors, classes) => {
  const {
    bgClassName = "",
    bgClass = "",
    outline,
    translucent,
    innerClassName = "",
    innerClass = "",
    tabbar,
    tabbarIcons,
    top
  } = props;
  return {
    base: {
      common: cls(`w-full z-20`, positionClass("relative", classes), !top && "pb-safe")
    },
    bg: {
      common: cls("absolute w-full h-full left-0 top-0", outline && (top ? "hairline-b" : "hairline-t"), bgClassName || bgClass),
      ios: cls(colors.bgIos, translucent && "translucent"),
      material: cls(`${colors.bgMaterial}`)
    },
    inner: {
      common: cls(`flex relative justify-between items-center w-full overflow-hidden`, innerClassName || innerClass),
      ios: cls("pl-2-safe pr-2-safe", tabbarIcons ? "h-12.5" : "h-11"),
      material: cls(!tabbar ? "pl-2-safe pr-2-safe" : "", tabbarIcons ? "h-20" : "h-14")
    },
    highlight: {
      common: cls(top ? "bottom-0" : "top-0", "absolute left-0 w-full h-0.5 duration-200 pointer-events-none transition-transform"),
      ios: colors.tabbarHighlightBgIos,
      material: colors.tabbarHighlightBgMaterial
    }
  };
};
const ToolbarColors = function(colorsProp, dark) {
  if (colorsProp === void 0) {
    colorsProp = {};
  }
  return {
    bgIos: cls("bg-ios-light-surface-2", dark("dark:bg-ios-dark-surface-2")),
    bgMaterial: cls("bg-md-light-surface-2", dark("dark:bg-md-dark-surface-2")),
    tabbarHighlightBgIos: "bg-primary",
    tabbarHighlightBgMaterial: cls("bg-md-light-primary", dark("dark:bg-md-dark-primary")),
    ...colorsProp
  };
};
const Toolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isOutline;
  let hasHighlight;
  let colors;
  let c;
  let $$restProps = compute_rest_props($$props, [
    "class",
    "colors",
    "ios",
    "material",
    "translucent",
    "bgClass",
    "innerClass",
    "outline",
    "tabbar",
    "tabbarLabels",
    "tabbarIcons",
    "top"
  ]);
  let { class: className = void 0 } = $$props;
  let { colors: colorsProp = void 0 } = $$props;
  let { ios = void 0 } = $$props;
  let { material = void 0 } = $$props;
  let { translucent = true } = $$props;
  let { bgClass = "" } = $$props;
  let { innerClass = "" } = $$props;
  let { outline = void 0 } = $$props;
  let { tabbar = false } = $$props;
  let { tabbarLabels = false } = $$props;
  let { tabbarIcons = false } = $$props;
  let { top = false } = $$props;
  let highlightElRef = null;
  let theme;
  theme = useTheme({ ios, material }, (v) => theme = v);
  let highlightStyle = { transform: "", width: "" };
  const dark = useDarkClasses();
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.colors === void 0 && $$bindings.colors && colorsProp !== void 0)
    $$bindings.colors(colorsProp);
  if ($$props.ios === void 0 && $$bindings.ios && ios !== void 0)
    $$bindings.ios(ios);
  if ($$props.material === void 0 && $$bindings.material && material !== void 0)
    $$bindings.material(material);
  if ($$props.translucent === void 0 && $$bindings.translucent && translucent !== void 0)
    $$bindings.translucent(translucent);
  if ($$props.bgClass === void 0 && $$bindings.bgClass && bgClass !== void 0)
    $$bindings.bgClass(bgClass);
  if ($$props.innerClass === void 0 && $$bindings.innerClass && innerClass !== void 0)
    $$bindings.innerClass(innerClass);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.tabbar === void 0 && $$bindings.tabbar && tabbar !== void 0)
    $$bindings.tabbar(tabbar);
  if ($$props.tabbarLabels === void 0 && $$bindings.tabbarLabels && tabbarLabels !== void 0)
    $$bindings.tabbarLabels(tabbarLabels);
  if ($$props.tabbarIcons === void 0 && $$bindings.tabbarIcons && tabbarIcons !== void 0)
    $$bindings.tabbarIcons(tabbarIcons);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  isOutline = typeof outline === "undefined" ? theme === "ios" : outline;
  hasHighlight = theme === "material" && tabbar && !tabbarIcons;
  colors = ToolbarColors(colorsProp, dark);
  c = useThemeClasses(
    { ios, material },
    ToolbarClasses(
      {
        outline: isOutline,
        translucent,
        bgClass,
        innerClass,
        tabbar,
        top,
        tabbarIcons,
        tabbarLabels
      },
      colors,
      className
    ),
    className,
    (v) => c = v
  );
  return `<div${spread([{ class: escape_attribute_value(c.base) }, escape_object($$restProps)], {})}><div${add_attribute("class", c.bg, 0)}></div>
  <div${add_attribute("class", c.inner, 0)}>${slots.default ? slots.default({}) : ``}</div>
  ${hasHighlight ? `<span${add_attribute("class", c.highlight, 0)}${add_attribute("style", `width: ${highlightStyle.width} ; transform: ${highlightStyle.transform}`, 0)}${add_attribute("this", highlightElRef, 0)}></span>` : ``}</div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(App, "App").$$render($$result, { theme: "ios" }, {}, {
    default: () => {
      return `${validate_component(Page, "Page").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Navbar, "Navbar").$$render($$result, { title: "CloudSpace" }, {}, {})}
      ${validate_component(Block, "Block").$$render($$result, {}, {}, {
            default: () => {
              return `<a href="${"https://github.com/CloudSpace-Ios-Tweaks/server/blob/main/Cloudspace-App.mobileconfig?raw=true"}">${validate_component(Button, "Button").$$render($$result, {}, {}, {
                default: () => {
                  return `Add app to homescreen`;
                }
              })}</a>`;
            }
          })}
      ${slots.default ? slots.default({}) : ``}
      ${validate_component(Toolbar, "Toolbar").$$render($$result, { class: `left-0 bottom-0 fixed w-full` }, {}, {
            default: () => {
              return `${validate_component(Link, "Link").$$render($$result, { href: "/", toolbar: true }, {}, {
                default: () => {
                  return `Home`;
                }
              })}
      ${validate_component(Link, "Link").$$render($$result, { href: "/jailbreaks", toolbar: true }, {}, {
                default: () => {
                  return `Jailbreaks`;
                }
              })}
      ${validate_component(Link, "Link").$$render($$result, { href: "/tweaks", toolbar: true }, {}, {
                default: () => {
                  return `Tweaks`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
export {
  Layout as default
};
