import { cx } from "emotion";
import React from "react";

import { extendedForwardRef } from "@/components/element";
import { ModifierProps, modify } from "@/modifiers";
import { Colors } from "@/modifiers/colors";
import { ButtonGroup } from "./button-group";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ButtonModifierProps = Partial<{
  as: "a" | "button" | "span" | React.ComponentType<any>;
  children: React.ReactNode;
  color: Colors;
  disabled: boolean;
  fullwidth: boolean;
  inverted: boolean;
  isSelected: boolean;
  isStatic: boolean;
  loading: boolean;
  onClick: React.MouseEventHandler<any>;
  outlined: boolean;
  remove: boolean;
  reset: boolean;
  rounded: boolean;
  size: "small" | "medium" | "large";
  state: "hover" | "focus" | "active" | "loading";
  submit: boolean;
  text: boolean;
}>;

export type ButtonProps = ModifierProps &
  ButtonModifierProps &
  Partial<
    Omit<
      React.ComponentPropsWithoutRef<"a" | "button" | "span">,
      "color" | "unselectable"
    >
  >;

export const Button = Object.assign(
  extendedForwardRef<ButtonProps, "button">((props, ref) => {
    const {
      as,
      children,
      color,
      size,
      outlined,
      inverted,
      state,
      submit,
      reset,
      fullwidth,
      loading,
      disabled,
      remove,
      isSelected,
      isStatic,
      rounded,
      onClick,
      text,
      ...rest
    } = modify(props);
    rest.className = cx(rest.className, {
      button: !remove,
      delete: remove,
      [`is-${color}`]: color,
      [`is-${size}`]: size,
      [`is-${state}`]: state,
      "is-fullwidth": fullwidth,
      "is-inverted": inverted,
      "is-loading": loading,
      "is-outlined": outlined,
      "is-rounded": rounded,
      "is-selected": isSelected,
      "is-static": isStatic,
      "is-text": text,
    });

    let element = isStatic ? "span" : as!;
    let type: string | undefined;

    if (submit) {
      element = "button";
      type = "submit";
    }
    if (reset) {
      element = "button";
      type = "reset";
    }

    return React.createElement(
      element,
      {
        ...rest,
        disabled,
        onClick: disabled ? undefined : onClick,
        ref,
        tabIndex: disabled ? -1 : 0,
        type,
      },
      children,
    );
  }, "button"),
  { Group: ButtonGroup },
);

Button.defaultProps = Object.assign(
  {
    disabled: false,
    fullwidth: false,
    inverted: false,
    isSelected: false,
    isStatic: false,
    loading: false,
    onClick: () => null,
    outlined: false,
    remove: false,
    reset: false,
    rounded: false,
    submit: false,
    text: false,
  },
  Button.defaultProps,
);
