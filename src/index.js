import Mecab from "mecab-wasm";

Mecab.waitReady().then(() => {
  window.onmessage = (message) => {
    if (typeof message.data !== "string") {
      return;
    }

    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "queryResult",
        data: {
          query: message.data,
          result: Mecab.query(message.data),
        },
      })
    );
  };

  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: "initialized",
      data: null,
    })
  );
});
