import { useCallback, useState, useTransition } from "react";

type StartEnhancement = () => void;
export function useClientEnhancement({ deferred }: { deferred: false }): [
  {
    enhanced: boolean;
    pending: false;
  },
  StartEnhancement
];
export function useClientEnhancement({ deferred }: { deferred: boolean }): [
  {
    enhanced: boolean;
    pending: boolean;
  },
  StartEnhancement
];
export function useClientEnhancement({ deferred }: { deferred: boolean }): [
  {
    enhanced: boolean;
    pending: boolean;
  },
  StartEnhancement
] {
  const [enhanced, setEnhanced] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();

  const startEnhancement = useCallback(() => {
    if (enhanced) {
      return;
    }

    const setEnhancedTrue = () => {
      setEnhanced(true);
    };

    if (deferred) {
      startTransition(setEnhancedTrue);
    } else {
      setEnhancedTrue();
    }
  }, [deferred, enhanced]);

  return [
    {
      enhanced,
      pending,
    },
    startEnhancement,
  ];
}
