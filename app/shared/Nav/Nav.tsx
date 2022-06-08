import React from "react";
import { Details } from "~/ui";
import { NavLinks } from "../NavLinks";

const NavDialog = React.lazy(() => import("./NavDialog"));

// const useIsClient = (): boolean => {
//   const [isClient, setIsClient] = React.useState(false);

//   React.useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return isClient;
// };

export const Nav = React.memo(function Nav() {
  const title = "Navigation";
  const nav = (
    <nav className="flex flex-col">
      <NavLinks />
    </nav>
  );

  // const isClient = useIsClient();
  // const navDetails = <NavDetails title={title} nav={nav} />;

  // // to support navigation without js, show details when ssr or after hydration
  // if (!isClient) {
  //   return navDetails;
  // }

  // return (
  //   <React.Suspense
  //     fallback={
  //       <>
  //         {navDetails}
  //         <p>Loading...</p>
  //       </>
  //     }
  //   >
  //     <NavDialog title={title} nav={nav} />
  //   </React.Suspense>
  // );

  const detailsRef = React.useRef<HTMLDetailsElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (detailsRef.current) {
      const initialOpen = detailsRef.current.open;
      console.log("initialOpen", initialOpen);
      React.startTransition(() => {
        setOpen(initialOpen);
      });
    }
  }, []);

  const [enhanceProgressively, setEnhanceProgressively] = React.useState(false);
  const cb = React.useCallback(() => {
    console.log("enhanceProgressivelyCallback");
    React.startTransition(() => setEnhanceProgressively(true));
  }, [setEnhanceProgressively]);

  return (
    <>
      <Details.Root ref={detailsRef} open={open} hidden={enhanceProgressively}>
        <Details.Summary className="list-none">{title}</Details.Summary>
        {nav}
      </Details.Root>

      <React.Suspense fallback={<p>hi</p>}>
        <NavDialog
          title={title + " (lazy) "}
          nav={nav}
          initialOpen={open}
          hidden={!enhanceProgressively}
        />
        <Fallback cb={enhanceProgressively ? undefined : cb} />
      </React.Suspense>
    </>
  );
});

const Fallback = ({ cb }: { cb?: () => void }) => {
  React.useEffect(() => {
    cb?.();
  }, [cb]);

  return null;
};
