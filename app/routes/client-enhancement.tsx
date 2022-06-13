import React from "react";

const importDiv = (): ReturnType<typeof getDiv> => {
  const getDiv = () => import("~/shared/Div");
  console.log("importing Div");
  return new Promise((resolve) => {
    setTimeout(() => resolve(getDiv()), 3000);
  });
};
const LazyDiv = React.lazy(importDiv);

export default function ClientEnhancementRoute() {
  const [deferred, setDeferred] = React.useState<boolean>(false);

  const [{ enhanced, pending }, startEnhancement] = useClientEnhancement({
    deferred,
  });

  return (
    <div>
      <label className="flex items-center gap-2">
        <input type="checkbox" onChange={() => setDeferred((prev) => !prev)} />
        <span>Deferred</span>
      </label>
      <button className="block" onClick={startEnhancement}>
        Enhance
      </button>

      <React.Suspense fallback={<div>Suspense fallback</div>}>
        {enhanced ? (
          <LazyDiv>Lazy loaded content</LazyDiv>
        ) : (
          <div>Fallback content {pending ? "(pending)" : ""}</div>
        )}
      </React.Suspense>
    </div>
  );
}

type StartEnhancement = () => void;
function useClientEnhancement({ deferred }: { deferred: false }): [
  {
    enhanced: boolean;
    pending: false;
  },
  StartEnhancement
];
function useClientEnhancement({ deferred }: { deferred: boolean }): [
  {
    enhanced: boolean;
    pending: boolean;
  },
  StartEnhancement
];
function useClientEnhancement({ deferred }: { deferred: boolean }): [
  {
    enhanced: boolean;
    pending: boolean;
  },
  StartEnhancement
] {
  const [enhanced, setEnhanced] = React.useState<boolean>(false);
  const [pending, startTransition] = React.useTransition();

  const startEnhancement = React.useCallback(() => {
    if (enhanced) {
      return;
    }

    const setEnhancedTrue = () => {
      console.log("enhancing");
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
