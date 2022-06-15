import { lazy, Suspense, useState } from "react";
import { useClientEnhancement } from "ui";

const importDiv = (): ReturnType<typeof getDiv> => {
  const getDiv = () => import("~/shared/Div");
  return new Promise((resolve) => {
    setTimeout(() => resolve(getDiv()), 3000);
  });
};
const LazyDiv = lazy(importDiv);

export default function ClientEnhancementRoute() {
  const [deferred, setDeferred] = useState<boolean>(false);

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

      <Suspense fallback={<div>Suspense fallback</div>}>
        {enhanced ? (
          <LazyDiv>Lazy loaded content</LazyDiv>
        ) : (
          <div>Fallback content {pending ? "(pending)" : ""}</div>
        )}
      </Suspense>
    </div>
  );
}
