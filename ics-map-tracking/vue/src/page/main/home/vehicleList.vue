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

    .vehicle{
        cursor:pointer;
        line-height: 30px;

    }
    .vehicle.selected{
        background:darkgray;
        color: white;
    }
    #leftBg{
        position: absolute;
        left: 0;
        width:20%;
        height: 100%;
        bottom: 0;
        background: url(../../../images/leftBg.png) no-repeat;
    //background-size: 40% 100%;
    }
    #topBg{
        width: 100%;
        height: 9%;
        left: 14%;
        top: 0;
        position: absolute;
        background: url(../../../images/topBg.png) no-repeat 0 -10px;

    }
</style>
<template>
    <div style="width:100%;height:100%;position:relative;background:ghostwhite">
        <div style="display:inline-block;position:absolute;left: 15%;top: 50px; width: 20%;height: 100%">
            <div  class="vehicle" v-for="(item,key) in vehicleList"  @click="son(item,key)" :class='key==selected?"selected":""'>
                {{item.plateNo}}  vin:{{item.vin}}

            </div>
            <div>
                <DatePicker type="datetime" v-model="startTime" placeholder="开始时间" style="width: 52%;padding-top: 10px"></DatePicker>
            </div>
            <div>
                <DatePicker type="datetime" v-model="endTime" placeholder="结束时间" style="width: 52%;padding-top: 10px"></DatePicker>
            </div>

            <Button size="default" type="primary" @click="goTrack">5分钟轨迹</Button>
            <Button size="default" type="primary" @click="goSplitTrack">分段轨迹</Button>
            <Button size="default" type="primary" @click="goPosition">实时位置</Button>
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
            return {
                vehicleList:[],
                selected:-1,
                startTime:"",
                endTime:"",
                vin:""
            };
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
                    mapTrack: true, // 是否开启五分钟拖尾轨迹
                    config: {
                        gps: [116.404, 39.915], // 初始化地图经纬度
                        zoom: 16, // 初始化地图层级
                        trackApi: "/api/sample", // 根据后端访问jar包接口前缀进行配置
                        trackParam: { //五分钟拖尾轨迹初始化参数
                            startTime: 1541764082000,
                            endTime: 1541764509000,
                            vin: "LB37752Z3JL587321"
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
            son(item,key){
                this.selected=key;
                this.vin = item.vin;
            },
            goTrack() {
                let obj = {
                    vin: this.vin
                }
                if (this.startTime) obj.startTime = new Date(this.startTime).getTime()
                if (this.endTime) obj.endTime = new Date(this.endTime).getTime()
                this.$router.push({ path:"/main/mapTrack",   query:obj})

            },
            goSplitTrack() {
                let obj = {
                    vin: this.vin
                }
                if (this.startTime) obj.startTime = new Date(this.startTime).getTime()
                if (this.endTime) obj.endTime = new Date(this.endTime).getTime()
                this.$router.push({ path:"/main/splitTrack",   query:obj})
            },
            goPosition() {
                let obj = {
                    vin: this.vin
                }
                if (this.startTime) obj.startTime = new Date(this.startTime).getTime()
                if (this.endTime) obj.endTime = new Date(this.endTime).getTime()
                this.$router.push({ path:"/main/home",   query:obj})
            },
            vehicleData(){
                vehicle({},(data)=>{
                    this.vehicleList=data;
                })
            }
        }
    };
</script>
