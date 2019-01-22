<style lang="scss" scoped>

    #back{
        position: absolute;
        right: 15px;
        top: 20px;
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
        <div id="back" @click="clickBack">返回</div>
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
                    <td><Button size="default" type="primary" @click="search(item,key)">实时位置</Button>&nbsp;<checkbox v-model="checked" @on-change="change">五分钟轨迹</checkbox></td>
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
                vin:"",
                track:null
            };
        },
        mounted() {
            this.initData();
            this.vehicleData();
        },
        created(){
            this.vin = this.$route.query.vin
            console.log(this.$route.query)
        },
        beforeDestroy() {},
        methods: {
            initData() {
                let i = 0;
                this.track = new Maptrack({
                    dom: "apiId",
                    mapType: "bmap",
                    trackApi: "/api/sample", // 根据后端访问jar包接口前缀进行配置
                    currentSoket: (data) =>{
                        if(i === 0) {
                            console.log(this)
                            console.log(data.locationTime)

                            this.endTime=data.locationTime;
                            this.startTime=data.locationTime-300*1000;
                        }
                        i++;
                    },
                    mapMointer: true, // 是否开启推送
                    config: {
                        soketUrl: "ws://127.0.0.1:8889/api/ws/gpsWebSocket", // websocket推送地址
                        moniterParam: {vin: this.vin}, // 推送参数
                        iconUrl: "../static/images/driving.png", // 车辆图标
                    }
                });

            },
            clickBack(){
                this.$router.push({ path:"/main/mapTrack"})
            },
            vehicleData(){
                vehicle({},(data)=>{
                    this.vehicleList=data;
                })
            },
            son(item,key){
                this.selected=key;
                this.vin = item.vin;
            },
            search(item,key){
                this.selected=key;
                this.vin = item.vin;

                this.track.search({vin: this.vin})
            },
            change(isFlag){
                console.log(isFlag)
                console.log(this.vin)
                if (isFlag == true){
                    console.log(this.endTime);
                    this.track.addTrack({
                    startTime: this.startTime, endTime: this.endTime, vin: this.vin
                })
            }else {
                    this.track.clearTrack();
                }
            }
        }
    };
</script>
