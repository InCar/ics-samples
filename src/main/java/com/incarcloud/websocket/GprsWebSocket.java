package com.incarcloud.websocket;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.incarcloud.simulationdata.entity.ObdLocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.stream.Collectors;

@ServerEndpoint(value = "/api/ws/gpsWebSocket")
@Component
public class GprsWebSocket {

    private static Logger logger = LoggerFactory.getLogger(GprsWebSocket.class);

    //concurrent包的线程安全Set,用来存放每个客户端对应的MyWebSocket对象
    private final static CopyOnWriteArraySet<GprsWebSocket> gpsWebsocket = new CopyOnWriteArraySet<>();

    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;

    private Set<String> vinsSet; //存gprscode参数


    /**
     * 连接建立成功
     *
     * @param session
     */
    @OnOpen
    public void onOpen(Session session) {
        //初始化session
        this.session = session;
        Map<String, List<String>> params = session.getRequestParameterMap();
        List<String> gprscodes = params.get("vins");
        if (gprscodes == null || gprscodes.size() == 0) {
            return;
        }
        vinsSet = Arrays.stream(gprscodes.get(0).split(",")).collect(Collectors.toSet());

        gpsWebsocket.add(this);
    }

    /**
     * 连接关闭调用的方法
     *
     * @param session
     */
    @OnClose
    public void onClose(Session session) {
        gpsWebsocket.remove(this);
    }


    /**
     * 收到客户端消息后调用的方法
     *
     * @param message
     * @param session
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("来自客户端的消息：" + message);
    }

    /**
     * 发生错误时使用
     *
     * @param session
     */
    @OnError
    public void OnError(Session session, Throwable error) {
        System.out.println("发生错误");
        error.printStackTrace();
    }

    /**
     * 发送消息
     *
     * @param message
     * @throws IOException
     */
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

    /**
     * 发送车辆信息
     *
     * @param obdLocation
     * @throws IOException
     */
    public static void sendGpsMessage(ObdLocation obdLocation) throws IOException {
        //没消息就直接返回
        if (obdLocation == null) {
            return;
        }
        //数据推送
        ObjectMapper mapper = new ObjectMapper();
        for (GprsWebSocket gprsWebSocket : gpsWebsocket) {
            //gprs过滤
            if (gprsWebSocket.vinsSet.contains(obdLocation.getVin())) {
                gprsWebSocket.sendMessage(mapper.writeValueAsString(obdLocation));
            }
        }
    }

}
