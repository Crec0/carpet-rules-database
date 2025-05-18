import "clsx";
import { P as push, S as spread_attributes, T as clsx, V as bind_props, R as pop, W as copy_payload, X as assign_payload, Y as spread_props, Z as once, _ as stringify, $ as attr, a0 as escape_html, a1 as ensure_array_like, a2 as fallback, a3 as head } from "../../chunks/index.js";
import { c as cn, u as useRefById, g as getAriaOrientation, a as getAriaHidden, b as getDataOrientation, d as useId, e as box, m as mergeProps, f as useDialogRoot, n as noop, C as Context, h as useStateMachine, P as Presence_layer, i as isBrowser, s as setSidebar, S as SIDEBAR_COOKIE_NAME, j as SIDEBAR_COOKIE_MAX_AGE, k as SIDEBAR_WIDTH, l as SIDEBAR_WIDTH_ICON, o as useSidebar, p as Sheet_content, q as SIDEBAR_WIDTH_MOBILE, r as SiteTitle, B as Badge, t as gState, v as Check, w as setInitialMode, x as disableTransitions, y as themeColors, z as darkClassNames, A as lightClassNames, D as modeStorageKey, E as themeStorageKey, F as defineConfig } from "../../chunks/mode.js";
import "style-to-object";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Sidebar_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    "data-sidebar": "content",
    class: clsx(cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)),
    ...restProps
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_footer($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    "data-sidebar": "footer",
    class: clsx(cn("flex flex-col gap-2 p-2", className)),
    ...restProps
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_group_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    "data-sidebar": "group-content",
    class: clsx(cn("w-full text-sm", className)),
    ...restProps
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_group_label($$payload, $$props) {
  push();
  let {
    ref = null,
    children,
    child,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const mergedProps = {
    class: cn("text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
    "data-sidebar": "group-label",
    ...restProps
  };
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_group($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    "data-sidebar": "group",
    class: clsx(cn("relative flex w-full min-w-0 flex-col p-2", className)),
    ...restProps
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Sidebar_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    "data-sidebar": "header",
    class: clsx(cn("flex flex-col gap-2 p-2", className)),
    ...restProps
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Input($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<input${spread_attributes({
    class: clsx(cn("border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)),
    value,
    ...restProps
  })}>`;
  bind_props($$props, { ref, value });
  pop();
}
function Sidebar_input($$payload, $$props) {
  push();
  let {
    ref = null,
    value = "",
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Input($$payload2, spread_props([
      {
        "data-sidebar": "input",
        class: cn("bg-background focus-visible:ring-sidebar-ring h-8 w-full shadow-none focus-visible:ring-2", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, value });
  pop();
}
function useDebounce(callback, wait = 250) {
  let context = null;
  function debounced(...args) {
    if (context) {
      if (context.timeout) {
        clearTimeout(context.timeout);
      }
    } else {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      context = {
        timeout: null,
        runner: null,
        promise,
        resolve,
        reject
      };
    }
    context.runner = async () => {
      if (!context) return;
      const ctx = context;
      context = null;
      try {
        ctx.resolve(await callback.apply(this, args));
      } catch (error) {
        ctx.reject(error);
      }
    };
    context.timeout = setTimeout(context.runner, typeof wait === "function" ? wait() : wait);
    return context.promise;
  }
  debounced.cancel = async () => {
    if (!context || context.timeout === null) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || context.timeout === null) return;
    }
    clearTimeout(context.timeout);
    context.reject("Cancelled");
    context = null;
  };
  debounced.runScheduledNow = async () => {
    if (!context || !context.timeout) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || !context.timeout) return;
    }
    clearTimeout(context.timeout);
    context.timeout = null;
    await context.runner?.();
  };
  Object.defineProperty(debounced, "pending", {
    enumerable: true,
    get() {
      return !!context?.timeout;
    }
  });
  return debounced;
}
class IsMounted {
  #isMounted = false;
  constructor() {
  }
  get current() {
    return this.#isMounted;
  }
}
const ROOT_ATTR = "data-separator-root";
class SeparatorRootState {
  #id;
  #ref;
  #orientation;
  #decorative;
  constructor(props) {
    this.#orientation = props.orientation;
    this.#decorative = props.decorative;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: this.#decorative.current ? "none" : "separator",
    "aria-orientation": getAriaOrientation(this.#orientation.current),
    "aria-hidden": getAriaHidden(this.#decorative.current),
    "data-orientation": getDataOrientation(this.#orientation.current),
    [ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
function useSeparatorRoot(props) {
  return new SeparatorRootState(props);
}
function Separator$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    decorative = false,
    orientation = "horizontal",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useSeparatorRoot({
    ref: box.with(() => ref, (v) => ref = v),
    id: box.with(() => id),
    decorative: box.with(() => decorative),
    orientation: box.with(() => orientation)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Dialog($$payload, $$props) {
  push();
  let { open = false, onOpenChange = noop, children } = $$props;
  useDialogRoot({
    variant: box.with(() => "dialog"),
    open: box.with(() => open, (v) => {
      open = v;
      onOpenChange(v);
    })
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { open });
  pop();
}
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
function useResizeObserver(node, onResize) {
}
const SCROLL_AREA_ROOT_ATTR = "data-scroll-area-root";
const SCROLL_AREA_VIEWPORT_ATTR = "data-scroll-area-viewport";
const SCROLL_AREA_CORNER_ATTR = "data-scroll-area-corner";
const SCROLL_AREA_THUMB_ATTR = "data-scroll-area-thumb";
const SCROLL_AREA_SCROLLBAR_ATTR = "data-scroll-area-scrollbar";
class ScrollAreaRootState {
  #id;
  #ref;
  dir;
  type;
  scrollHideDelay;
  scrollAreaNode = null;
  viewportNode = null;
  contentNode = null;
  scrollbarXNode = null;
  scrollbarYNode = null;
  cornerWidth = 0;
  cornerHeight = 0;
  scrollbarXEnabled = false;
  scrollbarYEnabled = false;
  constructor(props) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.dir = props.dir;
    this.type = props.type;
    this.scrollHideDelay = props.scrollHideDelay;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.scrollAreaNode = node;
      }
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    dir: this.dir.current,
    style: {
      position: "relative",
      "--bits-scroll-area-corner-height": `${this.cornerHeight}px`,
      "--bits-scroll-area-corner-width": `${this.cornerWidth}px`
    },
    [SCROLL_AREA_ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaViewportState {
  #id;
  #ref;
  #contentId = box(useId());
  #contentRef = box(null);
  root;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.root = root;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.root.viewportNode = node;
      }
    });
    useRefById({
      id: this.#contentId,
      ref: this.#contentRef,
      onRefChange: (node) => {
        this.root.contentNode = node;
      }
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    style: {
      overflowX: this.root.scrollbarXEnabled ? "scroll" : "hidden",
      overflowY: this.root.scrollbarYEnabled ? "scroll" : "hidden"
    },
    [SCROLL_AREA_VIEWPORT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
  #contentProps = once(() => ({
    id: this.#contentId.current,
    "data-scroll-area-content": "",
    /**
     * When horizontal scrollbar is visible: this element should be at least
     * as wide as its children for size calculations to work correctly.
     *
     * When horizontal scrollbar is NOT visible: this element's width should
     * be constrained by the parent container to enable `text-overflow: ellipsis`
     */
    style: {
      minWidth: this.root.scrollbarXEnabled ? "fit-content" : void 0
    }
  }));
  get contentProps() {
    return this.#contentProps();
  }
}
class ScrollAreaScrollbarState {
  ref;
  id;
  root;
  orientation;
  #isHorizontal = once(() => this.orientation.current === "horizontal");
  get isHorizontal() {
    return this.#isHorizontal();
  }
  hasThumb = false;
  constructor(props, root) {
    this.root = root;
    this.orientation = props.orientation;
    this.ref = props.ref;
    this.id = props.id;
  }
}
class ScrollAreaScrollbarHoverState {
  root;
  isVisible = false;
  scrollbar;
  constructor(scrollbar) {
    this.root = scrollbar.root;
    this.scrollbar = scrollbar;
  }
  #props = once(() => ({
    "data-state": this.isVisible ? "visible" : "hidden"
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaScrollbarScrollState {
  orientation;
  root;
  scrollbar;
  machine = useStateMachine("hidden", {
    hidden: { SCROLL: "scrolling" },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  #isHidden = once(() => this.machine.state.current === "hidden");
  get isHidden() {
    return this.#isHidden();
  }
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
    this.orientation = this.scrollbar.orientation;
    useDebounce(() => this.machine.dispatch("SCROLL_END"), 100);
    this.onpointerenter = this.onpointerenter.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
  }
  onpointerenter(_) {
    this.machine.dispatch("POINTER_ENTER");
  }
  onpointerleave(_) {
    this.machine.dispatch("POINTER_LEAVE");
  }
  #props = once(() => ({
    "data-state": this.machine.state.current === "hidden" ? "hidden" : "visible",
    onpointerenter: this.onpointerenter,
    onpointerleave: this.onpointerleave
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaScrollbarAutoState {
  scrollbar;
  root;
  isVisible = false;
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
    useDebounce(
      () => {
        const viewportNode = this.root.viewportNode;
        if (!viewportNode) return;
        const isOverflowX = viewportNode.offsetWidth < viewportNode.scrollWidth;
        const isOverflowY = viewportNode.offsetHeight < viewportNode.scrollHeight;
        this.isVisible = this.scrollbar.isHorizontal ? isOverflowX : isOverflowY;
      },
      10
    );
  }
  #props = once(() => ({
    "data-state": this.isVisible ? "visible" : "hidden"
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaScrollbarVisibleState {
  scrollbar;
  root;
  thumbNode = null;
  pointerOffset = 0;
  sizes = {
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  };
  #thumbRatio = once(() => getThumbRatio(this.sizes.viewport, this.sizes.content));
  get thumbRatio() {
    return this.#thumbRatio();
  }
  #hasThumb = once(() => Boolean(this.thumbRatio > 0 && this.thumbRatio < 1));
  get hasThumb() {
    return this.#hasThumb();
  }
  prevTransformStyle = "";
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
  }
  setSizes(sizes) {
    this.sizes = sizes;
  }
  getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer({
      pointerPos,
      pointerOffset: this.pointerOffset,
      sizes: this.sizes,
      dir
    });
  }
  onThumbPointerUp() {
    this.pointerOffset = 0;
  }
  onThumbPointerDown(pointerPos) {
    this.pointerOffset = pointerPos;
  }
  xOnThumbPositionChange() {
    if (!(this.root.viewportNode && this.thumbNode)) return;
    const scrollPos = this.root.viewportNode.scrollLeft;
    const offset = getThumbOffsetFromScroll({
      scrollPos,
      sizes: this.sizes,
      dir: this.root.dir.current
    });
    const transformStyle = `translate3d(${offset}px, 0, 0)`;
    this.thumbNode.style.transform = transformStyle;
  }
  xOnWheelScroll(scrollPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollLeft = scrollPos;
  }
  xOnDragScroll(pointerPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollLeft = this.getScrollPosition(pointerPos, this.root.dir.current);
  }
  yOnThumbPositionChange() {
    if (!(this.root.viewportNode && this.thumbNode)) return;
    const scrollPos = this.root.viewportNode.scrollTop;
    const offset = getThumbOffsetFromScroll({ scrollPos, sizes: this.sizes });
    const transformStyle = `translate3d(0, ${offset}px, 0)`;
    this.thumbNode.style.transform = transformStyle;
  }
  yOnWheelScroll(scrollPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollTop = scrollPos;
  }
  yOnDragScroll(pointerPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollTop = this.getScrollPosition(pointerPos, this.root.dir.current);
  }
}
class ScrollAreaScrollbarXState {
  #id;
  #mounted;
  ref;
  scrollbarVis;
  root;
  computedStyle;
  constructor(props, scrollbarVis) {
    this.#mounted = props.mounted;
    this.scrollbarVis = scrollbarVis;
    this.#id = this.scrollbarVis.scrollbar.id;
    this.ref = this.scrollbarVis.scrollbar.ref;
    this.root = scrollbarVis.root;
    useRefById({
      id: this.#id,
      ref: this.ref,
      onRefChange: (node) => {
        this.root.scrollbarXNode = node;
      },
      deps: () => this.#mounted.current
    });
  }
  onThumbPointerDown = (pointerPos) => {
    this.scrollbarVis.onThumbPointerDown(pointerPos.x);
  };
  onDragScroll = (pointerPos) => {
    this.scrollbarVis.xOnDragScroll(pointerPos.x);
  };
  onThumbPointerUp = () => {
    this.scrollbarVis.onThumbPointerUp();
  };
  onThumbPositionChange = () => {
    this.scrollbarVis.xOnThumbPositionChange();
  };
  onWheelScroll = (e, maxScrollPos) => {
    if (!this.root.viewportNode) return;
    const scrollPos = this.root.viewportNode.scrollLeft + e.deltaX;
    this.scrollbarVis.xOnWheelScroll(scrollPos);
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
      e.preventDefault();
    }
  };
  onResize = () => {
    if (!(this.ref.current && this.root.viewportNode && this.computedStyle)) return;
    this.scrollbarVis.setSizes({
      content: this.root.viewportNode.scrollWidth,
      viewport: this.root.viewportNode.offsetWidth,
      scrollbar: {
        size: this.ref.current.clientWidth,
        paddingStart: toInt(this.computedStyle.paddingLeft),
        paddingEnd: toInt(this.computedStyle.paddingRight)
      }
    });
  };
  #thumbSize = once(() => {
    return getThumbSize(this.scrollbarVis.sizes);
  });
  get thumbSize() {
    return this.#thumbSize();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-orientation": "horizontal",
    style: {
      bottom: 0,
      left: this.root.dir.current === "rtl" ? "var(--bits-scroll-area-corner-width)" : 0,
      right: this.root.dir.current === "ltr" ? "var(--bits-scroll-area-corner-width)" : 0,
      "--bits-scroll-area-thumb-width": `${this.thumbSize}px`
    }
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaScrollbarYState {
  #id;
  #mounted;
  ref;
  scrollbarVis;
  root;
  computedStyle;
  constructor(props, scrollbarVis) {
    this.#mounted = props.mounted;
    this.scrollbarVis = scrollbarVis;
    this.#id = this.scrollbarVis.scrollbar.id;
    this.ref = this.scrollbarVis.scrollbar.ref;
    this.root = scrollbarVis.root;
    useRefById({
      id: this.scrollbarVis.scrollbar.id,
      ref: this.scrollbarVis.scrollbar.ref,
      onRefChange: (node) => {
        this.root.scrollbarYNode = node;
      },
      deps: () => this.#mounted.current
    });
    this.onThumbPointerDown = this.onThumbPointerDown.bind(this);
    this.onDragScroll = this.onDragScroll.bind(this);
    this.onThumbPointerUp = this.onThumbPointerUp.bind(this);
    this.onThumbPositionChange = this.onThumbPositionChange.bind(this);
    this.onWheelScroll = this.onWheelScroll.bind(this);
    this.onResize = this.onResize.bind(this);
  }
  onThumbPointerDown(pointerPos) {
    this.scrollbarVis.onThumbPointerDown(pointerPos.y);
  }
  onDragScroll(pointerPos) {
    this.scrollbarVis.yOnDragScroll(pointerPos.y);
  }
  onThumbPointerUp() {
    this.scrollbarVis.onThumbPointerUp();
  }
  onThumbPositionChange() {
    this.scrollbarVis.yOnThumbPositionChange();
  }
  onWheelScroll(e, maxScrollPos) {
    if (!this.root.viewportNode) return;
    const scrollPos = this.root.viewportNode.scrollTop + e.deltaY;
    this.scrollbarVis.yOnWheelScroll(scrollPos);
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
      e.preventDefault();
    }
  }
  onResize() {
    if (!(this.ref.current && this.root.viewportNode && this.computedStyle)) return;
    this.scrollbarVis.setSizes({
      content: this.root.viewportNode.scrollHeight,
      viewport: this.root.viewportNode.offsetHeight,
      scrollbar: {
        size: this.ref.current.clientHeight,
        paddingStart: toInt(this.computedStyle.paddingTop),
        paddingEnd: toInt(this.computedStyle.paddingBottom)
      }
    });
  }
  #thumbSize = once(() => {
    return getThumbSize(this.scrollbarVis.sizes);
  });
  get thumbSize() {
    return this.#thumbSize();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-orientation": "vertical",
    style: {
      top: 0,
      right: this.root.dir.current === "ltr" ? 0 : void 0,
      left: this.root.dir.current === "rtl" ? 0 : void 0,
      bottom: "var(--bits-scroll-area-corner-height)",
      "--bits-scroll-area-thumb-height": `${this.thumbSize}px`
    }
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaScrollbarSharedState {
  scrollbarState;
  root;
  scrollbarVis;
  rect = null;
  prevWebkitUserSelect = "";
  handleResize;
  handleThumbPositionChange;
  handleWheelScroll;
  handleThumbPointerDown;
  handleThumbPointerUp;
  #maxScrollPos = once(() => this.scrollbarVis.sizes.content - this.scrollbarVis.sizes.viewport);
  get maxScrollPos() {
    return this.#maxScrollPos();
  }
  constructor(scrollbarState) {
    this.scrollbarState = scrollbarState;
    this.root = scrollbarState.root;
    this.scrollbarVis = scrollbarState.scrollbarVis;
    this.handleResize = useDebounce(() => this.scrollbarState.onResize(), 10);
    this.handleThumbPositionChange = this.scrollbarState.onThumbPositionChange;
    this.handleWheelScroll = this.scrollbarState.onWheelScroll;
    this.handleThumbPointerDown = this.scrollbarState.onThumbPointerDown;
    this.handleThumbPointerUp = this.scrollbarState.onThumbPointerUp;
    useResizeObserver(() => this.scrollbarState.ref.current, this.handleResize);
    useResizeObserver(() => this.root.contentNode, this.handleResize);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
  }
  handleDragScroll(e) {
    if (!this.rect) return;
    const x = e.clientX - this.rect.left;
    const y = e.clientY - this.rect.top;
    this.scrollbarState.onDragScroll({ x, y });
  }
  onpointerdown(e) {
    if (e.button !== 0) return;
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    this.rect = this.scrollbarState.ref.current?.getBoundingClientRect() ?? null;
    this.prevWebkitUserSelect = document.body.style.webkitUserSelect;
    document.body.style.webkitUserSelect = "none";
    if (this.root.viewportNode) this.root.viewportNode.style.scrollBehavior = "auto";
    this.handleDragScroll(e);
  }
  onpointermove(e) {
    this.handleDragScroll(e);
  }
  onpointerup(e) {
    const target = e.target;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
    document.body.style.webkitUserSelect = this.prevWebkitUserSelect;
    if (this.root.viewportNode) this.root.viewportNode.style.scrollBehavior = "";
    this.rect = null;
  }
  #props = once(() => mergeProps({
    ...this.scrollbarState.props,
    style: {
      position: "absolute",
      ...this.scrollbarState.props.style
    },
    [SCROLL_AREA_SCROLLBAR_ATTR]: "",
    onpointerdown: this.onpointerdown,
    onpointermove: this.onpointermove,
    onpointerup: this.onpointerup
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaThumbImplState {
  #id;
  #ref;
  #root;
  #scrollbarState;
  #removeUnlinkedScrollListener;
  #debounceScrollEnd = useDebounce(
    () => {
      if (this.#removeUnlinkedScrollListener) {
        this.#removeUnlinkedScrollListener();
        this.#removeUnlinkedScrollListener = void 0;
      }
    },
    100
  );
  #mounted;
  constructor(props, scrollbarState) {
    this.#root = scrollbarState.root;
    this.#scrollbarState = scrollbarState;
    this.#mounted = props.mounted;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.#scrollbarState.scrollbarVis.thumbNode = node;
      },
      deps: () => this.#mounted.current
    });
    this.onpointerdowncapture = this.onpointerdowncapture.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
  }
  onpointerdowncapture(e) {
    const thumb = e.target;
    if (!thumb) return;
    const thumbRect = thumb.getBoundingClientRect();
    const x = e.clientX - thumbRect.left;
    const y = e.clientY - thumbRect.top;
    this.#scrollbarState.handleThumbPointerDown({ x, y });
  }
  onpointerup(_) {
    this.#scrollbarState.handleThumbPointerUp();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-state": this.#scrollbarState.scrollbarVis.hasThumb ? "visible" : "hidden",
    style: {
      width: "var(--bits-scroll-area-thumb-width)",
      height: "var(--bits-scroll-area-thumb-height)",
      transform: this.#scrollbarState.scrollbarVis.prevTransformStyle
    },
    onpointerdowncapture: this.onpointerdowncapture,
    onpointerup: this.onpointerup,
    [SCROLL_AREA_THUMB_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaCornerImplState {
  #id;
  #ref;
  #root;
  #width = 0;
  #height = 0;
  #hasSize = once(() => Boolean(this.#width && this.#height));
  get hasSize() {
    return this.#hasSize();
  }
  constructor(props, root) {
    this.#root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    style: {
      width: this.#width,
      height: this.#height,
      position: "absolute",
      right: this.#root.dir.current === "ltr" ? 0 : void 0,
      left: this.#root.dir.current === "rtl" ? 0 : void 0,
      bottom: 0
    },
    [SCROLL_AREA_CORNER_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
const ScrollAreaRootContext = new Context("ScrollArea.Root");
const ScrollAreaScrollbarContext = new Context("ScrollArea.Scrollbar");
const ScrollAreaScrollbarVisibleContext = new Context("ScrollArea.ScrollbarVisible");
const ScrollAreaScrollbarAxisContext = new Context("ScrollArea.ScrollbarAxis");
const ScrollAreaScrollbarSharedContext = new Context("ScrollArea.ScrollbarShared");
function useScrollAreaRoot(props) {
  return ScrollAreaRootContext.set(new ScrollAreaRootState(props));
}
function useScrollAreaViewport(props) {
  return new ScrollAreaViewportState(props, ScrollAreaRootContext.get());
}
function useScrollAreaScrollbar(props) {
  return ScrollAreaScrollbarContext.set(new ScrollAreaScrollbarState(props, ScrollAreaRootContext.get()));
}
function useScrollAreaScrollbarVisible() {
  return ScrollAreaScrollbarVisibleContext.set(new ScrollAreaScrollbarVisibleState(ScrollAreaScrollbarContext.get()));
}
function useScrollAreaScrollbarAuto() {
  return new ScrollAreaScrollbarAutoState(ScrollAreaScrollbarContext.get());
}
function useScrollAreaScrollbarScroll() {
  return new ScrollAreaScrollbarScrollState(ScrollAreaScrollbarContext.get());
}
function useScrollAreaScrollbarHover() {
  return new ScrollAreaScrollbarHoverState(ScrollAreaScrollbarContext.get());
}
function useScrollAreaScrollbarX(props) {
  return ScrollAreaScrollbarAxisContext.set(new ScrollAreaScrollbarXState(props, ScrollAreaScrollbarVisibleContext.get()));
}
function useScrollAreaScrollbarY(props) {
  return ScrollAreaScrollbarAxisContext.set(new ScrollAreaScrollbarYState(props, ScrollAreaScrollbarVisibleContext.get()));
}
function useScrollAreaScrollbarShared() {
  return ScrollAreaScrollbarSharedContext.set(new ScrollAreaScrollbarSharedState(ScrollAreaScrollbarAxisContext.get()));
}
function useScrollAreaThumb(props) {
  return new ScrollAreaThumbImplState(props, ScrollAreaScrollbarSharedContext.get());
}
function useScrollAreaCorner(props) {
  return new ScrollAreaCornerImplState(props, ScrollAreaRootContext.get());
}
function toInt(value) {
  return value ? Number.parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return Number.isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer({
  pointerPos,
  pointerOffset,
  sizes,
  dir = "ltr"
}) {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll({ scrollPos, sizes, dir = "ltr" }) {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange[0], scrollClampRange[1]);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
function Scroll_area$1($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    type = "hover",
    dir = "ltr",
    scrollHideDelay = 600,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useScrollAreaRoot({
    type: box.with(() => type),
    dir: box.with(() => dir),
    scrollHideDelay: box.with(() => scrollHideDelay),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_viewport($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const viewportState = useScrollAreaViewport({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, viewportState.props);
  const mergedContentProps = mergeProps({}, viewportState.contentProps);
  $$payload.out += `<div${spread_attributes({ ...mergedProps }, { "svelte-w8xgs5": true })}><div${spread_attributes({ ...mergedContentProps }, { "svelte-w8xgs5": true })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_scrollbar_shared($$payload, $$props) {
  push();
  let {
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarSharedState = useScrollAreaScrollbarShared();
  const mergedProps = mergeProps(restProps, scrollbarSharedState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Scroll_area_scrollbar_x($$payload, $$props) {
  push();
  let { $$slots, $$events, ...restProps } = $$props;
  const isMounted = new IsMounted();
  const scrollbarXState = useScrollAreaScrollbarX({ mounted: box.with(() => isMounted.current) });
  const mergedProps = mergeProps(restProps, scrollbarXState.props);
  Scroll_area_scrollbar_shared($$payload, spread_props([mergedProps]));
  pop();
}
function Scroll_area_scrollbar_y($$payload, $$props) {
  push();
  let { $$slots, $$events, ...restProps } = $$props;
  const isMounted = new IsMounted();
  const scrollbarYState = useScrollAreaScrollbarY({ mounted: box.with(() => isMounted.current) });
  const mergedProps = mergeProps(restProps, scrollbarYState.props);
  Scroll_area_scrollbar_shared($$payload, spread_props([mergedProps]));
  pop();
}
function Scroll_area_scrollbar_visible($$payload, $$props) {
  push();
  let { $$slots, $$events, ...restProps } = $$props;
  const scrollbarVisibleState = useScrollAreaScrollbarVisible();
  if (scrollbarVisibleState.scrollbar.orientation.current === "horizontal") {
    $$payload.out += "<!--[-->";
    Scroll_area_scrollbar_x($$payload, spread_props([restProps]));
  } else {
    $$payload.out += "<!--[!-->";
    Scroll_area_scrollbar_y($$payload, spread_props([restProps]));
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Scroll_area_scrollbar_auto($$payload, $$props) {
  push();
  let {
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarAutoState = useScrollAreaScrollbarAuto();
  const mergedProps = mergeProps(restProps, scrollbarAutoState.props);
  {
    let presence = function($$payload2) {
      Scroll_area_scrollbar_visible($$payload2, spread_props([mergedProps]));
    };
    Presence_layer($$payload, spread_props([
      {
        present: forceMount || scrollbarAutoState.isVisible
      },
      mergedProps,
      { presence, $$slots: { presence: true } }
    ]));
  }
  pop();
}
function Scroll_area_scrollbar_scroll($$payload, $$props) {
  push();
  let {
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarScrollState = useScrollAreaScrollbarScroll();
  const mergedProps = mergeProps(restProps, scrollbarScrollState.props);
  {
    let presence = function($$payload2) {
      Scroll_area_scrollbar_visible($$payload2, spread_props([mergedProps]));
    };
    Presence_layer($$payload, spread_props([
      mergedProps,
      {
        present: forceMount || !scrollbarScrollState.isHidden,
        presence,
        $$slots: { presence: true }
      }
    ]));
  }
  pop();
}
function Scroll_area_scrollbar_hover($$payload, $$props) {
  push();
  let {
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarHoverState = useScrollAreaScrollbarHover();
  const scrollbarAutoState = useScrollAreaScrollbarAuto();
  const mergedProps = mergeProps(restProps, scrollbarHoverState.props, scrollbarAutoState.props, {
    "data-state": scrollbarHoverState.isVisible ? "visible" : "hidden"
  });
  const present = forceMount || scrollbarHoverState.isVisible && scrollbarAutoState.isVisible;
  {
    let presence = function($$payload2) {
      Scroll_area_scrollbar_visible($$payload2, spread_props([mergedProps]));
    };
    Presence_layer($$payload, spread_props([
      mergedProps,
      {
        present,
        presence,
        $$slots: { presence: true }
      }
    ]));
  }
  pop();
}
function Scroll_area_scrollbar$1($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    orientation,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarState = useScrollAreaScrollbar({
    orientation: box.with(() => orientation),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const type = scrollbarState.root.type.current;
  if (type === "hover") {
    $$payload.out += "<!--[-->";
    Scroll_area_scrollbar_hover($$payload, spread_props([restProps, { id }]));
  } else {
    $$payload.out += "<!--[!-->";
    if (type === "scroll") {
      $$payload.out += "<!--[-->";
      Scroll_area_scrollbar_scroll($$payload, spread_props([restProps, { id }]));
    } else {
      $$payload.out += "<!--[!-->";
      if (type === "auto") {
        $$payload.out += "<!--[-->";
        Scroll_area_scrollbar_auto($$payload, spread_props([restProps, { id }]));
      } else {
        $$payload.out += "<!--[!-->";
        if (type === "always") {
          $$payload.out += "<!--[-->";
          Scroll_area_scrollbar_visible($$payload, spread_props([restProps, { id }]));
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_thumb_impl($$payload, $$props) {
  push();
  let {
    ref = null,
    id,
    child,
    children,
    present,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const isMounted = new IsMounted();
  const thumbState = useScrollAreaThumb({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    mounted: box.with(() => isMounted.current)
  });
  const mergedProps = mergeProps(restProps, thumbState.props, { style: { hidden: !present } });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_thumb($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarState = ScrollAreaScrollbarVisibleContext.get();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      let presence = function($$payload3, { present }) {
        Scroll_area_thumb_impl($$payload3, spread_props([
          restProps,
          {
            id,
            present: present.current,
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
      };
      Presence_layer($$payload2, spread_props([
        { present: forceMount || scrollbarState.hasThumb },
        restProps,
        { id, presence, $$slots: { presence: true } }
      ]));
    }
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_corner_impl($$payload, $$props) {
  push();
  let {
    ref = null,
    id,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const cornerState = useScrollAreaCorner({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, cornerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_corner($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollAreaState = ScrollAreaRootContext.get();
  const hasBothScrollbarsVisible = Boolean(scrollAreaState.scrollbarXNode && scrollAreaState.scrollbarYNode);
  const hasCorner = scrollAreaState.type.current !== "scroll" && hasBothScrollbarsVisible;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (hasCorner) {
      $$payload2.out += "<!--[-->";
      Scroll_area_corner_impl($$payload2, spread_props([
        restProps,
        {
          id,
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          }
        }
      ]));
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function useTimeoutFn(cb, interval, options = {}) {
  const { immediate = true } = options;
  const isPending = box(false);
  let timer;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.current = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.current = true;
    timer = setTimeout(
      () => {
        isPending.current = false;
        timer = null;
        cb(...args);
      },
      interval
    );
  }
  if (immediate) {
    isPending.current = true;
    if (isBrowser) start();
  }
  return {
    isPending: box.readonly(isPending),
    start,
    stop
  };
}
class TooltipProviderState {
  delayDuration;
  disableHoverableContent;
  disableCloseOnTriggerClick;
  disabled;
  ignoreNonKeyboardFocus;
  skipDelayDuration;
  isOpenDelayed = true;
  isPointerInTransit = box(false);
  #timerFn;
  constructor(props) {
    this.delayDuration = props.delayDuration;
    this.disableHoverableContent = props.disableHoverableContent;
    this.disableCloseOnTriggerClick = props.disableCloseOnTriggerClick;
    this.disabled = props.disabled;
    this.ignoreNonKeyboardFocus = props.ignoreNonKeyboardFocus;
    this.skipDelayDuration = props.skipDelayDuration;
    this.#timerFn = useTimeoutFn(
      () => {
        this.isOpenDelayed = true;
      },
      this.skipDelayDuration.current,
      { immediate: false }
    );
  }
  #startTimer = () => {
    this.#timerFn.start();
  };
  #clearTimer = () => {
    this.#timerFn.stop();
  };
  onOpen = () => {
    this.#clearTimer();
    this.isOpenDelayed = false;
  };
  onClose = () => {
    this.#startTimer();
  };
}
const TooltipProviderContext = new Context("Tooltip.Provider");
function useTooltipProvider(props) {
  return TooltipProviderContext.set(new TooltipProviderState(props));
}
function Tooltip_provider($$payload, $$props) {
  push();
  let {
    children,
    delayDuration = 700,
    disableCloseOnTriggerClick = false,
    disableHoverableContent = false,
    disabled = false,
    ignoreNonKeyboardFocus = false,
    skipDelayDuration = 300
  } = $$props;
  useTooltipProvider({
    delayDuration: box.with(() => delayDuration),
    disableCloseOnTriggerClick: box.with(() => disableCloseOnTriggerClick),
    disableHoverableContent: box.with(() => disableHoverableContent),
    disabled: box.with(() => disabled),
    ignoreNonKeyboardFocus: box.with(() => ignoreNonKeyboardFocus),
    skipDelayDuration: box.with(() => skipDelayDuration)
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
const Provider = Tooltip_provider;
function Sidebar_provider($$payload, $$props) {
  push();
  let {
    ref = null,
    open = true,
    onOpenChange = () => {
    },
    class: className,
    style,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  setSidebar({
    open: () => open,
    setOpen: (value) => {
      open = value;
      onOpenChange(value);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
  });
  $$payload.out += `<!---->`;
  Provider($$payload, {
    delayDuration: 0,
    children: ($$payload2) => {
      $$payload2.out += `<div${spread_attributes({
        style: `--sidebar-width: ${stringify(SIDEBAR_WIDTH)}; --sidebar-width-icon: ${stringify(SIDEBAR_WIDTH_ICON)}; ${stringify(style)}`,
        class: clsx(cn("group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full", className)),
        ...restProps
      })}>`;
      children?.($$payload2);
      $$payload2.out += `<!----></div>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { ref, open });
  pop();
}
function Separator($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    orientation = "horizontal",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Separator$1($$payload2, spread_props([
      {
        class: cn("bg-border shrink-0", orientation === "horizontal" ? "h-[1px] w-full" : "min-h-full w-[1px]", className),
        orientation
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root = Dialog;
function Sidebar($$payload, $$props) {
  push();
  let {
    ref = null,
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const sidebar = useSidebar();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (collapsible === "none") {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div${spread_attributes({
        class: clsx(cn("bg-sidebar text-sidebar-foreground flex h-full w-[--sidebar-width] flex-col", className)),
        ...restProps
      })}>`;
      children?.($$payload2);
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      if (sidebar.isMobile) {
        $$payload2.out += "<!--[-->";
        var bind_get = () => sidebar.openMobile;
        var bind_set = (v) => sidebar.setOpenMobile(v);
        $$payload2.out += `<!---->`;
        Root($$payload2, spread_props([
          {
            get open() {
              return bind_get();
            },
            set open($$value) {
              bind_set($$value);
            }
          },
          restProps,
          {
            children: ($$payload3) => {
              $$payload3.out += `<!---->`;
              Sheet_content($$payload3, {
                "data-sidebar": "sidebar",
                "data-mobile": "true",
                class: "bg-sidebar text-sidebar-foreground w-[--sidebar-width] p-0 [&>button]:hidden",
                style: `--sidebar-width: ${stringify(SIDEBAR_WIDTH_MOBILE)};`,
                side,
                children: ($$payload4) => {
                  $$payload4.out += `<div class="flex h-full w-full flex-col">`;
                  children?.($$payload4);
                  $$payload4.out += `<!----></div>`;
                },
                $$slots: { default: true }
              });
              $$payload3.out += `<!---->`;
            },
            $$slots: { default: true }
          }
        ]));
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="text-sidebar-foreground group peer hidden md:block"${attr("data-state", sidebar.state)}${attr("data-collapsible", sidebar.state === "collapsed" ? collapsible : "")}${attr("data-variant", variant)}${attr("data-side", side)}><div${attr("class", clsx(cn("relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]")))}></div> <div${spread_attributes({
          class: clsx(cn(
            "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
            side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )),
          ...restProps
        })}><div data-sidebar="sidebar" class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow">`;
        children?.($$payload2);
        $$payload2.out += `<!----></div></div></div>`;
      }
      $$payload2.out += `<!--]-->`;
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_scrollbar($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    orientation = "vertical",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Scroll_area_scrollbar$1($$payload2, spread_props([
      {
        orientation,
        class: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px", orientation === "horizontal" && "h-2.5 w-full border-t border-t-transparent p-px", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          children?.($$payload3);
          $$payload3.out += `<!----> <!---->`;
          Scroll_area_thumb($$payload3, {
            class: cn("bg-border relative rounded-full", orientation === "vertical" && "flex-1")
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Scroll_area($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    orientation = "vertical",
    scrollbarXClasses = "",
    scrollbarYClasses = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Scroll_area$1($$payload2, spread_props([
      restProps,
      {
        class: cn("relative overflow-hidden", className),
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Scroll_area_viewport($$payload3, {
            class: "h-full w-full rounded-[inherit]",
            children: ($$payload4) => {
              children?.($$payload4);
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          if (orientation === "vertical" || orientation === "both") {
            $$payload3.out += "<!--[-->";
            Scroll_area_scrollbar($$payload3, {
              orientation: "vertical",
              class: scrollbarYClasses
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (orientation === "horizontal" || orientation === "both") {
            $$payload3.out += "<!--[-->";
            Scroll_area_scrollbar($$payload3, {
              orientation: "horizontal",
              class: scrollbarXClasses
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <!---->`;
          Scroll_area_corner($$payload3, {});
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function AppSidebar($$payload, $$props) {
  push();
  function handleNameFilter(event) {
    window.umami.track("filter/name", { value: gState.nameFilter });
  }
  function handleDescriptionFilter(event) {
    window.umami.track("filter/description", { value: gState.descriptionFilter });
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Sidebar($$payload2, {
      children: ($$payload3) => {
        Sidebar_header($$payload3, {
          children: ($$payload4) => {
            SiteTitle($$payload4, {});
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Sidebar_content($$payload3, {
          children: ($$payload4) => {
            Sidebar_group($$payload4, {
              children: ($$payload5) => {
                Sidebar_group_label($$payload5, {
                  class: "text-base",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Filters`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Sidebar_group_content($$payload5, {
                  children: ($$payload6) => {
                    Sidebar_group($$payload6, {
                      children: ($$payload7) => {
                        Sidebar_group_label($$payload7, {
                          class: "flex justify-between text-sm space-x-4",
                          children: ($$payload8) => {
                            $$payload8.out += `<span>Name</span> `;
                            Badge($$payload8, {
                              class: "cursor-pointer",
                              onclick: () => gState.nameFilter = "",
                              variant: "outline",
                              children: ($$payload9) => {
                                $$payload9.out += `<!---->Clear`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Sidebar_group_content($$payload7, {
                          children: ($$payload8) => {
                            Sidebar_input($$payload8, {
                              class: "h-12",
                              id: "name-input",
                              onchange: handleNameFilter,
                              placeholder: "Search with name...",
                              get value() {
                                return gState.nameFilter;
                              },
                              set value($$value) {
                                gState.nameFilter = $$value;
                                $$settled = false;
                              }
                            });
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Sidebar_group($$payload6, {
                      children: ($$payload7) => {
                        Sidebar_group_label($$payload7, {
                          class: "flex justify-between text-sm space-x-4",
                          children: ($$payload8) => {
                            $$payload8.out += `<span>Description</span> `;
                            Badge($$payload8, {
                              class: "cursor-pointer",
                              onclick: () => gState.descriptionFilter = "",
                              variant: "outline",
                              children: ($$payload9) => {
                                $$payload9.out += `<!---->Clear`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Sidebar_group_content($$payload7, {
                          children: ($$payload8) => {
                            Sidebar_input($$payload8, {
                              class: "h-12",
                              id: "description-input",
                              onchange: handleDescriptionFilter,
                              placeholder: "Search with description...",
                              get value() {
                                return gState.descriptionFilter;
                              },
                              set value($$value) {
                                gState.descriptionFilter = $$value;
                                $$settled = false;
                              }
                            });
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Sidebar_group($$payload6, {
                      children: ($$payload7) => {
                        Sidebar_group_label($$payload7, {
                          class: "flex justify-between text-sm space-x-4",
                          children: ($$payload8) => {
                            $$payload8.out += `<span>Repository</span> <span>`;
                            Badge($$payload8, {
                              variant: "outline",
                              children: ($$payload9) => {
                                $$payload9.out += `<!---->${escape_html(gState.repoFilter.length)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!----> `;
                            Badge($$payload8, {
                              class: "cursor-pointer",
                              onclick: () => gState.repoFilter.splice(0, gState.repoFilter.length),
                              variant: "outline",
                              children: ($$payload9) => {
                                $$payload9.out += `<!---->Clear`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!----></span>`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Sidebar_group_content($$payload7, {
                          children: ($$payload8) => {
                            Scroll_area($$payload8, {
                              class: "h-72 w-full rounded-md border bg-background",
                              children: ($$payload9) => {
                                const each_array = ensure_array_like(gState.repositories);
                                $$payload9.out += `<div class="p-4"><!--[-->`;
                                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                                  let repo = each_array[$$index];
                                  $$payload9.out += `<button class="flex w-full items-center text-sm space-x-2" aria-label="clickable repository">`;
                                  Check($$payload9, {
                                    class: cn("inline-block h-4 w-4", gState.repoFilter.includes(repo) ? "visible" : "invisible")
                                  });
                                  $$payload9.out += `<!----> <span${attr("title", repo)} class="truncate max-w-44">${escape_html(repo)}</span></button> `;
                                  Separator($$payload9, { class: "my-2" });
                                  $$payload9.out += `<!---->`;
                                }
                                $$payload9.out += `<!--]--></div>`;
                              },
                              $$slots: { default: true }
                            });
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Sidebar_group($$payload6, {
                      children: ($$payload7) => {
                        Sidebar_group_label($$payload7, {
                          class: "flex justify-between text-sm space-x-4",
                          children: ($$payload8) => {
                            $$payload8.out += `<span>Category</span> <span>`;
                            Badge($$payload8, {
                              variant: "outline",
                              children: ($$payload9) => {
                                $$payload9.out += `<!---->${escape_html(gState.categoryFilter.length)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!----> `;
                            Badge($$payload8, {
                              class: "cursor-pointer",
                              onclick: () => gState.categoryFilter.splice(0, gState.categoryFilter.length),
                              variant: "outline",
                              children: ($$payload9) => {
                                $$payload9.out += `<!---->Clear`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!----></span>`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Sidebar_group_content($$payload7, {
                          children: ($$payload8) => {
                            Scroll_area($$payload8, {
                              class: "h-72 w-full rounded-md border bg-background",
                              children: ($$payload9) => {
                                const each_array_1 = ensure_array_like(gState.categories);
                                $$payload9.out += `<div class="p-4"><!--[-->`;
                                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                                  let repo = each_array_1[$$index_1];
                                  $$payload9.out += `<button class="flex w-full items-center text-sm space-x-2" aria-label="clickable repository">`;
                                  Check($$payload9, {
                                    class: cn("inline-block h-4 w-4", gState.categoryFilter.includes(repo) ? "visible" : "invisible")
                                  });
                                  $$payload9.out += `<!----> <span${attr("title", repo)} class="truncate max-w-44">${escape_html(repo)}</span></button> `;
                                  Separator($$payload9, { class: "my-2" });
                                  $$payload9.out += `<!---->`;
                                }
                                $$payload9.out += `<!--]--></div>`;
                              },
                              $$slots: { default: true }
                            });
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Sidebar_group($$payload6, {
                      children: ($$payload7) => {
                        Sidebar_group_label($$payload7, {
                          class: "flex justify-between text-sm space-x-4",
                          children: ($$payload8) => {
                            $$payload8.out += `<span>Type</span> <span>`;
                            Badge($$payload8, {
                              variant: "outline",
                              children: ($$payload9) => {
                                $$payload9.out += `<!---->${escape_html(gState.typeFilter.length)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!----> `;
                            Badge($$payload8, {
                              class: "cursor-pointer",
                              onclick: () => gState.typeFilter.splice(0, gState.typeFilter.length),
                              variant: "outline",
                              children: ($$payload9) => {
                                $$payload9.out += `<!---->Clear`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload8.out += `<!----></span>`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Sidebar_group_content($$payload7, {
                          children: ($$payload8) => {
                            Scroll_area($$payload8, {
                              class: "h-72 w-full rounded-md border bg-background",
                              children: ($$payload9) => {
                                const each_array_2 = ensure_array_like(gState.types);
                                $$payload9.out += `<div class="p-4"><!--[-->`;
                                for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                                  let type = each_array_2[$$index_2];
                                  $$payload9.out += `<button class="flex w-full items-center text-sm" aria-label="clickable type">`;
                                  Check($$payload9, {
                                    class: cn("mr-2 inline-block h-4 w-4", gState.typeFilter.includes(type) ? "visible" : "invisible")
                                  });
                                  $$payload9.out += `<!----> <span${attr("title", type)} class="truncate max-w-44">${escape_html(type)}</span></button> `;
                                  Separator($$payload9, { class: "my-2" });
                                  $$payload9.out += `<!---->`;
                                }
                                $$payload9.out += `<!--]--></div>`;
                              },
                              $$slots: { default: true }
                            });
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Sidebar_footer($$payload3, {});
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Mode_watcher_lite($$payload, $$props) {
  push();
  let themeColors2 = fallback($$props["themeColors"], () => void 0, true);
  if (themeColors2) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { themeColors: themeColors2 });
  pop();
}
function Mode_watcher_full($$payload, $$props) {
  push();
  let trueNonce = fallback($$props["trueNonce"], "");
  let initConfig = $$props["initConfig"];
  let themeColors2 = fallback($$props["themeColors"], () => void 0, true);
  head($$payload, ($$payload2) => {
    if (themeColors2) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> ${html(`<script${trueNonce ? ` nonce=${trueNonce}` : ""}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`;
  });
  bind_props($$props, { trueNonce, initConfig, themeColors: themeColors2 });
  pop();
}
function Mode_watcher($$payload, $$props) {
  push();
  let trueNonce;
  let track = fallback($$props["track"], true);
  let defaultMode = fallback($$props["defaultMode"], "system");
  let themeColors$1 = fallback($$props["themeColors"], () => void 0, true);
  let disableTransitions$1 = fallback($$props["disableTransitions"], true);
  let darkClassNames$1 = fallback($$props["darkClassNames"], () => ["dark"], true);
  let lightClassNames$1 = fallback($$props["lightClassNames"], () => [], true);
  let defaultTheme = fallback($$props["defaultTheme"], "");
  let nonce = fallback($$props["nonce"], "");
  let themeStorageKey$1 = fallback($$props["themeStorageKey"], "mode-watcher-theme");
  let modeStorageKey$1 = fallback($$props["modeStorageKey"], "mode-watcher-mode");
  let disableHeadScriptInjection = fallback($$props["disableHeadScriptInjection"], false);
  const initConfig = defineConfig({
    defaultMode,
    themeColors: themeColors$1,
    darkClassNames: darkClassNames$1,
    lightClassNames: lightClassNames$1,
    defaultTheme,
    modeStorageKey: modeStorageKey$1,
    themeStorageKey: themeStorageKey$1
  });
  disableTransitions.set(disableTransitions$1);
  themeColors.set(themeColors$1);
  darkClassNames.set(darkClassNames$1);
  lightClassNames.set(lightClassNames$1);
  modeStorageKey.set(modeStorageKey$1);
  themeStorageKey.set(themeStorageKey$1);
  trueNonce = typeof window === "undefined" ? nonce : "";
  if (disableHeadScriptInjection) {
    $$payload.out += "<!--[-->";
    Mode_watcher_lite($$payload, { themeColors: themeColors$1 });
  } else {
    $$payload.out += "<!--[!-->";
    Mode_watcher_full($$payload, { trueNonce, initConfig, themeColors: themeColors$1 });
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    track,
    defaultMode,
    themeColors: themeColors$1,
    disableTransitions: disableTransitions$1,
    darkClassNames: darkClassNames$1,
    lightClassNames: lightClassNames$1,
    defaultTheme,
    nonce,
    themeStorageKey: themeStorageKey$1,
    modeStorageKey: modeStorageKey$1,
    disableHeadScriptInjection
  });
  pop();
}
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  Mode_watcher($$payload, {});
  $$payload.out += `<!----> `;
  Sidebar_provider($$payload, {
    style: "--sidebar-width: 18rem",
    children: ($$payload2) => {
      AppSidebar($$payload2);
      $$payload2.out += `<!----> <main class="w-full h-full">`;
      children?.($$payload2);
      $$payload2.out += `<!----></main>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
export {
  _layout as default
};
