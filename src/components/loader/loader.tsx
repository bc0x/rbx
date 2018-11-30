import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type LoaderProps = ModifierProps;

export const Loader = asExoticComponent<LoaderProps, "div">((props, ref) => {
  const { as, ...rest } = transformModifiers(props);
  rest.className = cx("loader", rest.className);
  return React.createElement(as!, { ref, ...rest });
}, "div");

Loader.defaultProps = Object.assign({ children: null }, Loader.defaultProps);