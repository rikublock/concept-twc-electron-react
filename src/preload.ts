// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeWallet = {
  generateAddress: (coinType: string) => Promise<[string, string]>;
};

const WalletContext: ContextBridgeWallet = {
  generateAddress: (coinType: string) =>
    ipcRenderer.invoke("twc:generateAddress", coinType),
};

contextBridge.exposeInMainWorld("WALLET", WalletContext);
