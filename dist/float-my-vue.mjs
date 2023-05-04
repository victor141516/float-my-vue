import { defineComponent as S, computed as g, ref as h, watch as w, reactive as z, onBeforeUnmount as k, openBlock as p, createElementBlock as v, createElementVNode as y, renderSlot as c, normalizeStyle as b, unref as f, normalizeClass as _, createCommentVNode as m } from "vue";
const $ = { class: "relative" }, M = {
  key: 0,
  class: "absolute"
}, O = /* @__PURE__ */ S({
  __name: "FloatMyVue",
  props: {
    color: { default: "dark" },
    arrowSize: { default: 10 },
    offset: { default: () => ({ x: 0, y: 0 }) },
    side: { default: "top" },
    open: { type: Boolean, default: !1 }
  },
  emits: ["open", "close"],
  setup(n) {
    const t = n, r = g(() => {
      const e = Object.assign({ x: 0, y: 0 }, t.offset);
      return (t.side === "top" || t.side === "bottom") && (e.x -= 2), e;
    }), i = h(!1);
    w(
      () => t.open,
      (e) => i.value = e,
      { immediate: !0 }
    );
    const o = h(null), l = h(null), d = z({ width: 0, height: 0 }), a = z({ width: 0, height: 0 }), s = {};
    w(
      () => o.value,
      () => {
        if (o.value) {
          const e = new ResizeObserver(() => {
            o.value && (d.width = o.value.clientWidth, d.height = o.value.clientHeight);
          });
          e.observe(o.value), s.tooltip = () => o.value && e.unobserve(o.value);
        } else
          s.tooltip?.(), s.tooltip = void 0;
      },
      { immediate: !0 }
    ), w(
      () => l.value,
      () => {
        if (l.value && !s.reference) {
          const e = new ResizeObserver(() => {
            a.width = l.value.clientWidth, a.height = l.value.clientHeight;
          });
          e.observe(l.value), s.reference = () => e.unobserve(l.value);
        }
      },
      { immediate: !0 }
    ), k(() => {
      s.tooltip?.(), s.reference?.();
    });
    const u = g(() => {
      const e = {
        arrow: { x: 0, y: 0 },
        tooltip: { x: 0, y: 0 }
      };
      return t.side === "top" || t.side === "bottom" ? (e.arrow.x = -1 * (t.arrowSize - a.width / 2 + r.value.x), e.arrow.y = -1 * (t.arrowSize + (t.side === "top" ? a.height : 0) + r.value.y), e.tooltip.x = -1 * (d.width / 2 - a.width / 2 + r.value.x), t.side === "top" ? e.tooltip.y = -1 * (a.height + d?.height + t.arrowSize + r.value.y - 1) : e.tooltip.y = -1 * (r.value.y - t.arrowSize)) : (e.arrow.x = -1 * (t.arrowSize - (t.side === "right" ? a.width : 0) + r.value.x), e.arrow.y = -1 * (t.arrowSize + a.height / 2 + r.value.x), t.side === "right" ? e.tooltip.x = -1 * (r.value.x - a.width - t.arrowSize) : e.tooltip.x = -1 * (d.width + t.arrowSize + r.value.x), e.tooltip.y = -1 * (d.height / 2 + a.height / 2 + r.value.x)), e;
    });
    return (e, x) => (p(), v("div", $, [
      y("div", {
        ref_key: "referenceElementRef",
        ref: l,
        onClick: x[0] || (x[0] = () => {
          i.value = !i.value, e.$emit(i.value ? "open" : "close");
        })
      }, [
        c(e.$slots, "reference", {}, void 0, !0)
      ], 512),
      i.value ? (p(), v("div", M, [
        l.value ? (p(), v("div", {
          key: 0,
          "data-testid": "arrow-translate",
          class: "absolute h-0 w-0",
          style: b(`transform: translateX(${Math.round(
            f(u).arrow.x
          )}px) translateY(${Math.round(f(u).arrow.y)}px);`)
        }, [
          c(e.$slots, "arrow", {}, () => [
            y("div", {
              role: "presentation",
              "data-testid": "arrow-default",
              class: _(["border-solid", [
                `border-[${n.arrowSize}px]`,
                { dark: "border-slate-900", light: "border-gray-300" }[t.color],
                {
                  top: "border-b-transparent border-x-transparent",
                  right: "border-l-transparent border-y-transparent",
                  bottom: "border-t-transparent border-x-transparent",
                  left: "border-r-transparent border-y-transparent"
                }[t.side]
              ]]),
              style: b({
                "border-width": `${n.arrowSize}px`,
                "clip-path": `polygon(${{
                  top: "0% 0%, 50% 50%, 100% 0%",
                  right: "100% 0%, 50% 50%, 100% 100%",
                  bottom: "0% 100%, 50% 50%, 100% 100%",
                  left: "0% 0%, 50% 50%, 0% 100%"
                }[t.side]});`
              })
            }, null, 6)
          ], !0)
        ], 4)) : m("", !0),
        l.value ? (p(), v("div", {
          key: 1,
          "data-testid": "tooltip-translate",
          ref_key: "tooltipRef",
          ref: o,
          class: "absolute",
          style: b(`transform: translateX(${Math.round(
            f(u).tooltip.x
          )}px) translateY(${Math.round(f(u).tooltip.y)}px);`)
        }, [
          c(e.$slots, "float", {}, () => [
            y("div", {
              role: "tooltip",
              "data-testid": "tooltip-default",
              class: _([
                "px-1 py-2 rounded-lg text-sm w-52",
                { dark: "bg-slate-900 text-white", light: "bg-gray-300 text-slate-900" }[t.color]
              ])
            }, [
              c(e.$slots, "content", {}, void 0, !0)
            ], 2)
          ], !0)
        ], 4)) : m("", !0)
      ])) : m("", !0)
    ]));
  }
});
const E = (n, t) => {
  const r = n.__vccOpts || n;
  for (const [i, o] of t)
    r[i] = o;
  return r;
}, V = /* @__PURE__ */ E(O, [["__scopeId", "data-v-dcbfa26f"]]);
export {
  V as FloatMyVue
};
