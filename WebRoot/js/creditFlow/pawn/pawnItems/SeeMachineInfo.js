var seeMachine = function(pawnItemId,typeid){
		//把数字，日期类型的数据转换成字符串类型,否则html以字符串形式显示,数值类型的值不显示
		var numTurnToString = function(object,number){
			var obj = "";
			if(object == null || object == 0){
				obj = "";
			}else{
				if(number ==1){
					obj = object.toString()+'万元';
				}else if(number == 2){
					obj = object.toString()+'平方米';
				}else if(number == 3){
					obj = object.toString()+'元/平方米';
				}else if(number == 4){
					obj = object.toString()+'元/月/平方米';
				}else if(number == 5){
					obj = object.toString()+'年';
				}else if(number == 6){
					obj = object.toString()+'公里';
				}else if(number == 7){
					obj = object.toString()+'%';
				}else if(number == 8){
					obj = object.toString()+'元';
				}else{
					obj = object.toString()+"";
				}
			}
			return obj;
		}
		
		//处理特殊字符小于号
		var formatValue = function(obj){
			if(obj.indexOf("<")){
				//var firstElement = obj.indexOf("<");
				//alert("第一次出现<的位置："+firstElement);
				var lastValue = obj.substring(obj.indexOf("<")+1);//获取从'<'第次一出现的位置后第一个元素至末位的值
		        var startValue = obj.substring(0,obj.indexOf("<"));//获取从0开始至第一次出现'<'位置之间的值
		        //alert("获取从0开始至第一次出现'<'位置之间的值==="+start+"       获取从'<'开始至末位的值==="+len);
		        return startValue+'&lt'+lastValue;
			}else{
				return obj;
			}
		}
		viewer=function(mortgageId,talbeName){
		     var mark=talbeName+mortgageId;
	         picViewer(mark,true);
		}
		
	var seeCarInformation = function(MortgageData){
		var panel_seeCar = new Ext.form.FormPanel({
			id :'seeVehicle',
			//labelAlign : 'left',
			buttonAlign : 'center',
			bodyStyle : 'overflowX:hidden',
			autoScroll : true ,
			//cls : 'align:right',
			frame : true,
			border : false,
			items : [{
				layout : 'column',
				xtype:'fieldset',
	            title: '查看<当物>基础信息',
	            collapsible: true,
	            autoHeight:true,
	            //style : 'align:right',
	            anchor : '95%',
	            items : [{
	            	layout : 'column',
	            	columnWidth : 1,
					border : false,
					defaults : {
						layout : 'form',
						anchor : '99%',
						height : 30
					},
					items : [{
							xtype : 'label',
							html : '<b>项目编号：</b>'
					},{
						html : MortgageData.vPawnItemsList.projectNumber
					}]
	            },{
	            	layout : 'column',
	            	columnWidth : 1,
					border : false,
					defaults : {
						layout : 'form',
						anchor : '99%',
						height : 30
					},
					items : [{
							xtype : 'label',
							html : '<b>项目名称：</b>'
					},{
						html : MortgageData.vPawnItemsList.projectName
					}]
	            },{
	            	layout : 'column',
	            	columnWidth : 1,
					border : false,
					defaults : {
						layout : 'form',
						anchor : '99%',
						height : 30
					},
					items : [{
							xtype : 'label',
							html : '<b>客户名称：</b>'
					},{
						html : MortgageData.vPawnItemsList.customerName
					}]
	            },{
	            	layout : 'column',
	            	columnWidth : 1,
					border : false,
					items : [{
						columnWidth : .5,
						defaults : {
							layout : 'form',
							anchor : '99%',
							height : 30
						},
						items : [{
							html : '<b>当物类型：</b> ' + MortgageData.vPawnItemsList.pawnItemTypeName
						},{
							html : '<b>规格和状态：</b>' + MortgageData.vPawnItemsList.specificationsStatus
						},{
							html : '<b>评估价值：</b>' + numTurnToString(MortgageData.vPawnItemsList.assessedValuationValue,8)
						},{
							html : '<b>当物金额：</b>' +numTurnToString(MortgageData.vPawnItemsList.pawnItemMoney,8)
						}]
					},{
						columnWidth : .5,
						defaults : {
							layout : 'form',
							anchor : '99%',
							height : 30
						},
						items : [{
							html : '<b>当物名称：</b> '+ MortgageData.vPawnItemsList.pawnItemName
						},{
							html : '<b>数量：</b>' + MortgageData.vPawnItemsList.counts
						},{
							html : '<b>折当率：</b>' + numTurnToString(MortgageData.vPawnItemsList.discountRate,7)
						},{
							html : '<b>获取时间：</b>' + function(){if(MortgageData.vPawnItemsList.accessTime!=null){return MortgageData.vPawnItemsList.accessTime}else{return ""}}()
						}]
					}]
	            },{
	            	layout : 'column',
	            	columnWidth : 1,
					border : false,
					defaults : {
						layout : 'form',
						anchor : '99%',
						height : 30
					},
					items : [{
							xtype : 'label',
							html : '<b>备注：</b>'
					},{
						html : MortgageData.vPawnItemsList.remarks
					}]
	            }]
			},{
				layout : 'column',
				xtype:'fieldset',
	            title: '查看<机器设备>详细信息',
	            collapsible: true,
	            autoHeight:true,
	            //width: 600,
	            anchor : '95%',
	            items : [{
	            	layout : 'column',
	            	columnWidth : 1,
					border : false,
					defaults : {
						layout : 'form',
						anchor : '99%',
						height : 30
					},
					items : [{
							xtype : 'label',
							html : '<b>设备名称：</b>'
					},{
						html : MortgageData.vProjMortMachineInfo.machinename
					}]
	            },{
	            	layout : 'column',
	            	columnWidth : 1,
					border : false,
					defaults : {
						layout : 'form',
						anchor : '99%',
						height : 30
					},
					items : [{
							xtype : 'label',
							html : '<b>控制权人：</b>'
					},{
						html : MortgageData.vProjMortMachineInfo.controller
					}]
	            },{

	            	layout : 'column',
	            	columnWidth : 1,
					border : false,
					items : [{
						columnWidth : .5,
						defaults : {
							layout : 'form',
							anchor : '99%',
							height : 30
						},
						items : [{
							html : '<b>控制权方式：</b> ' + MortgageData.vProjMortMachineInfo.controllerTypeIdValue
						},{
							html : '<b>设备型号：</b>' + MortgageData.vProjMortMachineInfo.machinetype
						},{
							html : '<b>新货价格：</b>' + numTurnToString(MortgageData.vProjMortMachineInfo.newcarprice,1)
						},{
							html : '<b>使用时间：</b>' + numTurnToString(MortgageData.vProjMortMachineInfo.havedusedtime,5)
						},{
							html : '<b>二手价值1：</b>' + numTurnToString(MortgageData.vProjMortMachineInfo.secondaryvalueone,1)
						},{
							html : '<b>二手价值2：</b>' + numTurnToString(MortgageData.vProjMortMachineInfo.secondaryvaluetow,1)
						}]
					},{
						columnWidth : .5,
						defaults : {
							layout : 'form',
							anchor : '99%',
							height : 30
						},
						items : [{
							html : '<b>通用程度：</b> '+ function(){if(typeof(MortgageData.vProjMortMachineInfo.commonGradeIdValue)!="undefined"){return MortgageData.vProjMortMachineInfo.commonGradeIdValue}else{return ''}}()
						},{
							html : '<b>性能状况：</b>' + numTurnToString(MortgageData.vProjMortMachineInfo.capabilityStatusIdValue)
						},{
							html : '<b>变现能力：</b>' + function(){if(typeof(MortgageData.vProjMortMachineInfo.cashabilityIdValue)!="undefined"){return MortgageData.vProjMortMachineInfo.cashabilityIdValue}else{return ''}}()
						},{
							html : '<b>登记情况：</b>' + function(){if(typeof(MortgageData.vProjMortMachineInfo.registerInfoIdValue)!="undefined"){return MortgageData.vProjMortMachineInfo.registerInfoIdValue}else{return ''}}()
						},{
							html : '<b>出厂日期：</b>' + numTurnToString(MortgageData.vProjMortMachineInfo.leavefactorydate)
						},{
							html : '<b>模型估价：</b>' + numTurnToString(MortgageData.vProjMortMachineInfo.modelrangeprice,1)
						}]
					}]
	            
	            }]
			},{
				xtype:'fieldset',
	            title: '当物材料',
	            collapsible: true,
	            autoHeight:true,
	            anchor : '95%',
			 	items :[new PawnMaterialsView({projId:pawnItemId,businessType:"Pawn",isHidden_materials:true})]
			}]/*,
			tbar : [{
				text : '关闭',
				iconCls : 'cancelIcon',
				handler : function(){
					Ext.getCmp('win_seeCarInfo').destroy();
				}
			}]*/
		});
		
	
		var win_seeCarInfo = new Ext.Window({
			title: '查看机器设备信息',
			layout : 'fit',
			iconCls : 'btn-readdocument',
			//width:660,
			width : (screen.width-180)*0.6,
			height : 450,
			closable : true,
			collapsible : true,
			resizable : true,
			plain : true,
			border : false,
			autoScroll : true ,
			modal : true,
			buttonAlign: 'right',
			minHeight: 350,       
			minWidth: 560,
			bodyStyle:'overflowX:hidden',
			items : [panel_seeCar]
		});
			win_seeCarInfo.show();
	}
	
	Ext.Ajax.request({
		url : __ctxPath +'/creditFlow/pawn/pawnItems/getInfoPawnItemsList.do',
		method : 'POST',
		success : function(response, request) {
			obj = Ext.util.JSON.decode(response.responseText);
			seeCarInformation(obj.data)
		},
		failure : function(response) {
			Ext.Msg.alert('状态', '操作失败，请重试');
		},
		params : {
			id : pawnItemId,
			typeid : typeid
		}
	});
}