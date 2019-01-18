package com.test.controller.map;


import com.incarcloud.skeleton.Starter;
import com.incarcloud.skeleton.config.Config;
import com.incarcloud.skeleton.config.JdbcConfig;
import com.incarcloud.skeleton.context.Context;
import com.incarcloud.skeleton.exception.NoHandlerException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@SuppressWarnings(value = "unchecked")
@RestController
@RequestMapping("/api/sample")
public class IcsMapController {
    Context context;

    //配置拦截前缀
    public IcsMapController() {
        //获取默认配置
        context = Starter.getContext();
        Config config = context.getConfig();
        //配置前缀
        config.withRequestMappingPre("/api/sample/ics");
        //包名配置
        config.addScanPackages("com.test.controller");

        //数据库自定义配置
        JdbcConfig mysqlConfig = new JdbcConfig("com.mysql.cj.jdbc.Driver", "jdbc:mysql://127.0.0.1:3306/test?characterEncoding=utf8&useSSL=false&rewriteBatchedStatements=true&serverTimezone=CTT&autoReconnect=true", "root", "rootroot");
        config.withJdbcConfig(mysqlConfig);
        //初始化
        context.init();
    }

    @RequestMapping(value = "/ics/**", method = RequestMethod.GET)
    public void request(HttpServletRequest request, HttpServletResponse response) {
        try {
            //调用jar架包接口
            context.handle(request, response);
        } catch (NoHandlerException e) {
            e.printStackTrace();
        }

    }
}
