import { useState } from "react";
import { isClient } from "utils";

export const useOpenAttributeState = <
  TElement extends HTMLDetailsElement | HTMLDialogElement
>({
  initialState = false,
  getElement,
}: {
  initialState?: boolean | (() => boolean);
  getElement?: () => null | undefined | TElement;
} = {}) => {
  return useState(function initializeOpenAttributeState() {
    if (isClient() && typeof getElement === "function") {
      return Boolean(getElement()?.open);
    }

    return typeof initialState === "function" ? initialState() : initialState;
  });
};
