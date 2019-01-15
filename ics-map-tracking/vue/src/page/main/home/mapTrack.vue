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
</style>
<template>
    <div style="width:100%;height:100%;">
        <div id="apiId" style="width: 60%;height: 60%; top: 10%; left: 40%;">
        </div>
        <div id="button">切换地图大小</div>
        <div id="back" @click="clickBack">返回</div>
    </div>
</template>
<script>
    import Maptrack from "Maptrack"; //页面使用 需要引入
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
        },
        beforeDestroy() {},
        methods: {
            initData() {
                let isOpen = false;
                let button = document.getElementById("button");
                let apiId = document.getElementById("apiId");
                button.onclick = function() { //按钮切换地图大小，以及更改地图样式显示
                    isOpen = !isOpen;
                    if (isOpen){
                        apiId.style.width = "100%";
                        apiId.style.height="100%";
                        apiId.style.top="0px";
                        apiId.style.left="0px";
                    }else{
                        apiId.style.width ="60%";
                        apiId.style.height="60%";
                        apiId.style.top="10%";
                        apiId.style.left="40%";
                    }
                };
                let track = new Maptrack({
                    dom: "apiId",
                    mapType: "bmap",
                    mapTrack: true, // 是否开启五分钟拖尾轨迹
                    config: {
                        gps: [116.404, 39.915], // 初始化地图经纬度
                        zoom: 16, // 初始化地图层级
                        trackApi: "/api/sample", // 根据后端访问jar包接口前缀进行配置
                        trackParam: { //五分钟拖尾轨迹初始化参数
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
                // gps转成百度坐标
                // track.translateToBmap({lat: 39.990912172420714, lng: 116.32715863448607})
                // gps转高德坐标
                // track.GPS.translateToAmap({lat: 39.990912172420714, lng: 116.32715863448607})
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

                // 加载多个地图
                // let api = new Maptrack({
                //     dom: "api",
                //     mapType: 'bmap',
                //     mapTrack: false,       // 是否开启轨迹
                //     mapMointer: false,   // 是否开启推送
                //     config: {
                //         // soketUrl: 'ws://192.168.75.1:8889/api/ws/gpsWebSocket'
                //         trackControl: {
                //             startButton: '开',
                //         }
                //     }
                // });
                // api.init((BMap, map) => {
                //     let data = {
                //         lat: 39.990912172420714,
                //         lng: 116.32715863448607
                //     }
                //      let newData = track.translateToBmap(data)
                //     let point = new BMap.Point(newData.lng, newData.lat);
                //     let marker = new BMap.Marker(point);
                //     map.addOverlay(marker);  // 标点
                //    })
            },
            clickBack(){
                this.$router.push({ path:"/main/vehicleList"})
            }
        }
    };
</script>
