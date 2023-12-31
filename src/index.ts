import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { app, BrowserWindow, ipcMain } from "electron";
import { initWasm, type WalletCore } from "@trustwallet/wallet-core";

let twc: WalletCore | null = null;

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 900,
    width: 1600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  const name = await installExtension(REACT_DEVELOPER_TOOLS);
  console.log(`Added Extension: ${name}`);

  twc = await initWasm();

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle(
  "twc:generateAddress",
  async (
    event: Electron.IpcMainInvokeEvent,
    coinType: string
  ): Promise<[string, string]> => {
    if (!twc) {
      throw new Error("Trust Wallet Core not loaded!");
    }

    const wallet = twc.HDWallet.create(256, "password");
    const mnemonic = wallet.mnemonic();

    let address;
    switch (coinType) {
      case "btc":
        address = wallet.getAddressForCoin(twc.CoinType.bitcoin);
        break;
      case "eth":
        address = wallet.getAddressForCoin(twc.CoinType.ethereum);
        break;
      case "xrp":
        address = wallet.getAddressForCoin(twc.CoinType.xrp);
        break;
      default:
        wallet.delete();
        throw new Error("Invalid Coin Type!");
    }

    wallet.delete();

    return [mnemonic, address];
  }
);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
