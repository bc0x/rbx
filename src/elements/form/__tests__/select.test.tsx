import Enzyme from "enzyme";
import React from "react";

import { COLORS } from "../../../base/helpers";
import {
  Select,
  SELECT_CONTAINER_SIZES,
  SELECT_CONTAINER_STATES,
  SelectContainer,
} from "../select";
import { SelectOption } from "../select-option";

import {
  hasProperties,
  testGenericPropTypes,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

describe("Select component", () => {
  hasProperties(Select, {
    Container: SelectContainer,
    Option: SelectOption,
    defaultProps: { as: "select" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<Select />);
    expect(wrapper.is("select")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<Select as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLSelectElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <Select ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find("select").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<Select className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = Select;
    testGenericPropTypes(propTypes);
  });
});

describe("SelectContainer component", () => {
  hasProperties(SelectContainer, {
    defaultProps: { as: "div" },
  });

  it("should render as the default element", () => {
    const wrapper = Enzyme.shallow(<SelectContainer />);
    expect(wrapper.is("div")).toBe(true);
  });

  it("should render as a custom component", () => {
    const as = "span";
    const wrapper = Enzyme.shallow(<SelectContainer as={as} />);
    expect(wrapper.is(as)).toBe(true);
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    const wrapper = Enzyme.mount(
      <div>
        <SelectContainer ref={ref} />
      </div>,
    );
    try {
      expect(ref.current).toBe(wrapper.find(".select").instance());
    } finally {
      wrapper.unmount();
    }
  });

  it("should have bulma className", () => {
    const wrapper = Enzyme.shallow(<SelectContainer />);
    expect(wrapper.hasClass("select")).toBe(true);
  });

  it("should preserve custom className", () => {
    const className = "foo";
    const wrapper = Enzyme.shallow(<SelectContainer className={className} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  COLORS.map(color =>
    it(`should be ${color}`, () => {
      const wrapper = Enzyme.shallow(<SelectContainer color={color} />);
      expect(wrapper.hasClass(`is-${color}`)).toBe(true);
    }),
  );

  [false, true].map(fullwidth =>
    it(`should ${fullwidth ? "" : "not "} be fullwidth`, () => {
      const wrapper = Enzyme.shallow(<SelectContainer fullwidth={fullwidth} />);
      expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
    }),
  );

  [false, true].map(rounded =>
    it(`should ${rounded ? "" : "not "} be rounded`, () => {
      const wrapper = Enzyme.shallow(<SelectContainer rounded={rounded} />);
      expect(wrapper.hasClass("is-rounded")).toBe(rounded);
    }),
  );

  SELECT_CONTAINER_SIZES.map(size =>
    it(`should be ${size}`, () => {
      const wrapper = Enzyme.shallow(<SelectContainer size={size} />);
      expect(wrapper.hasClass(`is-${size}`)).toBe(true);
    }),
  );

  SELECT_CONTAINER_STATES.map(state =>
    ["element", "component"].map(type =>
      it(`should be ${state} with ${type}`, () => {
        const wrapper = Enzyme.shallow(
          <SelectContainer state={state}>
            {type === "element" ? <select /> : <Select />}
          </SelectContainer>,
        );
        if (state === "loading") {
          expect(wrapper.hasClass("is-loading")).toBe(true);
        } else {
          expect(wrapper.children().hasClass(`is-${state}`)).toBe(true);
        }
      }),
    ),
  );

  [false, true].map(multiple =>
    ["element", "component"].map(type =>
      it(`should ${multiple ? "" : "not "}infer multiple from ${type}`, () => {
        const wrapper = Enzyme.shallow(
          <SelectContainer>
            {type === "element" ? (
              <select multiple={multiple} />
            ) : (
              <Select multiple={multiple} />
            )}
          </SelectContainer>,
        );
        expect(wrapper.hasClass("is-multiple")).toBe(multiple);
      }),
    ),
  );

  it("should infer with multiple children", () => {
    const wrapper = Enzyme.shallow(
      <SelectContainer>
        <div className="hidden-element" />
        <select multiple />
      </SelectContainer>,
    );
    expect(wrapper.hasClass("is-multiple")).toBe(true);
  });

  describe("propTypes", () => {
    const { propTypes } = SelectContainer;
    testGenericPropTypes(propTypes);
    validateOneOfPropType(propTypes, "color", COLORS);
    validateBoolPropType(propTypes, "fullwidth");
    validateBoolPropType(propTypes, "rounded");
    validateOneOfPropType(propTypes, "size", SELECT_CONTAINER_SIZES);
    validateOneOfPropType(propTypes, "state", SELECT_CONTAINER_STATES);
  });
});
