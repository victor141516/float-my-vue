declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    color: "dark" | "light";
    arrowSize: number;
    offset: {
        x?: number;
        y?: number;
    };
    side: "left" | "top" | "bottom" | "right";
    open: boolean;
}>, {
    color: string;
    arrowSize: number;
    offset: () => {
        x: number;
        y: number;
    };
    side: string;
    open: boolean;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    open: () => void;
    close: () => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    color: "dark" | "light";
    arrowSize: number;
    offset: {
        x?: number;
        y?: number;
    };
    side: "left" | "top" | "bottom" | "right";
    open: boolean;
}>, {
    color: string;
    arrowSize: number;
    offset: () => {
        x: number;
        y: number;
    };
    side: string;
    open: boolean;
}>>> & {
    onOpen?: () => any;
    onClose?: () => any;
}, {
    offset: {
        x: number;
        y: number;
    };
    open: boolean;
    color: "dark" | "light";
    arrowSize: number;
    side: "left" | "top" | "bottom" | "right";
}>, {
    reference?(_: {}): any;
    arrow?(_: {}): any;
    float?(_: {}): any;
    content?(_: {}): any;
}>;
export default _default;
declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
declare type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
declare type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
