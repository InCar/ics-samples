package com.incarcloud.websocket;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.security.Principal;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint(value = "/api/ws/gpsWebSocket")
public class GprsWebSocket {

    private static Logger logger = LoggerFactory.getLogger(GprsWebSocket.class);

    //concurrent包的线程安全Set,用来存放每个客户端对应的MyWebSocket对象
    private final static CopyOnWriteArraySet<GprsWebSocket> gpsWebsocket = new CopyOnWriteArraySet<>();

    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;


    /**
     * 连接建立成功
     * @param session
     */
    @OnOpen
    public void onOpen(Session session){

        //初始化session
        this.session = session;

        gpsWebsocket.add(this);
    }

    /**
     * 连接关闭调用的方法
     * @param session
     */
    @OnClose
    public void onClose(Session session){
        gpsWebsocket.remove(this);
    }


    /**
     * 收到客户端消息后调用的方法
     * @param message
     * @param session
     */
    @OnMessage
    public void onMessage(String message,Session session){
        System.out.println("来自客户端的消息："+message);
    }

    /**
     * 发生错误时使用
     * @param session
     */
    @OnError
    public void OnError(Session session,Throwable error){
        System.out.println("发生错误");
        error.printStackTrace();
    }

    /**
     * 发送消息
     * @param message
     * @throws IOException
     */
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

}
