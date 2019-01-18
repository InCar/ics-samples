<style lang="scss" scoped>

    .vehicle{
        cursor:pointer;

    }
    .vehicle.selected{
        background:darkgray;
        color: white;
    }
    #leftList{
        display:inline-table;
        position: absolute;
        width: 50%;
        top: 10px;
        left: 10px;
        height: 100%;
    }
    table,table tr td{
        border: 1px solid #515a6e;
        padding-top: 10px;
        padding-right: 10px;
    }
    table{
        left: 10px;
        text-align: center;
        border-collapse: collapse;
    }
    #apiId{
        display:inline-block;
        position:absolute;
        right:0;
        top: 10px;
        width: 64%;
        height:97%;
        left: 35%;
    }

</style>
<template>
    <div style="width:100%;height:100%;position:relative;background:ghostwhite">
        <div id="leftList">
                <table>
                    <tr>
                        <td>车牌号</td>
                        <td>vin</td>
                        <td>操作</td>
                    </tr>
                    <tr class="vehicle" v-for="(item,key) in vehicleList">
                        <td>{{item.plateNo}}</td>
                        <td>vin:{{item.vin}}</td>
                        <td><Button size="default" type="primary" @click="goSplitTrack(item,key)">分段轨迹</Button>&nbsp;
                            <Button size="default" type="primary" @click="goPosition(item,key)">实时位置</Button></td>
                    </tr>
                </table>
        </div>
            <div id="apiId"></div>

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
            goSplitTrack(item,key) {
                this.selected=key;
                this.vin=item.vin;
                let obj = {
                    vin: this.vin
                }
                this.$router.push({ path:"/main/splitTrack",   query:obj})
            },
            goPosition(item,key) {
                this.selected=key;
                this.vin = item.vin;

                let obj = {
                    vin: this.vin
                }
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
