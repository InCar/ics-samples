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
