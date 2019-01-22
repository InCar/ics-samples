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
    #time{
        width: 38%;
        padding-top: 10px;
    }
    #checkPo{
        width: 73px;
        height: 11px;
        z-index: 999999;
        position: absolute;
        background: url("../../../images/bottom.png") no-repeat;
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
                    <td><Button size="default" type="primary" @click="search(item,key)">分段轨迹</Button></td>
                </tr>
            </table>
            <div id="checkPo" @click="onChange()"></div>
            <div id="timeHidden" style="display: block">
            <div>
                开始时间：<DatePicker id="time" type="datetime" v-model="startTime" placeholder="开始时间" ></DatePicker>
            </div>
            <div>
                结束时间：<DatePicker id ="time" type="datetime" v-model="endTime" placeholder="结束时间"></DatePicker>
            </div>
            </div>
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
                this.track = new Maptrack({
                    dom: "apiId",
                    mapType: "bmap",
                    splitTrack: true, // 是否开启分段轨迹
                    trackApi: "/api/sample", // 根据后端访问jar包接口前缀进行配置
                    config: {
                        splitTrackParam: { //分段轨迹初始化参数
                            startTime: 1541779200000,
                            endTime: 1541951999000,
                            vin: this.obj.vin,
                            gpsSplitTimeMills: 60000
                        },
                        iconUrl: "../static/images/driving.png", // 车辆图标
                        startIcon: "../static/images/start.png", // 轨迹开始图标
                        endIcon: "../static/images/end.png", // 轨迹结束图标
                        markerSize: [20, 43], // 车辆图标尺寸 原始图片尺寸，不需要偏移量
                        startEndSize: [26, 37], // 开始结束图标尺寸
                        startEndAnchor: [10, 37], // 开始结束图标偏移量，10是图片宽度的一半，37是图片高度
                    }
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
            search(item,key){
                this.selected=key;
                this.vin = item.vin;

                this.track.search({startTime: 1541779200000,
                    endTime: 1541951999000,
                    vin: this.vin})
            },
            onChange(){
                let change = false;
                let timeHidden = document.getElementById("timeHidden");
                let picture = document.getElementById("checkPo");
                if(change){
                   // picture.style.background=url("../../../images/top.png") no-repeat;
                    //timeHidden.style.display=
                }else {

                }
            }

        }
    };
</script>
