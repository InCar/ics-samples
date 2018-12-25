package com.incarcloud.controller.map;


import com.incarcloud.base.Starter;
import com.incarcloud.base.context.Context;
import com.incarcloud.base.exception.NoHandlerException;
import com.incarcloud.websocket.GprsWebSocket;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@SuppressWarnings(value = "unchecked")
@RestController
@RequestMapping("/api/sample")
public class IcsMapController extends JacksonJsonReader {

    Context context;
    public IcsMapController() {
        context= Starter.getContext();
        context.getConfig().withRequestMappingPre("/api/sample/ics");
    }

    @RequestMapping(value = "/ics/**",method = RequestMethod.GET)
    public void request(HttpServletRequest request, HttpServletResponse response){
        try {
            context.handle(request,response);
        }catch (NoHandlerException e) {
            e.printStackTrace();
        }

    }


}
