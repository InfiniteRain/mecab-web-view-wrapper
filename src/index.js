import Mecab from "mecab-wasm";

const onMessage = (message) => {
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

Mecab.waitReady().then(() => {
  document.addEventListener("message", onMessage);
  window.onmessage = onMessage;

  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: "initialized",
      data: null,
    })
  );
});
