import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { tuple } from "../../utils";
import { PaginationEllipsis } from "./pagination-ellipsis";
import { PaginationLink } from "./pagination-link";
import { PaginationList } from "./pagination-list";
import { PaginationNext } from "./pagination-next";
import { PaginationPrevious } from "./pagination-previous";

export const PAGINATION_ALIGNMENTS = tuple("centered", "right");
export type PaginationAlignments = (typeof PAGINATION_ALIGNMENTS)[number];

export const PAGINATION_SIZES = tuple("small", "medium", "large");
export type PaginationSizes = (typeof PAGINATION_SIZES)[number];

export type PaginationModifiers = Partial<{
  align: PaginationAlignments;
  rounded: boolean;
  size: PaginationSizes;
}>;

export type PaginationProps = HelpersProps & PaginationModifiers;

const propTypes = {
  align: PropTypes.oneOf(PAGINATION_ALIGNMENTS),
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(PAGINATION_SIZES),
};

export const Pagination = Object.assign(
  forwardRefAs<PaginationProps, "nav">(
    ({ align, className, rounded, size, ...rest }, ref) => (
      <Generic
        className={classNames(
          "pagination",
          {
            [`is-${align}`]: align,
            "is-rounded": rounded,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "nav" },
  ),
  {
    Ellipsis: PaginationEllipsis,
    Link: PaginationLink,
    List: PaginationList,
    Next: PaginationNext,
    Previous: PaginationPrevious,
    propTypes,
  },
);
