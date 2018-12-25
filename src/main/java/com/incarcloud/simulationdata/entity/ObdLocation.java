package com.incarcloud.simulationdata.entity;

import java.sql.Timestamp;

/**
 * @author GuoKun
 * @version 1.0
 * @create_date 2018/12/24 11:23
 */
public class ObdLocation {
    private String obdCode;
    private Integer tripId;
    private String vid;
    private String vin;
    private Integer locationSpeed;
    private Integer travelDistance;
    private Double lon;
    private Double lat;
    private Double direction;
    private Timestamp locationTime;
    private Integer locationType;
    private Timestamp recordTime;
    private String plateNo;

    public String getObdCode() {
        return obdCode;
    }

    public void setObdCode(String obdCode) {
        this.obdCode = obdCode;
    }

    public Integer getTripId() {
        return tripId;
    }

    public void setTripId(Integer tripId) {
        this.tripId = tripId;
    }

    public String getVid() {
        return vid;
    }

    public void setVid(String vid) {
        this.vid = vid;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public Integer getLocationSpeed() {
        return locationSpeed;
    }

    public void setLocationSpeed(Integer locationSpeed) {
        this.locationSpeed = locationSpeed;
    }

    public Integer getTravelDistance() {
        return travelDistance;
    }

    public void setTravelDistance(Integer travelDistance) {
        this.travelDistance = travelDistance;
    }

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public String getPlateNo() {
        return plateNo;
    }

    public void setPlateNo(String plateNo) {
        this.plateNo = plateNo;
    }

    public Double getDirection() {
        return direction;
    }

    public void setDirection(Double direction) {
        this.direction = direction;
    }

    public Integer getLocationType() {
        return locationType;
    }

    public void setLocationType(Integer locationType) {
        this.locationType = locationType;
    }

    public Timestamp getLocationTime() {
        return locationTime;
    }

    public void setLocationTime(Timestamp locationTime) {
        this.locationTime = locationTime;
    }

    public Timestamp getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(Timestamp recordTime) {
        this.recordTime = recordTime;
    }

    @Override
    public String toString() {
        return "ObdLocation{" +
                "obdCode='" + obdCode + '\'' +
                ", tripId=" + tripId +
                ", vid='" + vid + '\'' +
                ", vin='" + vin + '\'' +
                ", locationSpeed=" + locationSpeed +
                ", travelDistance=" + travelDistance +
                ", lon=" + lon +
                ", lat=" + lat +
                ", direction=" + direction +
                ", locationTime=" + locationTime +
                ", locationType=" + locationType +
                ", recordTime=" + recordTime +
                ", plateNo='" + plateNo + '\'' +
                '}';
    }
}
