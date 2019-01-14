/**
 * websocket
 * @param  api       连接api
 * @param  param     参数
 * @param  bool      true 开启超时 false 关闭  下线检测 websocket 没有开启超时
 * @param  fnSuccess 成功回掉
 * @param  fnFail    失败回掉
 * @return ws        抛出ws对象
 */

export const webSck = (api, params, fnSuccess, fnFail) => {
  let responseInfo = { type: "", msg: "" }; // 请求信息
  let apiUrl = api + params.vinCode + "&userId=" + params.userId;
  let ws;
  // 开启webSocket
  function doOpen() {
    responseInfo.type = "open";
    responseInfo.msg = "websocket已开启";
    // console.log('开启websocket');
  }

  // 错误接收
  function doError() {
    this.close();
    responseInfo.type = "error";
    responseInfo.msg = "您已经掉线，无法与服务器通信!";
    fnFail && fnFail(responseInfo);
  }

  // 接收新消息
  function doMessage(message) {
    var event = message.data;
    fnSuccess && fnSuccess(event);
  }

  // 断开
  function doClose() {
    responseInfo.type = "close";
    responseInfo.msg = "您已经掉线，无法与服务器通信!";
    fnFail && fnFail(responseInfo);
  }

  // 初始话 WebSocket
  function initWebSocket(apiUrl) {
    if (window.WebSocket) {
      ws = new WebSocket(encodeURI(apiUrl));
      ws.onopen = doOpen;
      ws.onerror = doError;
      ws.onclose = doClose;
      ws.onmessage = doMessage;
    } else {
      responseInfo.type = "error";
      responseInfo.msg = "您的设备不支持 webSocket!";
      fnFail && fnFail(responseInfo);
    }
  }
  // 初始化webSocket
  initWebSocket(apiUrl);
  return ws;
};
