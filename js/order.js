/**
 * Created by seaven on 17/5/28.
 */

var Website = 'http://10.100.10.202:8080';
$(function(){
    //头部数据
    $.ajax({
        // url: "/order/js/summarizing.json",
        url: Website+"/eboard/ws/eboard/summarizing/summarizing",
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            //汇总数据
            var tabularDataList = data.tabularDataList;
            for(var i=0,x=1;i<tabularDataList.length;i++,x++){
                if(tabularDataList[i].id == x){
                    $('.tabulate'+i).html(tabularDataList[i].normal);
                    $('.tabulateY'+i).html(tabularDataList[i].yellowSum);
                    $('.tabulateR'+i).html(tabularDataList[i].redSum);
                }
            }
            //大节点红黄个数
            var bigNode = data.bigNodeList;
            for(var i=0,x=1;i<bigNode.length;i++,x++){
                if(bigNode[i].templateId == x){
                    $('.bigNodeY'+x).html(bigNode[i].yellowSum);
                    $('.bigNodeR'+x).html(bigNode[i].redSum);
                }
            }
            //订金（总值，均值）
            var totalAllTableList = data.totalAllTableList;
            for(var i=0,x=1;i<totalAllTableList.length;i++,x++){
                if(totalAllTableList[i].id == x){
                    $('.totasum'+i).html(totalAllTableList[i].sum);
                    $('.meanValue'+i).html(totalAllTableList[i].meanValue);
                }
            }
           //子节点红黄个数（17列）
            var smallNode = data.smallNodeList;
             for(var i=0,x=1;i<smallNode.length;i++,x++){
                 var smallData = smallNode[i];
                 for(var name in smallData){
                    var smallList = smallData[name]
                    for(var a = 0,b=1;a<smallList.length;a++,b++){
                        if (smallList[a].typeId == i) {
                            $('.yelSum'+i+'_'+b).html(smallList[a].yellowSum).css("font-size","13px");
                            $('.redSum'+i+'_'+b).html(smallList[a].redSum).css("font-size","13px");
                        }
                    }

                 }
             }

            //异常干系人汇总
            var stakeholder = data.stakeholdersTableList[0];
            $('.designSum').html(stakeholder.designSum);
            $('.projectSum').html(stakeholder.projectSum);
            $('.supervisorSum').html(stakeholder.supervisorSum);
            $('.salesSum').html(stakeholder.salesSum);
            $('.stewardSum').html(stakeholder.stewardSum);
            $('.stakeholdersSum').html(stakeholder.stakeholdersSum);

            //客户反感top10
            var customerTopTen = data.customerTopTenList;
            for(var i=0,x=1;i<customerTopTen.length;i++,x++){
                $('.customerTopTen'+x).html(customerTopTen[i].customerName);
            }

            //异常干系人top5
            var namesTopFive = data.stakeholdersTopFiveList;
            for(var i = 0,x = 1;i<namesTopFive.length;i++,x++){
                var namesData = namesTopFive[i];
                for(var name in namesData){
                    var nameFive = namesData[name];
                    for(var a = 0,b=1;a<nameFive.length;a++,b++){
                        if (nameFive[a].roleId == x) {
                            $('.stakeholdersName'+x+'_'+b).html(nameFive[a].stakeholdersName);
                        }
                    }
                }
            }
            
            // 大节点名称
            var nodenameList = data.nodeTemplateList;
            for(var i = 0,x = 1;i<nodenameList.length;i++,x++){
                if (nodenameList[i].id == x) {
                    $('.nodeName'+x).html(nodenameList[i].nodeName)
                }
            }

        }
    })
    // 五种类型名称
    var typeArray = [];
    $.ajax({
        // url: "/order/js/summarizing.json",
        url: Website+"/eboard/ws/eboard/summarizing/summarizing",
        type: 'get',
        dataType: 'json',
        async:false, 
        contentType: 'application/json',
        success: function (data) {
            var typeList = data.typeList;
            for(i = 0,x = 1;i < typeList.length;i++,x++){
                if (typeList[i].id == x) {
                    $('.typeName'+x).html(typeList[i].name)
                    typeArray.push(typeList[i].name)
                }
            }
        }
    })
    // console.log(typeArray)
    // 异常数据
    function abnormal(type,days,ele){//type--类型编号,days--节点名称,ele--dom节点
        $.ajax({
            // url: "/order/js/one.json",
            url: Website+"/eboard/ws/eboard/summarizing/orderExecptionList/"+type,
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data){
                var results = data.result;
                var str = "";
                for (var i = 0;i < results.length;i++) {
                    var linesData = results[i].lines;
                    str += '<tr><td>'+days+'</td><td>'+results[i].baseNodeName+'</td><td>'+results[i].smallNodeName+'</td>'
                    // (0绿色1黄色2红色)
                    if (results[i].status== 1) {
                        str += '<td class="yellow"></td>'
                    }else if (results[i].status== 2) {
                        str += '<td class="red"></td>'
                    }
                    str += '<td>'+results[i].nodeDay+'</td><td>'+results[i].clearDays+'</td>'
                    
                    for (var x = 0;x < linesData.length;x++) {
                        // (0绿色1黄色2红色3白色)
                        if (linesData[x].nodeStatus == 0) {
                            str += '<td colspan="2" class="green"></td>'
                        }else if (linesData[x].nodeStatus == 1) {
                            str += '<td colspan="2" class="yellow"></td>'
                        }else if (linesData[x].nodeStatus == 2) {
                            str += '<td colspan="2" class="red"></td>'
                        }else if (linesData[x].nodeStatus == 3) {
                            str += '<td colspan="2" class="white"></td>'
                        }
                        
                    }
                    str += '<td>'+results[i].userName+'</td><td>'+results[i].dislikeCount+'</td><td>'+results[i].designUser+'</td><td>'+results[i].projectUser+'</td><td>'+results[i].supervisorUser+'</td><td>'+results[i].saleUser+'</td><td>'+results[i].guanjiaUser+'</td></tr>'

                }
                $(str).appendTo(ele);

            }
        })
    }

    abnormal(1,typeArray[0],"#type1")
    abnormal(2,typeArray[1],"#type2")
    abnormal(3,typeArray[2],"#type3")
    abnormal(4,typeArray[3],"#type4")
    abnormal(5,typeArray[4],"#type5")

    // 正常数据
    function normal(type,days,ele){//type--类型编号,days--节点名称,ele--dom节点
        $.ajax({
            // url: "/order/js/orderNormalList.json",
            url: Website+"/eboard/ws/eboard/summarizing/orderNormalList",
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data){
                for(var i = 0,q = 1;i<data.length;i++,q++){
                    // console.log(i,q)
                    var normalData = data[i]
                    for(var name in normalData){
                        nameTypeData = normalData[name];
                        var str = "";
                        for (var a = 0;a < nameTypeData.length;a++) {
                            if (nameTypeData[a].typeId == type) {
                                var linesData = nameTypeData[a].lines;
                                str += '<tr><td>'+days+'</td><td>'+nameTypeData[a].baseNodeName+'</td><td>'+nameTypeData[a].smallNodeName+'</td><td class="green"></td>'
                                str += '<td>'+nameTypeData[a].nodeDay+'</td><td>'+nameTypeData[a].clearDays+'</td>'
                                
                                for (var x = 0;x < linesData.length;x++) {
                                    // (0绿色1黄色2红色3白色)
                                    if (linesData[x].nodeStatus == 0) {
                                        str += '<td colspan="2" class="green"></td>'
                                    }else if (linesData[x].nodeStatus == 1) {
                                        str += '<td colspan="2" class="yellow"></td>'
                                    }else if (linesData[x].nodeStatus == 2) {
                                        str += '<td colspan="2" class="red"></td>'
                                    }else if (linesData[x].nodeStatus == 3) {
                                        str += '<td colspan="2" class="white"></td>'
                                    }
                                    
                                }
                                str += '<td>'+nameTypeData[a].userName+'</td><td>'+nameTypeData[a].dislikeCount+'</td><td>'+nameTypeData[a].designUser+'</td><td>'+nameTypeData[a].projectUser+'</td><td>'+nameTypeData[a].supervisorUser+'</td><td>'+nameTypeData[a].saleUser+'</td><td>'+nameTypeData[a].guanjiaUser+'</td></tr>'
                            }

                        }
                        $(str).appendTo(ele);
                    }

                }
            }
        })
    }
    normal(1,typeArray[0],"#normal1")
    normal(2,typeArray[1],"#normal2")
    normal(3,typeArray[2],"#normal3")
    normal(4,typeArray[3],"#normal4")
    normal(5,typeArray[4],"#normal5")




})