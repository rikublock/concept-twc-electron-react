import type { ContextBridgeWallet } from "./preload";

declare global {
  interface Window {
    WALLET: ContextBridgeWallet;
  }
}
