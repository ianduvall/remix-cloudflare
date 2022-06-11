import React from "react";

let hasImportedDiv = false;
const importDiv = () => {
  console.log("importing Div");
  return import("~/shared/Div");
};
const importDivOnce = () => {
  if (hasImportedDiv) {
    return;
  }
  hasImportedDiv = true;
  return importDiv();
};
const LazyDiv = React.lazy(importDiv);

export default function ClientEnhancementRoute() {
  const renderFallback = React.useCallback(
    ({ isPending }: { isPending: boolean }) => (
      <div>fallback content{isPending ? " (enhancing...)" : ""}</div>
    ),
    []
  );

  return (
    <div>
      <React.Suspense fallback={<div>Root suspense fallback</div>}>
        <ClientEnhancement
          deferred
          onEnhancing={importDivOnce}
          renderFallback={renderFallback}
        >
          {React.useCallback(
            ({ isPending }) => (
              <React.Suspense fallback={<div>Loading lazy content...</div>}>
                <LazyDiv>
                  Lazy loaded content{isPending ? "(pending)" : ""}
                </LazyDiv>
              </React.Suspense>
            ),
            []
          )}
        </ClientEnhancement>
      </React.Suspense>
    </div>
  );
}

type ReturnJsxElement = (state: { isPending: boolean }) => JSX.Element;
const ClientEnhancement = ({
  children,
  renderFallback,
  deferred,
  onEnhancing,
}: {
  children: ReturnJsxElement;
  renderFallback: ReturnJsxElement;
  deferred?: boolean;
  onEnhancing?: () => void;
}) => {
  const [enhanced, setEnhanced] = React.useState<boolean>(false);

  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (enhanced) {
      // if already enhanced bail out
      return;
    }

    const setEnhancedTrue = () => {
      console.log("enhancing");

      onEnhancing?.();
      setEnhanced(true);
    };

    if (deferred) {
      startTransition(setEnhancedTrue);
    } else {
      setEnhancedTrue();
    }
  }, [deferred, enhanced, onEnhancing]);

  return (
    <React.Suspense fallback={renderFallback({ isPending: true })}>
      {enhanced ? children({ isPending }) : renderFallback({ isPending })}
    </React.Suspense>
  );
};
