
/**
 * 获取浏览器类型 by shendexuan
 * 
 * @return {}
 */

FinanceExtensionlPanel = Ext.extend(Ext.Panel, {
	layout : "form",
	autoHeight : true,
	labelAlign : 'right',
	isAllReadOnly : false,
	isDiligenceReadOnly : false,
	idDefinition:'extenstion',
	record:null,
	
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		if (_cfg.isAllReadOnly) {
			this.isAllReadOnly = _cfg.isAllReadOnly;
			this.isDiligenceReadOnly = true;
		}
		if (_cfg.isDiligenceReadOnly) {
			this.isDiligenceReadOnly = _cfg.isDiligenceReadOnly;
		}
		if (_cfg.idDefinition) {
			this.idDefinition = _cfg.idDefinition;
		}
		if (typeof(_cfg.record) != "undefined") {
			this.record = _cfg.record;
		};
		Ext.applyIf(this, _cfg);
		this.initComponents();
		var idDefinition1=this.idDefinition;
		this.idDefinition=this.projectId+this.idDefinition;
		var continuationMoney=this.continuationMoney;
		var leftlabel = 115;
		var centerlabel = 115;
		var rightlabel = 110;
		var storepayintentPeriod="[";
		for (var i = 1; i < 31; i++) {
				storepayintentPeriod = storepayintentPeriod + "[" + i+ ", " + i + "],";
		}
		storepayintentPeriod = storepayintentPeriod.substring(0,storepayintentPeriod.length - 1);
		storepayintentPeriod = storepayintentPeriod + "]";
		var obstorepayintentPeriod = Ext.decode(storepayintentPeriod);
		/*
		var computeDayOfAccrual1 = function(formPanel) {
			var yearAccrual = 0;
			var accrualVal = 0;
			var accrualObj = formPanel.getCmpByName('slSuperviseRecord.continuationRate');// 贷款利率
			var managementConsultingOfRateObj = formPanel.getCmpByName('slSuperviseRecord.managementConsultingOfRate');// 贷款利率
			accrualVal = accrualObj.getValue();
			managementConsultingOfRateVal = managementConsultingOfRateObj.getValue();
		
			yearAccrual = (accrualVal+managementConsultingOfRateVal)*2/30;
			var styearAccrual=yearAccrual.toString().split(".");
			if(styearAccrual.length==2){
				yearAccrual=styearAccrual[0]+"."+Ext.util.Format.substr(styearAccrual[1], 0, 3)
			}
			
			return yearAccrual
		}*/
		
		var setIntentDate=function(payAccrualType,dayOfEveryPeriod,payintentPeriod,startDate,intentDatePanel,objectPanel){
			Ext.Ajax.request({
				url : __ctxPath + "/project/getIntentDateSlSmallloanProject.do",
				method : 'POST',
				scope:this,
				params : {
					payAccrualType:payAccrualType,
					dayOfEveryPeriod:dayOfEveryPeriod,
					payintentPeriod:payintentPeriod,
					startDate:startDate
				},
				success : function(response, request) {
					obj = Ext.util.JSON.decode(response.responseText);
					intentDatePanel.setValue(obj.intentDate);
					var intentDate=obj.intentDate
				
					if(startDate!='' && intentDate!=''){
						intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
						startDate=Ext.util.Format.date(startDate,'Y-m-d')
						var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
						var dayAccrualRate=objectPanel.getCmpByName('slSuperviseRecord.dayAccrualRate').getValue()
						if(dayAccrualRate!=''){
							objectPanel.getCmpByName('slSuperviseRecord.sumAccrualRate').setValue((dayAccrualRate*days).toFixed(7))
						}
						/*var dayManagementConsultingOfRate=objectPanel.getCmpByName('slSuperviseRecord.dayManagementConsultingOfRate').getValue()
						if(dayManagementConsultingOfRate!=''){
							objectPanel.getCmpByName('slSuperviseRecord.sumManagementConsultingOfRate').setValue(dayManagementConsultingOfRate*days)
						}
						var dayFinanceServiceOfRate=objectPanel.getCmpByName('slSuperviseRecord.dayFinanceServiceOfRate').getValue()
						if(dayFinanceServiceOfRate!=''){
							objectPanel.getCmpByName('slSuperviseRecord.sumFinanceServiceOfRate').setValue(dayFinanceServiceOfRate*days)
						}*/
						
					}
				},
				failure : function(response,request) {
					Ext.ux.Toast.msg('操作信息', '查询任务完成时限操作失败!');
				}
			});
	}

		FinanceExtensionlPanel.superclass.constructor.call(this, {
			items : [{
				layout : "column",
				border : false,
				scope : this,
				defaults : {
					anchor : '100%',
					columnWidth : 1,
					isFormField : true,
					labelWidth : leftlabel
				},
				items : [{
						xtype : 'hidden',
						name : 'slSuperviseRecord.isActualDay'
					},{
						xtype : 'hidden',
						name : 'slSuperviseRecord.opTime'
					},{
						xtype : 'hidden',
						name : 'slSuperviseRecord.creator'
					},{
						xtype : 'hidden',
						name : 'slSuperviseRecord.id'
					},{
					columnWidth : .25, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 85,
					items : [{
						xtype : "textfield",
						fieldLabel : "展期金额",
						fieldClass : 'field-align',
						name : "projectMoney1",
						readOnly : this.isAllReadOnly,
						allowNegative : false, // 允许负数
						style : {
							imeMode : 'disabled'
						},
						blankText : "展期金额不能为空，请正确填写!",
						allowBlank : false,
						anchor : "100%",// 控制文本框的长度
						listeners : {
							scope : this,
							afterrender : function(obj) {
								obj.on("keyup")
							},
							change : function(nf) {
								var value = nf.getValue();
								var index = value.indexOf(".");
								if (index <= 0) { // 如果第一次输入 没有进行格式化
									var aq=this.getOriginalContainer().getCmpByName('SlFundIntentViewVM_panel').gridPanel;
									var lastData=aq.getStore().data.items[aq.getStore().data.items.length-1].data;
									if(lastData.fundType=='principalRepayment' && value>lastData.incomeMoney){
										Ext.ux.Toast.msg('操作信息', '展期金额不能大于最后一期未还本金金额!');
										nf.setValue();
									}else{
										nf.setValue(Ext.util.Format.number(value,'0,000.00'))
										this.getCmpByName("slSuperviseRecord.continuationMoney").setValue(value);
									}
								} else {
									if (value.indexOf(",") <= 0) {
										var ke = Ext.util.Format.number(value,'0,000.00')
										nf.setValue(ke);
										this.getCmpByName("slSuperviseRecord.continuationMoney").setValue(value);
									} else {
										var last = value.substring(index + 1,value.length);
										if (last == 0) {
											var temp = value.substring(0, index);
											temp = temp.replace(/,/g, "");
											this.getCmpByName("slSuperviseRecord.continuationMoney").setValue(temp);
											nf.setValue(Ext.util.Format.number(temp,'0,000.00'))
										} else {
											var temp = value.replace(/,/g, "");
											this.getCmpByName("slSuperviseRecord.continuationMoney").setValue(temp);
											nf.setValue(Ext.util.Format.number(temp, '0,000.00'))
										}
									}

								}
							}
						}
					}, {
						xtype : "hidden",
						name : "slSuperviseRecord.continuationMoney",
						value : this.continuationMoney
					}]
				}, {
					columnWidth : .045, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 20,
					items : [{
								fieldLabel : "元 ",
								labelSeparator : '',
								anchor : "100%"
							}]
				}, {
					columnWidth : .25, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 85,
					items : [{
						xtype:'dicIndepCombo',
						allowBlank : false,
						fieldLabel : '日期模型',
						anchor : '100%',
						editable : false,
						nodeKey : 'dateModel',
						lazyInit : true,
						lazyRender : true,
						readOnly : this.isAllReadOnly,
						hiddenName : 'slSuperviseRecord.dateMode',
						listeners : {
							scope : this,
							afterrender :function(com){
								var st=com.getStore();
								st.on('load',function(){
									com.setValue(st.getAt(0).data.dicKey)
									com.clearInvalid();
								})
							}
						}
					}]
				},{
				columnWidth : 1,
					layout:'column',
					items : [
					 {
					columnWidth : .1, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 85,
					items : [{
						 fieldLabel : "还款方式 ",
						 fieldClass : 'field-align',
						//html : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计息周期:",
						anchor : "100%"
					}]
				}, {
					columnWidth : 0.12,
					labelWidth : 1,
					layout : 'form',
					items : [{
						xtype : 'radio',
						boxLabel : '等额本金',
						// fieldLabel : "计息方式",
						name : 'f1',
						id : "jixifs1" +this.idDefinition,
						inputValue : false,
						anchor : "100%",
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixifs1"
										+ this.idDefinition).getValue();
								if (flag == true) {
									this
											.getCmpByName('slSuperviseRecord.accrualtype')
											.setValue("sameprincipal");
											  Ext.getCmp("jixizq1"+this.idDefinition).setDisabled(true);
								      Ext.getCmp("jixizq2"+ this.idDefinition).setDisabled(true);
								        Ext.getCmp("jixizq3"+ this.idDefinition).setDisabled(true);
								          Ext.getCmp("jixizq4"+ this.idDefinition).setDisabled(true);  
								          
								           Ext.getCmp("jixizq6"+ this.idDefinition).setDisabled(true);
								           this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setDisabled(true);
							 	            this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setValue("");
							 	    
								              Ext.getCmp("jixizq2"+ this.idDefinition).setValue(true);
								             Ext.getCmp("jixizq1" +this.idDefinition).setValue(false);
								            this.getCmpByName('slSuperviseRecord.payaccrualType').setValue("monthPay");
								            
								             this.getCmpByName('slSuperviseRecord.payintentPeriod').setDisabled(false);
								         /*     this.getCmpByName('mqhkri1').hide();
							                   this.getCmpByName('mqhkri').show();*/
							                   Ext.getCmp("jixifs2"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs5"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs3"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs6"+this.idDefinition).setValue(false);
							                   Ext.getCmp("meiqihkrq1"+this.idDefinition).setDisabled(false);
							                   Ext.getCmp("meiqihkrq2"+this.idDefinition).setDisabled(false);
								}
							}
						}
					}]
				}, {
					columnWidth : 0.12,
					labelWidth : 1,
					layout : 'form',
					items : [{
						xtype : 'radio',
						boxLabel : '等额本息',
						anchor : "100%",
						name : 'f1',
						id : "jixifs2" +this.idDefinition,
						inputValue : false,
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixifs2"+ this.idDefinition).getValue();
								if (flag == true) {
									this.getCmpByName('slSuperviseRecord.accrualtype').setValue("sameprincipalandInterest");
								    Ext.getCmp("jixizq1"+ this.idDefinition).setDisabled(true);
								      Ext.getCmp("jixizq2"+ this.idDefinition).setDisabled(true);
								        Ext.getCmp("jixizq3"+ this.idDefinition).setDisabled(true);
								          Ext.getCmp("jixizq4"+ this.idDefinition).setDisabled(true);  
								           
								           Ext.getCmp("jixizq6"+ this.idDefinition).setDisabled(true);
								           this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setDisabled(true);
							 	           this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setValue("");
								          
							 	           Ext.getCmp("jixizq2"+ this.idDefinition).setValue(true);
								             Ext.getCmp("jixizq1"+ this.idDefinition).setValue(false);
								            this.getCmpByName('slSuperviseRecord.payaccrualType').setValue("monthPay");
								            
								             this.getCmpByName('slSuperviseRecord.payintentPeriod').setDisabled(false);
								            /*  this.getCmpByName('mqhkri1').hide();
							                    this.getCmpByName('mqhkri').show();*/
							                     Ext.getCmp("jixifs1"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs5"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs3"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs6"+this.idDefinition).setValue(false);
							                   Ext.getCmp("meiqihkrq1"+this.idDefinition).setDisabled(false);
							                   Ext.getCmp("meiqihkrq2"+this.idDefinition).setDisabled(false);
								}
							}
						}
					}]
				}, {
					columnWidth : 0.12,
					labelWidth : 1,
					layout : 'form',
					items : [{
						xtype : 'radio',
						boxLabel : '等本等息',
						anchor : "100%",
						name : 'f1',
						id : "jixifs5" +this.idDefinition,
						inputValue : false,
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixifs5"+ this.idDefinition).getValue();
								if (flag == true) {
									this.getCmpByName('slSuperviseRecord.accrualtype').setValue("sameprincipalsameInterest");
									if(this.isAllReadOnly==true){
										 Ext.getCmp("jixizq1"+ this.idDefinition).setDisabled(true);
								      Ext.getCmp("jixizq2"+ this.idDefinition).setDisabled(true);
								        Ext.getCmp("jixizq3"+ this.idDefinition).setDisabled(true);
								          Ext.getCmp("jixizq4"+ this.idDefinition).setDisabled(true);  
								           Ext.getCmp("jixizq6"+ this.idDefinition).setDisabled(true);
									}else{
								    Ext.getCmp("jixizq1"+ this.idDefinition).setDisabled(false);
								      Ext.getCmp("jixizq2"+ this.idDefinition).setDisabled(false);
								        Ext.getCmp("jixizq3"+ this.idDefinition).setDisabled(false);
								          Ext.getCmp("jixizq4"+ this.idDefinition).setDisabled(false);  
								           Ext.getCmp("jixizq6"+ this.idDefinition).setDisabled(false);
									}
								          // this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setDisabled(true);
							 	          // this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setValue("");
								            //this.getCmpByName('slSuperviseRecord.payaccrualType').setValue("monthPay");
								            
								             this.getCmpByName('slSuperviseRecord.payintentPeriod').setDisabled(false);
								             /* this.getCmpByName('mqhkri1').hide();
							                    this.getCmpByName('mqhkri').show();*/
							                     Ext.getCmp("jixifs2"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs1"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs3"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs6"+this.idDefinition).setValue(false);
							                   Ext.getCmp("meiqihkrq1"+this.idDefinition).setDisabled(true);
							                   Ext.getCmp("meiqihkrq2"+this.idDefinition).setDisabled(true);
							                    
								}
							}
						}
					}]
				}, {
					columnWidth : 0.12,
					labelWidth : 1,
					layout : 'form',
					items : [{
						xtype : 'radio',
						boxLabel : '按期收息,到期还本',
						name : 'f1',
						id : "jixifs3" +this.idDefinition,
						inputValue : false,
						checked : true,
						anchor : "100%",
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixifs3"
										+ this.idDefinition).getValue();
								if (flag == true) {
									this.getCmpByName('slSuperviseRecord.accrualtype').setValue("singleInterest");
									  Ext.getCmp("jixizq1"+ this.idDefinition).setDisabled(false);
								      Ext.getCmp("jixizq2"+ this.idDefinition).setDisabled(false);
								        Ext.getCmp("jixizq3"+ this.idDefinition).setDisabled(false);
								          Ext.getCmp("jixizq4"+ this.idDefinition).setDisabled(false);  
								           Ext.getCmp("jixizq6"+ this.idDefinition).setDisabled(false);
								           this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setDisabled(false);
								           Ext.getCmp("jixifs2"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs5"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs1"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs6"+this.idDefinition).setValue(false);
							                   Ext.getCmp("meiqihkrq1"+this.idDefinition).setDisabled(false);
							                   Ext.getCmp("meiqihkrq2"+this.idDefinition).setDisabled(false);
							               
								}
							}
						}
					}, {
						xtype : "hidden",
						name : "slSuperviseRecord.accrualtype",
						value : "singleInterest"

					}]
				}, {
					columnWidth : 0.12,
					labelWidth : 1,
					layout : 'form',
					items : [{
						
						xtype : 'radio',
						boxLabel : '其他还款方式',
						anchor : "100%",
						name : 'f1',
						id : "jixifs6" +this.idDefinition,
						inputValue : false,
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixifs6"+ this.idDefinition).getValue();
								if (flag == true) {
									this.getCmpByName('slSuperviseRecord.accrualtype').setValue("otherMothod");
								  
									if(this.isAllReadOnly==true){
										 Ext.getCmp("jixizq1"+ this.idDefinition).setDisabled(true);
								      Ext.getCmp("jixizq2"+ this.idDefinition).setDisabled(true);
								        Ext.getCmp("jixizq3"+ this.idDefinition).setDisabled(true);
								          Ext.getCmp("jixizq4"+ this.idDefinition).setDisabled(true);  
								           Ext.getCmp("jixizq6"+ this.idDefinition).setDisabled(true);
									}else{
								    Ext.getCmp("jixizq1"+ this.idDefinition).setDisabled(false);
								      Ext.getCmp("jixizq2"+ this.idDefinition).setDisabled(false);
								        Ext.getCmp("jixizq3"+ this.idDefinition).setDisabled(false);
								          Ext.getCmp("jixizq4"+ this.idDefinition).setDisabled(false);  
								           Ext.getCmp("jixizq6"+ this.idDefinition).setDisabled(false);
									}
								          // this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setDisabled(true);
							 	           //this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setValue("");
								          
							 	           Ext.getCmp("jixizq2"+ this.idDefinition).setValue(true);
								             Ext.getCmp("jixizq1"+ this.idDefinition).setValue(false);
								            this.getCmpByName('slSuperviseRecord.payaccrualType').setValue("monthPay");
								            
								             this.getCmpByName('slSuperviseRecord.payintentPeriod').setDisabled(false);
								            /*  this.getCmpByName('mqhkri1').hide();
							                    this.getCmpByName('mqhkri').show();*/
							                     Ext.getCmp("jixifs2"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs5"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs3"+this.idDefinition).setValue(false);
							                   Ext.getCmp("jixifs1"+this.idDefinition).setValue(false);
							                   Ext.getCmp("meiqihkrq1"+this.idDefinition).setDisabled(false);
							                   Ext.getCmp("meiqihkrq2"+this.idDefinition).setDisabled(false);
								}
							}
						}
					
					}/*{
						xtype : 'radio',
						boxLabel : '一次性收取利息',
						name : 'f1',
						id : "jixifs4" +this.idDefinition,
						inputValue : true,
						anchor : "100%",
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixifs4"
										+ this.idDefinition).getValue();
								if (flag == true) {
									this
											.getCmpByName('slSmallloanProject.accrualtype')
											.setValue("ontTimeAccrual");
											  Ext.getCmp("jixizq1"+this.idDefinition).setDisabled(true);
								      Ext.getCmp("jixizq2"+ this.idDefinition).setDisabled(true);
								        Ext.getCmp("jixizq3"+ this.idDefinition).setDisabled(true);
								          Ext.getCmp("jixizq4"+ this.idDefinition).setDisabled(true);  
								          
								           Ext.getCmp("jixizq6"+ this.idDefinition).setDisabled(true);
								           this.getCmpByName('slSmallloanProject.dayOfEveryPeriod').setDisabled(true);
							 	            this.getCmpByName('slSmallloanProject.dayOfEveryPeriod').setValue("");
							 	    
								              Ext.getCmp("jixizq6"+ this.idDefinition).setValue(true);
								             Ext.getCmp("jixizq1" +this.idDefinition).setValue(false);
								              Ext.getCmp("jixizq2" +this.idDefinition).setValue(false);
								               Ext.getCmp("jixizq3" +this.idDefinition).setValue(false);
								                Ext.getCmp("jixizq4" +this.idDefinition).setValue(false);
								            this.getCmpByName('slSmallloanProject.payaccrualType').setValue("owerPay");
								            
								             
							                   
									   this.getCmpByName('slSmallloanProject.payintentPeriod').setDisabled(true);
									  this.getCmpByName('slSmallloanProject.payintentPeriod').setValue(1);
								   this.getCmpByName('mqhkri').hide();
							       this.getCmpByName('mqhkri1').show();
							       
							        
								}else{
									   this.getCmpByName('slSmallloanProject.payintentPeriod').setDisabled(false);
									
								   this.getCmpByName('mqhkri1').hide();
							       this.getCmpByName('mqhkri').show();
								
								}
							}
						}
					}*/, {
						xtype : "hidden",
						name : "slSuperviseRecord.payaccrualType",
						value : "monthPay"

					}]
				}]
				
				},{
				columnWidth : 1,
					layout:'column',
					items : [ {
					columnWidth : .1, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 85,
					items : [{
						 fieldLabel : "还款周期 ",
						 fieldClass : 'field-align',
						//html : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计息周期:",
						anchor : "100%"
					}]
				}, {
					columnWidth : 0.12,
					labelWidth : 1,
					layout : 'form',
					items : [{
						xtype : 'radio',
						boxLabel : '日',
						name : 'z1',
						id : "jixizq1" + this.idDefinition,
						inputValue : true,
						anchor : "100%",
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixizq1"	+ this.idDefinition).getValue();
								if (flag == true) {
									this.getCmpByName('slSuperviseRecord.payaccrualType').setValue("dayPay");
									
									 Ext.getCmp("meiqihkrq1"+this.idDefinition).setDisabled(true);
									 Ext.getCmp("meiqihkrq1"+ this.idDefinition).setValue(false);
									 Ext.getCmp("meiqihkrq2"+ this.idDefinition).setDisabled(true);
									 Ext.getCmp("meiqihkrq2"+ this.idDefinition).setValue(true);
									Ext.getCmp("jixizq2"+this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq3"+ this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq4"+ this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq6"+ this.idDefinition).setValue(false);
									 this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setValue("")
									 	this.getCmpByName('slSuperviseRecord.isStartDatePay').setValue("2");
								var payAccrualType=this.getCmpByName('slSuperviseRecord.payaccrualType').getValue();
										var dayOfEveryPeriod=this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').getValue();
										var payintentPeriod=this.getCmpByName('slSuperviseRecord.payintentPeriod').getValue();
										var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue();
										var intentDatePanel=this.getCmpByName('slSuperviseRecord.endDate');
										setIntentDate(payAccrualType,dayOfEveryPeriod,payintentPeriod,startDate,intentDatePanel,this
										)
								     
								     
								}else {
								       
								       
								        Ext.getCmp("meiqihkrq1"+this.idDefinition).setDisabled(false);
									 Ext.getCmp("meiqihkrq2"+ this.idDefinition).setDisabled(false);
									 if(Ext.getCmp("meiqihkrq1"+ this.idDefinition).getValue()==true){
									  this.getCmpByName('slSuperviseRecord.payintentPerioDate').setDisabled(false);
									 }
								       }
								 
							}
						}
					}]
				}, {
					columnWidth : 0.12,
					labelWidth : 1,
					layout : 'form',
					items : [{
						xtype : 'radio',
						boxLabel : '月',
						name : 'z1',
						id : "jixizq2" +this.idDefinition,
						inputValue : false,
						checked : true,
						anchor : "100%",
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixizq2"
										+this.idDefinition).getValue();
								if (flag == true) {
									this.getCmpByName('slSuperviseRecord.payaccrualType').setValue("monthPay");
									Ext.getCmp("jixizq1"+this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq3"+ this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq4"+ this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq6"+ this.idDefinition).setValue(false);
									 this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setValue("")
									var payAccrualType=this.getCmpByName('slSuperviseRecord.payaccrualType').getValue();
										var dayOfEveryPeriod=this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').getValue();
										var payintentPeriod=this.getCmpByName('slSuperviseRecord.payintentPeriod').getValue();
										var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue();
										var intentDatePanel=this.getCmpByName('slSuperviseRecord.endDate');
										setIntentDate(payAccrualType,dayOfEveryPeriod,payintentPeriod,startDate,intentDatePanel,this)
								}
							}
						}
					}]
				}, {
					columnWidth : 0.12,
					labelWidth : 1,
					layout : 'form',
					items : [{
						xtype : 'radio',
						boxLabel : '季',
						name : 'z1',
						id : "jixizq3" + this.idDefinition,
						inputValue : false,
						anchor : "100%",
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixizq3"
										+this.idDefinition).getValue();
								if (flag == true) {
									this.getCmpByName('slSuperviseRecord.payaccrualType').setValue("seasonPay");
									Ext.getCmp("jixizq1"+this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq2"+ this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq4"+ this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq6"+ this.idDefinition).setValue(false);
									 this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setValue("")
								var payAccrualType=this.getCmpByName('slSuperviseRecord.payaccrualType').getValue();
										var dayOfEveryPeriod=this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').getValue();
										var payintentPeriod=this.getCmpByName('slSuperviseRecord.payintentPeriod').getValue();
										var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue();
										var intentDatePanel=this.getCmpByName('slSuperviseRecord.endDate');
										setIntentDate(payAccrualType,dayOfEveryPeriod,payintentPeriod,startDate,intentDatePanel,this)
								}
							}
						}
					}]
				}, {
					columnWidth : 0.12,
					labelWidth : 1,
					layout : 'form',
					items : [{
						xtype : 'radio',
						boxLabel : '年',
						name : 'z1',
						id : "jixizq4" + this.idDefinition,
						inputValue : false,
						anchor : "100%",
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixizq4"
										+ this.idDefinition).getValue();
								if (flag == true) {
									this.getCmpByName('slSuperviseRecord.payaccrualType').setValue("yearPay");
									Ext.getCmp("jixizq1"+this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq3"+ this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq2"+ this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq6"+ this.idDefinition).setValue(false);
									 this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setValue("")
									var payAccrualType=this.getCmpByName('slSuperviseRecord.payaccrualType').getValue();
										var dayOfEveryPeriod=this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').getValue();
										var payintentPeriod=this.getCmpByName('slSuperviseRecord.payintentPeriod').getValue();
										var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue();
										var intentDatePanel=this.getCmpByName('slSuperviseRecord.endDate');
										setIntentDate(payAccrualType,dayOfEveryPeriod,payintentPeriod,startDate,intentDatePanel,this)
								}
							}
						}
					}]
				}, {
					columnWidth : 0.09,
					labelWidth : 1,
					layout : 'form',
					items : [{
						xtype : 'radio',
						boxLabel : '自定义周期',
						name : 'z1',
						id : "jixizq6" + this.idDefinition,
						inputValue : false,
						anchor : "100%",
						disabled : this.isAllReadOnly,
						listeners : {
							scope : this,
							check : function(obj, checked) {
								var flag = Ext.getCmp("jixizq6"
										+ this.idDefinition).getValue();
								if (flag == true) {
									this.getCmpByName('slSuperviseRecord.payaccrualType').setValue("owerPay");
									
								   this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setDisabled(false);
								   
								    Ext.getCmp("meiqihkrq1"+this.idDefinition).setDisabled(true);
									 Ext.getCmp("meiqihkrq1"+ this.idDefinition).setValue(false);
									 Ext.getCmp("meiqihkrq2"+ this.idDefinition).setDisabled(true);
									 Ext.getCmp("meiqihkrq2"+ this.idDefinition).setValue(true);
									 Ext.getCmp("jixizq1"+this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq3"+ this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq4"+ this.idDefinition).setValue(false);
									 Ext.getCmp("jixizq2"+ this.idDefinition).setValue(false);
									 
								}else{
								 this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setDisabled(true);
							 	    this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').setValue("");
							 	    if(Ext.getCmp("jixizq1"+ this.idDefinition).getValue()==false){
								 	     Ext.getCmp("meiqihkrq1"+this.idDefinition).setDisabled(false);
										 Ext.getCmp("meiqihkrq2"+ this.idDefinition).setDisabled(false);
										 if(Ext.getCmp("meiqihkrq1"+ this.idDefinition).getValue()==true){
										  this.getCmpByName('slSuperviseRecord.payintentPerioDate').setDisabled(false);
										 }
									  }
								    
								}
							}
						}
					}]
				}, {
					columnWidth : 0.06,
					labelWidth : 5,
					layout : 'form',
					items : [{
					 xtype:'textfield',
					 anchor : "100%",
				 	readOnly : this.isAllReadOnly,
				 	fieldClass : 'field-align',
					 name:'slSuperviseRecord.dayOfEveryPeriod',
					 listeners : {
					 	scope : this,
					 	'change' : function(){
					 		var payAccrualType=this.getCmpByName('slSuperviseRecord.payaccrualType').getValue();
							var dayOfEveryPeriod=this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').getValue();
							var payintentPeriod=this.getCmpByName('slSuperviseRecord.payintentPeriod').getValue();
							var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue();
							var intentDatePanel=this.getCmpByName('slSuperviseRecord.endDate');
							setIntentDate(payAccrualType,dayOfEveryPeriod,payintentPeriod,startDate,intentDatePanel,this)
					 	}
					 }
					}
					]}, {
						columnWidth : 0.07,
						labelWidth :40,
						layout : 'form',
						items : [{
						fieldLabel : "日/期",
							labelSeparator : '',
							anchor : "100%"
								}]}
					
					]}, {
					columnWidth : 1,
					layout:'column',
					items:[{
					columnWidth : .25, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 85,
					items : [{
								fieldLabel : "展期期数",
								xtype : "textfield",
								fieldClass : 'field-align',
								allowBlank : false,
								readOnly : this.isAllReadOnly,
								name : "slSuperviseRecord.payintentPeriod",
								anchor : "100%",
								listeners : {
								 	scope : this,
								 	'change' : function(){
								 		var payAccrualType=this.getCmpByName('slSuperviseRecord.payaccrualType').getValue();
										var dayOfEveryPeriod=this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').getValue();
										var payintentPeriod=this.getCmpByName('slSuperviseRecord.payintentPeriod').getValue();
										var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue();
										var intentDatePanel=this.getCmpByName('slSuperviseRecord.endDate');
										setIntentDate(payAccrualType,dayOfEveryPeriod,payintentPeriod,startDate,intentDatePanel,this)
								 	}
								 }

							}]
				}, {
					columnWidth : .045, // 该列在整行中所占的百分比
					layout : "form", // 从上往下的布局
					labelWidth : 20,
					items : [{
								fieldLabel : "期",
								labelSeparator : '',
								anchor : "100%"
							}]
				},{
					columnWidth : .25,
					layout : 'form',
					labelWidth : 85,
					items : [{
						fieldLabel : "展期开始日期",
						xtype : "datefield",
						style : {
							imeMode : 'disabled'
						},
						name : "slSuperviseRecord.startDate",
						allowBlank : false,
						readOnly : this.isAllReadOnly,
						blankText : "展期开始日期不能为空，请正确填写!",
						anchor : "100%",
						format : 'Y-m-d',
						listeners : {
							scope : this,
							'change' : function(nf){
								var aq=this.getOriginalContainer().getCmpByName('SlFundIntentViewVM_panel').gridPanel;
								var lastData=aq.getStore().data.items[aq.getStore().data.items.length-1].data;
								if(lastData.fundType=='principalRepayment' && nf.getValue()<new Date(lastData.intentDate)){
									Ext.ux.Toast.msg('操作信息', '展期开始日期不能早于最后一期本金计划到账日!');
									nf.setValue();
								}else{
									var payAccrualType=this.getCmpByName('slSuperviseRecord.payaccrualType').getValue();
									var dayOfEveryPeriod=this.getCmpByName('slSuperviseRecord.dayOfEveryPeriod').getValue();
									var payintentPeriod=this.getCmpByName('slSuperviseRecord.payintentPeriod').getValue();
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue();
									var intentDatePanel=this.getCmpByName('slSuperviseRecord.endDate');
									setIntentDate(payAccrualType,dayOfEveryPeriod,payintentPeriod,startDate,intentDatePanel,this);
								}
							}
						}
					}]
				},{
					columnWidth : .26,
					layout : 'form',
					labelWidth : 105,
					items : [{
						fieldLabel : "展期结束日期",
						xtype : "datefield",
						style : {
							imeMode : 'disabled'
						},
						name : "slSuperviseRecord.endDate",
						readOnly : true,
						allowBlank : false,
						blankText : "展期结束日期不能为空，请正确填写!",
						anchor : "100%",
						format : 'Y-m-d'
					}]
				}]
				},{
					columnWidth : 1,
					layout : 'column',
					items : [{
						columnWidth : .1,
						layout : 'form',
						labelWidth : 85,
						labelAlign :'right',
						items : [{
							fieldLabel : '还款选项'
						}]
					},{
						columnWidth : .12, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 1,
						items : [{
							xtype : "checkbox",
							boxLabel : "前置付息",
							disabled : this.isAllReadOnly,
							anchor : "100%",
							name : "isPreposePayAccrualsupervise",
							// value :true
							checked : this.record == null
									|| this.record.data.isPreposePayAccrualsupervise== 0
									? null
									: true,
							listeners : {
								scope : this,
								'check' : function(box,value){
									if(value==true){
										this.getCmpByName('slSuperviseRecord.isPreposePayAccrualsupervise').setValue(1);
									}else{
										this.getCmpByName('slSuperviseRecord.isPreposePayAccrualsupervise').setValue(0);
									}
								}
							}
						},{
							xtype :'hidden',
							name : 'slSuperviseRecord.isPreposePayAccrualsupervise',
							value:0
						}]
					},{
						columnWidth : .15, // 该列在整行中所占的百分比
						layout : "form", // 从上往下的布局
						labelWidth : 1,
						items : [{
							xtype : "checkbox",
							boxLabel : "一次性支付全部利息",
							disabled : this.isAllReadOnly,
							anchor : "100%",
							name : "isInterestByOneTimeCheck",
							// value :true
							checked : this.record == null
									|| this.record.data.isInterestByOneTime== 0
									? null
									: true,
							listeners : {
								scope : this,
								'check' : function(box,value){
									if(value==true){
										this.getCmpByName('slSuperviseRecord.isInterestByOneTime').setValue(1);
									}else{
										this.getCmpByName('slSuperviseRecord.isInterestByOneTime').setValue(0);
									}
								}
							}
						},{
							xtype :'hidden',
							name : 'slSuperviseRecord.isInterestByOneTime',
							value:0
						}]
					},{
					columnWidth : .45, 
					name :"mqhkri",
					layout : "column", 
					items : [ {
							columnWidth : 0.278,
							labelWidth : 66,
							layout : 'form',
							items : [{
										xtype : 'radio',
										fieldLabel : '每期还款日',
										boxLabel : '固定在',
										name : 'q1',
										id : "meiqihkrq1" + this.idDefinition,
										inputValue : true,
										anchor : "100%",
										disabled  :  this.isAllReadOnly,
										listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("meiqihkrq1"+ this.idDefinition).getValue();
											if (flag == true) {
												this.getCmpByName('slSuperviseRecord.isStartDatePay').setValue("1");
												this.getCmpByName('slSuperviseRecord.payintentPerioDate').setDisabled(false);
											}
										}
									}

									}, {
										xtype : "hidden",
										name : "slSuperviseRecord.isStartDatePay"

									}]
						}, {
							columnWidth : 0.112,
							labelWidth : 1,
							layout : 'form',
							items : [{
										xtype : 'textfield',
										readOnly :  this.isAllReadOnly,
										name : "slSuperviseRecord.payintentPerioDate",
										xtype : 'combo',
										mode : 'local',
										disabled :true,
										displayField : 'name',
										valueField : 'id',
										editable : true,
										store : new Ext.data.SimpleStore({
													fields : ["name", "id"],
													data : obstorepayintentPeriod
												}),
										triggerAction : "all",
										hiddenName : "slSuperviseRecord.payintentPerioDate",
										fieldLabel : "",
										anchor : '100%'
									}]
						}, {
							columnWidth : 0.12,
							labelWidth :45,
							layout : 'form',
							items : [{
							fieldLabel : "号还款",
								labelSeparator : '',
								anchor : "100%"
									}]
						}, {
							columnWidth : 0.47,
							labelWidth : 10,
							layout : 'form',
							items : [{
										xtype : 'radio',
										boxLabel : '按实际放款日对日还款',
										name : 'q1',
										id : "meiqihkrq2" + this.idDefinition,
										inputValue : true,
										checked : true,
										anchor : "100%",
										disabled  :  this.isAllReadOnly,
										listeners : {
										scope : this,
										check : function(obj, checked) {
											var flag = Ext.getCmp("meiqihkrq2"
													+ this.idDefinition).getValue();
											if (flag == true) {
												this.getCmpByName('slSuperviseRecord.isStartDatePay').setValue("2");
												this.getCmpByName('slSuperviseRecord.payintentPerioDate').setValue(null);
														this.getCmpByName('slSuperviseRecord.payintentPerioDate').setDisabled(true);
											}
										}
									}

									}]
						}]
					}]
				},{
					columnWidth : 1,
					layout : 'column',
					items : [{
						columnWidth :.1,
						layout : 'form',
						labelWidth : 85,
						labelAlign : 'right',
						items : [{
							fieldLabel : '展期贷款利率',
							allowBlank : false
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : "年化利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.yearAccrualRate",
							fieldClass : 'field-align',
							decimalPrecision : 7,
							readOnly : this.isAllReadOnly,
							anchor : '100%',
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'blur' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var accrualnf=this.getCmpByName('slSuperviseRecord.continuationRate')
									var dayAccrualRatenf=this.getCmpByName('slSuperviseRecord.dayAccrualRate')
									var sumAccrualRatenf=this.getCmpByName('slSuperviseRecord.sumAccrualRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									accrualnf.setValue((nf.getValue()/12).toFixed(7))
									if(null!=dateModel && dateModel=='dateModel_360'){
										dayAccrualRatenf.setValue((nf.getValue()/360).toFixed(7))
										this.getCmpByName('slSuperviseRecord.continuationRateNew').setValue((nf.getValue()/360).toFixed(7))
										if(startDate!='' && intentDate!=''){
											intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
											sumAccrualRatenf.setValue((nf.getValue()/360*days).toFixed(7))
										}
									}else if(null!=dateModel && dateModel=='dateModel_365'){
										dayAccrualRatenf.setValue((nf.getValue()/365).toFixed(7))
										this.getCmpByName('slSuperviseRecord.continuationRateNew').setValue(nf.getValue()/365)
										if(startDate!='' && intentDate!=''){
											intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
											sumAccrualRatenf.setValue((nf.getValue()/365*days).toFixed(7))
										}
									}
								}
							}
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlign : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlgin : 'right',
						items : [{
							fieldLabel : "月化利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.continuationRate",
							readOnly : this.isAllReadOnly,
							fieldClass : 'field-align',
							style : {
								imeMode : 'disabled'
							},
							anchor : '100%',
							decimalPrecision : 7,
							value :0,
							listeners : {
								scope : this,
								'blur' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var yearAccrualRatenf=this.getCmpByName('slSuperviseRecord.yearAccrualRate')
									var dayAccrualRatenf=this.getCmpByName('slSuperviseRecord.dayAccrualRate')
									var sumAccrualRatenf=this.getCmpByName('slSuperviseRecord.sumAccrualRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									yearAccrualRatenf.setValue((nf.getValue()*12).toFixed(7))
									dayAccrualRatenf.setValue((nf.getValue()/30).toFixed(7))
									if(startDate!='' && intentDate!=''){
										intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
										startDate=Ext.util.Format.date(startDate,'Y-m-d')
										var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
										sumAccrualRatenf.setValue((nf.getValue()/30*days).toFixed(7))
									}
									this.getCmpByName('slSuperviseRecord.continuationRateNew').setValue((nf.getValue()/30).toFixed(7))
								}
							}
							
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlgin : 'right',
						items : [{
							fieldLabel : "日化利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.dayAccrualRate",
							readOnly : this.isAllReadOnly,
							fieldClass : 'field-align',
							anchor : '100%',
							decimalPrecision : 7,
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'blur' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var accrualnf=this.getCmpByName('slSuperviseRecord.continuationRate')
									var yearAccrualRatenf=this.getCmpByName('slSuperviseRecord.yearAccrualRate')
									var sumAccrualRatenf=this.getCmpByName('slSuperviseRecord.sumAccrualRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									accrualnf.setValue((nf.getValue()*30).toFixed(7))
									this.getCmpByName('slSuperviseRecord.continuationRateNew').setValue(nf.getValue())
									if(null!=dateModel && dateModel=='dateModel_360'){
										yearAccrualRatenf.setValue((nf.getValue()*360).toFixed(7))
									}else if(null!=dateModel && dateModel=='dateModel_365'){
										yearAccrualRatenf.setValue(nf.getValue()*365)
									}
									if(startDate!='' && intentDate!=''){
										intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
										startDate=Ext.util.Format.date(startDate,'Y-m-d')
										var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
										sumAccrualRatenf.setValue((nf.getValue()*days).toFixed(7))
									}
								}
							}
						},{
						 	xtype : 'hidden',
						 	name : 'slSuperviseRecord.continuationRateNew',
						 	value : 0
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlgin : 'right',
						items : [{
							fieldLabel : "合计利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.sumAccrualRate",
							anchor : '100%',
							decimalPrecision : 8,
							readOnly : this.isAllReadOnly,
							fieldClass : 'field-align',
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'change' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var accrualnf=this.getCmpByName('slSuperviseRecord.continuationRate')
									var yearAccrualRatenf=this.getCmpByName('slSuperviseRecord.yearAccrualRate')
									var dayAccrualRatenf=this.getCmpByName('slSuperviseRecord.dayAccrualRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									if(startDate!='' && intentDate!=''){
										intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
										startDate=Ext.util.Format.date(startDate,'Y-m-d')
										var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
										var rate=nf.getValue()/days
										dayAccrualRatenf.setValue(rate.toFixed(7));
										if(null!=dateModel && dateModel=='dateModel_360'){
											yearAccrualRatenf.setValue((rate*360).toFixed(7))
										}else if(null!=dateModel && dateModel=='dateModel_365'){
											yearAccrualRatenf.setValue((rate*365).toFixed(7))
										}
										accrualnf.setValue((rate*30).toFixed(7))
										this.getCmpByName('slSuperviseRecord.continuationRateNew').setValue((rate*30).toFixed(7))
									}
								}
							}
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					}]
				}/*,{
					columnWidth : 1,
					layout : 'column',
					items : [{
						columnWidth :.1,
						layout : 'form',
						labelWidth : 85,
						labelAlign : 'right',
						items : [{
							fieldLabel : '管理咨询费率',
							allowBlank :false
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : "年化利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.yearManagementConsultingOfRate",
							readOnly : this.isAllReadOnly,
							fieldClass : 'field-align',
							anchor : '100%',
							decimalPrecision : 8,
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'change' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var accrualnf=this.getCmpByName('slSuperviseRecord.managementConsultingOfRate')
									var dayAccrualRatenf=this.getCmpByName('slSuperviseRecord.dayManagementConsultingOfRate')
									var sumAccrualRatenf=this.getCmpByName('slSuperviseRecord.sumManagementConsultingOfRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									accrualnf.setValue(nf.getValue()/12)
									if(null!=dateModel && dateModel=='dateModel_360'){
										dayAccrualRatenf.setValue(nf.getValue()/360)
										if(startDate!='' && intentDate!=''){
											intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
											sumAccrualRatenf.setValue(nf.getValue()/360*days)
										}
									}else if(null!=dateModel && dateModel=='dateModel_365'){
										dayAccrualRatenf.setValue(nf.getValue()/365)
										if(startDate!='' && intentDate!=''){
											intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
											sumAccrualRatenf.setValue(nf.getValue()/365*days)
										}
									}
								}
							}
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : "月化利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.managementConsultingOfRate",
							readOnly : this.isAllReadOnly,
							fieldClass : 'field-align',
							anchor : '100%',
							decimalPrecision : 8,
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'change' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var yearAccrualRatenf=this.getCmpByName('slSuperviseRecord.yearManagementConsultingOfRate')
									var dayAccrualRatenf=this.getCmpByName('slSuperviseRecord.dayManagementConsultingOfRate')
									var sumAccrualRatenf=this.getCmpByName('slSuperviseRecord.sumManagementConsultingOfRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									yearAccrualRatenf.setValue(nf.getValue()*12)
									dayAccrualRatenf.setValue(nf.getValue()/30)
									if(startDate!='' && intentDate!=''){
										intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
										sumAccrualRatenf.setValue(nf.getValue()/30*days)
									}
								}
							}
							
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : "日化利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.dayManagementConsultingOfRate",
							readOnly : this.isAllReadOnly,
							anchor : '100%',
							decimalPrecision : 8,
							fieldClass : 'field-align',
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'change' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var accrualnf=this.getCmpByName('slSuperviseRecord.managementConsultingOfRate')
									var yearAccrualRatenf=this.getCmpByName('slSuperviseRecord.yearManagementConsultingOfRate')
									var sumAccrualRatenf=this.getCmpByName('slSuperviseRecord.sumManagementConsultingOfRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									accrualnf.setValue(nf.getValue()*30)
									if(null!=dateModel && dateModel=='dateModel_360'){
										yearAccrualRatenf.setValue(nf.getValue()*360)
										
									}else if(null!=dateModel && dateModel=='dateModel_365'){
										yearAccrualRatenf.setValue(nf.getValue()*365)
									}
									if(startDate!='' && intentDate!=''){
										intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
										sumAccrualRatenf.setValue(nf.getValue()*days)
									}
								}
							}
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : "合计利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.sumManagementConsultingOfRate",
							readOnly : this.isAllReadOnly,
							decimalPrecision : 8,
							anchor : '100%',
							fieldClass : 'field-align',
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'change' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var accrualnf=this.getCmpByName('slSuperviseRecord.managementConsultingOfRate')
									var yearAccrualRatenf=this.getCmpByName('slSuperviseRecord.yearManagementConsultingOfRate')
									var dayAccrualRatenf=this.getCmpByName('slSuperviseRecord.dayManagementConsultingOfRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									
									if(startDate!='' && intentDate!=''){
										intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
										var rate=nf.getValue()/days
										dayAccrualRatenf.setValue(rate);
										if(null!=dateModel && dateModel=='dateModel_360'){
											yearAccrualRatenf.setValue(rate*360)
										
										}else if(null!=dateModel && dateModel=='dateModel_365'){
											yearAccrualRatenf.setValue(rate*365)
										}
										accrualnf.setValue(rate*30)
									}
								}
							}
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					}]
				},{
					columnWidth : 1,
					layout : 'column',
					items : [{
						columnWidth :.1,
						layout : 'form',
						labelWidth : 85,
						labelAlign : 'right',
						items : [{
							fieldLabel : '财务服务费率',
							allowBlank : false
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : "年化利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.yearFinanceServiceOfRate",
							readOnly : this.isAllReadOnly,
							decimalPrecision : 8,
							anchor : '100%',
							fieldClass : 'field-align',
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'change' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var accrualnf=this.getCmpByName('slSuperviseRecord.financeServiceOfRate')
									var dayAccrualRatenf=this.getCmpByName('slSuperviseRecord.dayFinanceServiceOfRate')
									var sumAccrualRatenf=this.getCmpByName('slSuperviseRecord.sumFinanceServiceOfRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									accrualnf.setValue(nf.getValue()/12)
									if(null!=dateModel && dateModel=='dateModel_360'){
										dayAccrualRatenf.setValue(nf.getValue()/360)
										if(startDate!='' && intentDate!=''){
											intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
											sumAccrualRatenf.setValue(nf.getValue()/360*days)
										}
									}else if(null!=dateModel && dateModel=='dateModel_365'){
										dayAccrualRatenf.setValue(nf.getValue()/365)
										if(startDate!='' && intentDate!=''){
											intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
											sumAccrualRatenf.setValue(nf.getValue()/365*days)
										}
									}
								}
							}
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : "月化利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.financeServiceOfRate",
							readOnly : this.isAllReadOnly, 
							decimalPrecision : 8,
							anchor : '100%',
							fieldClass : 'field-align',
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'change' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var yearAccrualRatenf=this.getCmpByName('slSuperviseRecord.yearFinanceServiceOfRate')
									var dayAccrualRatenf=this.getCmpByName('slSuperviseRecord.dayFinanceServiceOfRate')
									var sumAccrualRatenf=this.getCmpByName('slSuperviseRecord.sumFinanceServiceOfRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									yearAccrualRatenf.setValue(nf.getValue()*12)
									dayAccrualRatenf.setValue(nf.getValue()/30)
									if(startDate!='' && intentDate!=''){
										intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
										sumAccrualRatenf.setValue(nf.getValue()/30*days)
									}
								}
							}
							
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : "日化利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							anchor : '100%',
							name : "slSuperviseRecord.dayFinanceServiceOfRate",
							readOnly : this.isAllReadOnly,
							decimalPrecision : 8,
							fieldClass : 'field-align',
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'change' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var accrualnf=this.getCmpByName('slSuperviseRecord.financeServiceOfRate')
									var yearAccrualRatenf=this.getCmpByName('slSuperviseRecord.yearFinanceServiceOfRate')
									var sumAccrualRatenf=this.getCmpByName('slSuperviseRecord.sumFinanceServiceOfRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									accrualnf.setValue(nf.getValue()*30)
									if(null!=dateModel && dateModel=='dateModel_360'){
										yearAccrualRatenf.setValue(nf.getValue()*360)
										
									}else if(null!=dateModel && dateModel=='dateModel_365'){
										yearAccrualRatenf.setValue(nf.getValue()*365)
									}
									if(startDate!='' && intentDate!=''){
											intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')

											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
										sumAccrualRatenf.setValue(nf.getValue()*days)
									}
								}
							}
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					},{
						columnWidth : .07,
						layout : 'form',
						labelWidth : 60,
						labelAlign : 'right',
						items : [{
							fieldLabel : "合计利率",
							labelSeparator : ''
						}]
					},{
						columnWidth : .08,
						layout : 'form',
						items : [{
							hideLabel :true,
							xtype : 'numberfield',
							name : "slSuperviseRecord.sumFinanceServiceOfRate",
							readOnly : this.isAllReadOnly,
							decimalPrecision : 8,
							anchor : '100%',
							fieldClass : 'field-align',
							style : {
								imeMode : 'disabled'
							},
							value :0,
							listeners : {
								scope : this,
								'change' : function(nf){
									var dateModel=this.getCmpByName('slSuperviseRecord.dateMode').getValue()
									var accrualnf=this.getCmpByName('slSuperviseRecord.financeServiceOfRate')
									var yearAccrualRatenf=this.getCmpByName('slSuperviseRecord.yearFinanceServiceOfRate')
									var dayAccrualRatenf=this.getCmpByName('slSuperviseRecord.dayFinanceServiceOfRate')
									var startDate=this.getCmpByName('slSuperviseRecord.startDate').getValue()
									var intentDate=this.getCmpByName('slSuperviseRecord.endDate').getValue()
									
									if(startDate!='' && intentDate!=''){
										intentDate=Ext.util.Format.date(intentDate,'Y-m-d')
											startDate=Ext.util.Format.date(startDate,'Y-m-d')
											var days=((new Date(intentDate.substring(0,4),intentDate.substring(5,intentDate.lastIndexOf('-'))-1,intentDate.substring(intentDate.lastIndexOf('-')+1,intentDate.length))).getTime()-(new Date(startDate.substring(0,4),startDate.substring(5,startDate.lastIndexOf('-'))-1,startDate.substring(startDate.lastIndexOf('-')+1,startDate.length))).getTime())/1000/60/60/24
										var rate=nf.getValue()/days
										dayAccrualRatenf.setValue(rate);
										if(null!=dateModel && dateModel=='dateModel_360'){
											yearAccrualRatenf.setValue(rate*360)
										
										}else if(null!=dateModel && dateModel=='dateModel_365'){
											yearAccrualRatenf.setValue(rate*365)
										}
										accrualnf.setValue(rate*30)
									}
								}
							}
						}]
					},{
						columnWidth : .05,
						layout : 'form',
						labelWidth : 20,
						labelAlgin : 'left',
						items : [{
							fieldLabel : "%",
							labelSeparator : '',
							anchor : "100%"
						}]
					}]
				}*/,{
					columnWidth : 1,
					layout : 'form',
					buttonAlign : 'center',
					style : 'margin-left : 450px',
					items : [{
						xtype : 'button',
						text : '贷款试算',
						iconCls : 'btn-search',
						width : 110,
						hidden : this.isHiddencalculateBtn,
						scope : this,
						handler : function() {
							var isHiddenbackBtn=this.isHiddenbackBtn;
							 var continuationMoney=this.getCmpByName("slSuperviseRecord.continuationMoney").getValue();
							 var startDate=this.getCmpByName("slSuperviseRecord.startDate").getValue();
							 var payaccrualType=this.getCmpByName("slSuperviseRecord.payaccrualType").getValue();
							 var dayOfEveryPeriod=this.getCmpByName("slSuperviseRecord.dayOfEveryPeriod").getValue();
							 var payintentPeriod=this.getCmpByName("slSuperviseRecord.payintentPeriod").getValue();
							 var isStartDatePay=this.getCmpByName("slSuperviseRecord.isStartDatePay").getValue();
							 var payintentPerioDate=this.getCmpByName("slSuperviseRecord.payintentPerioDate").getValue();
							 var endDate=this.getCmpByName("slSuperviseRecord.endDate").getValue();
							 var continuationRate=this.getCmpByName("slSuperviseRecord.continuationRate").getValue();
							 var accrualtype=this.getCmpByName("slSuperviseRecord.accrualtype").getValue();
							  var isPreposePayAccrualsupervise=this.getCmpByName("slSuperviseRecord.isPreposePayAccrualsupervise").getValue();
							 var isInterestByOneTime=this.getCmpByName("slSuperviseRecord.isInterestByOneTime").getValue();
							 var yearAccrualRate=this.getCmpByName("slSuperviseRecord.yearAccrualRate").getValue();
							 var dayAccrualRate=this.getCmpByName("slSuperviseRecord.dayAccrualRate").getValue();
							 var sumAccrualRate=this.getCmpByName("slSuperviseRecord.sumAccrualRate").getValue();
							// var managementConsultingOfRate=this.getCmpByName("slSuperviseRecord.managementConsultingOfRate").getValue();
							// var yearManagementConsultingOfRate=this.getCmpByName("slSuperviseRecord.yearManagementConsultingOfRate").getValue();
							// var dayManagementConsultingOfRate=this.getCmpByName("slSuperviseRecord.dayManagementConsultingOfRate").getValue();
							// var sumManagementConsultingOfRate=this.getCmpByName("slSuperviseRecord.sumManagementConsultingOfRate").getValue();
							// var financeServiceOfRate=this.getCmpByName("slSuperviseRecord.financeServiceOfRate").getValue();
							// var yearFinanceServiceOfRate=this.getCmpByName("slSuperviseRecord.yearFinanceServiceOfRate").getValue();
							// var dayFinanceServiceOfRate=this.getCmpByName("slSuperviseRecord.dayFinanceServiceOfRate").getValue();
							// var sumFinanceServiceOfRate=this.getCmpByName("slSuperviseRecord.sumFinanceServiceOfRate").getValue();
							 var continuationRateNew=this.getCmpByName("slSuperviseRecord.continuationRateNew").getValue();
							 var dateMode=this.getCmpByName("slSuperviseRecord.dateMode").getValue();
							 new SuperviseFundIntent({
								 continuationMoney:continuationMoney,
								 startDate:startDate,
								 payaccrualType:payaccrualType,
								 dayOfEveryPeriod:dayOfEveryPeriod,
								 payintentPeriod:payintentPeriod,
								 isStartDatePay:isStartDatePay,
								 payintentPerioDate:payintentPerioDate,
								 endDate:endDate,
								 continuationRate:continuationRate,
								 accrualtype:accrualtype,
								 projectId:this.projectId,
								 isPreposePayAccrualsupervise:isPreposePayAccrualsupervise,
								 isInterestByOneTime:isInterestByOneTime,
								 yearAccrualRate:yearAccrualRate,
								 dayAccrualRate:dayAccrualRate,
								 sumAccrualRate:sumAccrualRate,
								 managementConsultingOfRate:0,
								 yearManagementConsultingOfRate:0,
								 dayManagementConsultingOfRate:0,
								 sumManagementConsultingOfRate:0,
								 financeServiceOfRate:0,
								 yearFinanceServiceOfRate:0,
								 dayFinanceServiceOfRate:0,
								 sumFinanceServiceOfRate:0,
								 continuationRateNew:continuationRateNew,
								 dateMode:dateMode,
								 idDefinition1:idDefinition1,
								 businessType : this.businessType,
								 objectfinace:this,
								 isHiddenbackBtn:isHiddenbackBtn
								}).show();
					}
										
					}]
				}]
			}]
		});
	},
	initComponents : function() {
	},
	cc : function() {

		// alert('ddd');
	}
});







 // Ext.reg('AlterAccrualPanel', ExtUD.Ext.AlterAccrualPanel);

