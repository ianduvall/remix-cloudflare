export const isServer = () => typeof document === "undefined";
export const isClient = () => !isServer();
