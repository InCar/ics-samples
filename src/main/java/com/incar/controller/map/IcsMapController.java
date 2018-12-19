package com.incar.controller.map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.incar.base.Dispatcher;
import com.incar.base.exception.NoHandlerException;
import com.incar.business.MapTrackingStarter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@SuppressWarnings(value = "unchecked")
@RestController
@RequestMapping("/api/sample")
public class IcsMapController {

    Dispatcher dispatcher;


    public IcsMapController() {
        dispatcher = MapTrackingStarter.getDispatcher();
        dispatcher.getConfig().withRequestMappingPre("/api/sample/ics");
        dispatcher.getDynamicRequestHandler().withJsonReader(obj->{
            try {
                return new ObjectMapper().writeValueAsString(obj);
            } catch (JsonProcessingException e) {
               throw new RuntimeException(e.getMessage());
            }
        });
    }

    @RequestMapping(value = "/ics/**",method = RequestMethod.GET)
    public void request(HttpServletRequest request, HttpServletResponse response){
        try {
            dispatcher.dispatch(request,response);
        }catch (NoHandlerException e) {
            e.printStackTrace();
        }

    }

}
