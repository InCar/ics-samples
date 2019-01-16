<style lang="scss" scoped>
    #button {
        position: absolute;
        left: 0;
        top: 10%;
        cursor: pointer;
        padding: 10px;
        background: blue;
        border-radius: 4px;
        color: white;
        z-index: 999999;
    }
    #back{
        position: absolute;
        right: 30px;
        top: 60px;
        cursor: pointer;
        padding: 10px;
        background: blue;
        border-radius: 4px;
        color: white;
        z-index: 999999;

    }
    .vehicle{
        cursor:pointer;
        line-height: 30px;

    }
    .vehicle.selected{
        background:darkgray;
        color: white;
    }
    #leftBg{
        left: 0;
        width:20%;
        height: 100%;
        background: url(../../../images/leftBg.png) no-repeat -10px 0;
    }
    #topBg{
        width: 90%;
        height: 15%;
        left: 13%;
        top: 0;
        position: absolute;
        background-size: 90% 15%;
        background: url(../../../images/topBg.png) no-repeat 0 -10px;
    }
</style>
<template>
    <div style="width:100%;height:100%;position:relative;background:ghostwhite">
        <div id="leftBg"></div>
        <div id="topBg"></div>
        <div id="back" @click="clickBack">返回</div>
        <div style="display:inline-block;position:absolute;left: 15%;top: 50px; width: 20%;height: 100%">
            <div  class="vehicle" v-for="(item,key) in vehicleList"  @click="son(item,key)" :class='key==selected?"selected":""'>
                车牌号：  {{item.plateNo}}  vin:{{item.vin}}
            </div>
            <div>
                <DatePicker type="datetime" v-model="startTime" placeholder="开始时间" style="width: 52%;padding-top: 10px"></DatePicker>
            </div>
            <div>
                <DatePicker type="datetime" v-model="endTime" placeholder="结束时间" style="width: 52%;padding-top: 10px"></DatePicker>
            </div>

            <Button size="default" type="primary" @click="goSplitTrack">分段轨迹</Button>
        </div>
        <div style="display:inline-block;position:absolute;right:0;width: 80%;height:97%;top: 10px;left: 30%">
            <div id="apiId" style="width: 87%;height:97%;top: 50px;"></div>
        </div>

    </div>
</template>
<script>
    import Maptrack from "Maptrack"; //页面使用 需要引入
    import {vehicle} from  'service/vehicleList.js';
    export default {
        components: {},
        data() {
            return {};
        },
        created(){
            this.obj = this.$route.query
            console.log(this.$route.query)
        },
        mounted() {
            this.initData();
            this.vehicleData();
        },
        beforeDestroy() {},
        methods: {
            initData() {
                let track = new Maptrack({
                    dom: "apiId",
                    mapType: "bmap",
                    splitTrack: true, // 是否开启分段轨迹
                    config: {
                        gps: [116.404, 39.915], // 初始化地图经纬度
                        zoom: 16, // 初始化地图层级
                        trackApi: "/api/sample", // 根据后端访问jar包接口前缀进行配置
                        splitTrackParam: { //分段轨迹初始化参数
                            startTime: this.obj.startTime,
                            endTime: this.obj.endTime,
                            vin: this.obj.vin
                        },
                        iconUrl: "../static/images/driving.png", // 车辆图标
                        startIcon: "../static/images/start.png", // 轨迹开始图标
                        endIcon: "../static/images/end.png", // 轨迹结束图标
                        markerSize: [20, 43], // 车辆图标尺寸 原始图片尺寸，不需要偏移量
                        startEndSize: [26, 37], // 开始结束图标尺寸
                        startEndAnchor: [10, 37], // 开始结束图标偏移量，10是图片宽度的一半，37是图片高度
                        trackControl: {
                            // 轨迹按钮自定义
                            startButton: "开",
                            endButton: "暂停",
                            stopButton: "停止",
                            reduceButton: "减速",
                            addButton: "加速"
                        }
                    }
                });
                // 轨迹点击事件  外部扩展
                track.on("play", function() {
                    console.log("you click play!");
                });
                track.on("pause", function() {
                    console.log("you click pause!");
                });
                track.on("stop", function() {
                    console.log("you click stop!");
                });
                track.on("add", function() {
                    console.log("you click add!");
                });
                track.on("reduce", function() {
                    console.log("you click reduce!");
                });
                //地图初始化 创建点
                track.init((BMap, map) => {
                    let data = {
                        lat: 39.990912172420714,
                        lng: 116.32715863448607
                    };
                let newData = track.translateToBmap(data);
                let point = new BMap.Point(newData.lng, newData.lat);
                let marker = new BMap.Marker(point);
                map.addOverlay(marker); // 标点
            });
            },
            clickBack(){
                this.$router.push({ path:"/main/mapTrack"})
            },
            vehicleData(){
                vehicle({},(data)=>{
                    this.vehicleList=data;
                    console.log(data);
                })
            },
            goSplitTrack() {
                let obj = {
                    vin: this.vin
                }
                if (this.startTime) obj.startTime = new Date(this.startTime).getTime()
                if (this.endTime) obj.endTime = new Date(this.endTime).getTime()
                this.$router.push({ path:"/main/splitTrack",   query:obj})
            }
        }
    };
</script>
