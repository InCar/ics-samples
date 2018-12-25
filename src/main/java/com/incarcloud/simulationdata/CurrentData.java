package com.incarcloud.simulationdata;

import com.incarcloud.simulationdata.entity.ObdLocation;
import com.incarcloud.websocket.GprsWebSocket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author GuoKun
 * @version 1.0
 * @create_date 2018/12/24 09:48
 */
@Component
@Order(value = 1)
public class CurrentData implements ApplicationRunner {

    Logger logger = LoggerFactory.getLogger(CurrentData.class);

    @Autowired
    @Qualifier("primaryJdbcTemplate")
    protected JdbcTemplate jdbcTemplate1;

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {

        String sql = "select vin from t_obd_location GROUP BY vin ";
        List<String> vinList = jdbcTemplate1.queryForList(sql, String.class);

        for (int i = 0; i < vinList.size(); i++) {
            String vin = vinList.get(i);
            String recordTime = "2018-10-19 14:45:50";
            String recordTimeEnd = "2018-12-21 14:07:57";
            String sql2 = "select * from t_obd_location where vin = ? and  recordtime >= ? and recordtime < ? order by locationtime";
            Object args[] = new Object[]{vin, recordTime, recordTimeEnd};
            @SuppressWarnings("unchecked") List<ObdLocation> list1 = jdbcTemplate1.query(sql2, args, new BeanPropertyRowMapper(ObdLocation.class));
            Thread thread = new Thread() {
                @Override
                public void run() {
                    int i = 0;
                    while (true) {
                        try {
                            ObdLocation obdLocation = list1.get(i);
                            ObdLocation obdLocation1 = list1.get(i + 1);
                            GprsWebSocket.sendGpsMessage(obdLocation);
                            long oob = obdLocation1.getLocationTime().getTime() - obdLocation.getLocationTime().getTime();
                            logger.info("~~~~~~~~~  vin: " + vin + "  间隔时间为：" + oob);
                            Thread.sleep(oob);
                            i++;
                            if(i == list1.size() - 2 ){
                                i = 0;
                            }
                        } catch (Exception e) {
                            logger.error(e.getMessage());
                        }
                    }
                }
            };
            thread.start();
        }
    }
}
