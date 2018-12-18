package com.incar.controller.map;

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


    @RequestMapping(value = "/version1/**",method = RequestMethod.GET)
    public void request(HttpServletRequest request, HttpServletResponse response){
        Dispatcher dispatcher = MapTrackingStarter.getDispatcher();
        dispatcher.getConfig().withMappingPre("/api/sample/version1");
        try {
            dispatcher.dispatch(request,response);
        }catch (NoHandlerException e) {
            e.printStackTrace();
        }

    }

}
