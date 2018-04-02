/**
 * @author
 * @createtime
 * @class OperateContractWindow
 * @extends Ext.Window
 * @description OperateContractWindow
 * @company
 */
OperateKxcsContractWindow = Ext.extend(Ext.Window, {
	// 内嵌panelContract
	panelContract : null,
	categoryId:null,
	piKey:null,
	// 构造函数
	constructor : function(_cfg) {
		if (typeof(_cfg.title) != "undefined") {
			this.title = _cfg.title;
		}else{
			this.title = '';
		};
		if (typeof(_cfg.categoryId) != "undefined") {
			this.categoryId = _cfg.categoryId;
		};
		if (typeof(_cfg.businessType) != "undefined") {
			this.businessType = _cfg.businessType;
			if(this.businessType == 'SmallLoan'){
				this.HTLX = 'XEDQ';//合同类型（合同模板祖宗ID）,小贷合同
				this.windowHeight = 200;
			}else if(this.businessType == 'Guarantee'){
				this.HTLX = 'DBDQ';//企业贷合同
				this.windowHeight = 200;
			}else if(this.businessType == 'Financing'){
				this.HTLX = 'ZJRZ'
				this.windowHeight = 230;
			}else if(this.businessType == 'LeaseFinance'){
				this.HTLX = 'JRZL'
				this.windowHeight = 230;
			}
		};
		if (typeof(_cfg.piKey) != "undefined") {
			this.piKey = _cfg.piKey;
		};
		if (typeof(_cfg.contractId) != "undefined") {
			this.contractId = _cfg.contractId;
		};
		if (typeof(_cfg.htType) != "undefined") {
			this.htType = _cfg.htType;
			if(this.htType == 'clauseContract' && this.businessType =='SmallLoan'){
				this.HTLX = 'XEDZZQ'//小额贷中展期
			}else if(this.htType == 'clauseContract' && this.businessType =='Guarantee'){
				this.HTLX = 'DBDZZQ';
			}else if(this.htType == 'thirdRalationContract' && this.businessType == 'Financing'){
				this.HTLX = 'ZJRZ'//资金融资
			}
			if(this.htType == 'thirdContract' && this.businessType =='Guarantee'){
				this.HTLX = 'DBCS'
			}else if(this.htType == 'thirdContract' && this.businessType =='Financing'){
				this.HTLX = 'RZCS'
			}else if(this.htType == 'thirdContract' && this.businessType =='SmallLoan'){
				this.HTLX = 'XEDBCS'
			}
			if(this.htType == 'baozContract' && this.businessType =='Guarantee'){
				this.HTLX = 'DBBZDB'
			}else if(this.htType == 'baozContract' && this.businessType =='Financing'){
				this.HTLX = 'RZBZDB'
			}else if(this.htType == 'baozContract' && this.businessType =='SmallLoan'){
				this.HTLX = 'XEDBZDB'
			}
			if(this.htType=='otherFiles'){
				this.HTLX = 'OtherFiles'
			}
			if(this.htType=='loanContract'){
				this.HTLX = 'loanContract'
			}
			if(this.htType=='extenstionContract'){
				this.HTLX = 'XEDZZQ'
			}
			if(this.htType=='DunningLetter'){
				this.HTLX = 'DunningLetter'
			}
			if(this.htType=='flDunningLetter'){//融资租赁合同类型
				this.HTLX = 'flDunningLetter'
			}
		};
		if (typeof(_cfg.thirdRalationId) != "undefined") {
			this.thirdRalationId = _cfg.thirdRalationId;
		};
		if (typeof(_cfg.temptId) != "undefined") {
			this.temptId = _cfg.temptId;
		};
		if (typeof(_cfg.thisPanel) != "undefined") {
			this.thisPanel = _cfg.thisPanel;
		};
		if (typeof(_cfg.isApply) != "undefined") {
			this.isApply = _cfg.isApply;
		};
		if (typeof(_cfg.clauseId) != "undefined") {
			this.clauseId = _cfg.clauseId;
		};

		Ext.applyIf(this, _cfg);
		// 必须先初始化组件
		this.initUIComponents();
		OperateKxcsContractWindow.superclass.constructor.call(this, {
					layout : 'anchor',
					iconCls : this.title ==''?'btn-add':'btn-edit',
					title : this.title ==''?'新增合同信息':'新增/编辑<<font color=red>'+this.title+'</font>>相关信息',
					width : 540,
					height : this.windowHeight,
//					minWidth : 539,
					minHeight : this.windowHeight-1,
					closable : true,
					items : [
						this.panelContract
					],
					maximizable : true,
					border : false,
					modal : true,
					plain : true,
					buttonAlign : 'center'
				});
	},// end of the constructor
	// 初始化组件
	initUIComponents : function() {
		var anchor = '100%';
		
		var htlxid = 0;// 合同类型id
		var htlxname = null;
		var htlxdName = '';
		var htmcdName = '';
		var templateId = 0;// 模板ID
		var isApply = this.isApply;
		var clauseId = this.clauseId;
		var tsColumn1 = {html : '<br/><font color=red >[温情提示：生成合同之前，请先保存项目信息，否则会有可能造成生成合同信息的不正确。]</font>'};
		var tsColumn2 =	{html : '<br/><font class="x-myZW-fieldset-title"> </font>'};
		var htlxColumn = {
						xtype : 'textfield',
						fieldLabel : '合同类型',
						emptyText : "请选择",
						xtype : 'contracttypecombo',
						mode : 'local',
						editable : false,
						itemValue : this.HTLX,
						triggerAction : 'all',
						isDisplayItemName : true,
						hiddenName : "contractCategoryTypeText",
						allowBlank : false,
						listeners : {
							scope : this,
							beforerender :function(){
								var opr_obj=this.getCmpByName('contractCategoryText')
								if(this.temptId != null){
									Ext.Ajax.request({
										url : __ctxPath+'/contract/validateExistDocumentTemplet.do',
										method : 'POST',
										scope : this,
										success : function(response, request) {
											var obj = Ext.util.JSON.decode(response.responseText);
											if(obj.success == true){
												var arrStore = new Ext.data.ArrayStore({
													url : __ctxPath	+ '/contract/getAllByParentIdDocumentTemplet.do',
													fields : ['itemId', 'itemName'],
													baseParams : {
														parentid : obj.data.parentid
													}
											    });
											    opr_obj.clearValue();
											    opr_obj.store = arrStore;
											    arrStore.load();
											    if (opr_obj.view) { // 刷新视图,避免视图值与实际值不相符
												         opr_obj.view.setStore(arrStore);
											    }
												
											}else{
												Ext.ux.Toast.msg('状态', '请先选择合同类型！');
											}
										},
										failure : function(response) {},
										scope : this,
										params : {
											id : this.temptId
										}
									})
									
								}
								
							},
							afterrender : function(combox) {
								combox.clearInvalid();
							},
							select:function(combox, record, index)
							{
							      	var v = record.data.itemId;
							      	
							      	htlxdName = record.data.itemName;
								    var arrStore = new Ext.data.ArrayStore({
										url : __ctxPath	+ '/contract/getAllByParentIdDocumentTemplet.do',
										fields : ['itemId', 'itemName'],
										baseParams : {
											parentid : v
										}
								    });
								    var opr_obj=this.getCmpByName('contractCategoryText')
								    opr_obj.clearValue();
								    opr_obj.store = arrStore;
								    arrStore.load();
								    if (opr_obj.view) { // 刷新视图,避免视图值与实际值不相符
									         opr_obj.view.setStore(arrStore);
								    }
							}
						}
					
						
					};
		var htmcColumn = {
						//id :'contractCategoryText',
						fieldLabel : "合同名称",
						xtype : "combo",
						emptyText : "请选择",
						displayField : 'itemName',
						valueField : 'itemId',
						triggerAction : 'all',
						mode : 'local',
						store : new Ext.data.SimpleStore({
							fields : ['displayText', 'value'],
							data : [['地区', 1], ['LAC', 2], ['CI', 3],
									['被叫用户', 4]]
						}),
						hiddenName : "contractCategoryText",
						allowBlank : false,
						editable : false,
						listeners:{
							scope : this,
							select :function(combox, record, index){
								htmcdName = record.data.itemName;
								templateId = record.data.itemId;
								if(this.temptId == null){
									this.temptId = templateId;
								}
							}
						}
					};
		
		// 创建combo实例
		this.panelContract = new Ext.form.FormPanel({
			buttonAlign : 'center',
			frame : true,
			border : false,
			anchor : anchor,
			labelAlign : 'right',
			labelWidth : 70,
			autoScroll : true,
			// monitorValid : true,
			items : [{
				layout : 'column',
				//xtype : 'fieldset',
				//title : this.title ==''?'增加合同':'增加/编辑合同',
				autoHeight : true,
				collapsible : false,
				anchor : anchor,
				items : [{
					columnWidth : 1,
					layout : 'form',
					id : 'addDocumentColumn',
					defaults : {
						anchor : anchor
					},
					items : [
						{
						xtype :'hidden',
						name :'id'
					}]
				}, {
					columnWidth : 1,
					layout : 'form',
					defaults : {
						anchor : anchor
					},
					items : [{
								xtype : 'button',
								text : this.contractId ==null ||this.contractId == 'undefined'||this.contractId ==''?'生成合同':'重新生成合同',
								scope :this,
								handler : function(){
									var a = htlxdName;
									var b = htmcdName;
									var temId = templateId !=0?templateId:this.temptId;
									this.makeContract(temId,this.businessType,this.piKey,'','',this.categoryId,this.contractId,a,b,this.htType,this.thirdRalationId,this.isApply,this.clauseId)
								}
							}]
				},{
					
					columnWidth : .5,
					layout : 'form',
					defaults : {
						anchor : anchor
					},
					items : [{
								xtype : 'button',
								text : '查看要素',
								scope : this,
								handler : function(){
									this.lookElement('查看合同要素',this.businessType,this.temptId,this.piKey,this.contractId)
								}
							}, {
								xtype : 'button',
								text : '合同下载',
								scope : this,
								handler : function(){
									this.downloadContract(this.contractId)
								}
							},{
								xtype : 'button',
								text : '附件上传',
								scope : this,
								handler : function(){
									this.upLoadContractFiles(this.id,this.piKey,'',this.contractId,'',this.piKey,this.businessType)
								}
							}]
				
				},{
					columnWidth : .5,
					layout : 'form',
					defaults : {
						anchor : anchor
					},
					items : [{
								xtype : 'button',
								text : '合同上传',
								scope : this,
								handler : function(){
									var a = htlxdName;
									var b = htmcdName;
									var temId = templateId !=0?templateId:this.temptId;
									this.uploadContractWin(null,this.businessType,this.piKey,temId,this.categoryId,this.contractId,a,b,this.htType,this.thirdRalationId,this.isApply,this.clauseId)
								}
							}/*, {
								text : '合同在线编辑',
								xtype : 'button',
								scope : this,
								handler : function(){
									this.RunNtkOfficePanel(this.contractId)
								}
								
							}*/,{
								xtype : 'button',
								text : '附件下载',
								scope : this,
								handler : function(){
									this.DownFiles(this.id,this.piKey,'',this.contractId,'')
								}
								
							}]
				
				
				}]
			}]
		});
		this.autoLoadData();
		var thisPanelContract = this.panelContract;
		if(this.businessType =='Financing'){
			thisPanelContract.items.get(0).items.get(0).add(tsColumn1);//加入提示列
		}
		thisPanelContract.items.get(0).items.get(0).add(tsColumn2);//加入空列
		thisPanelContract.items.get(0).items.get(0).add(htlxColumn);//加入合同类型列
		thisPanelContract.items.get(0).items.get(0).add(htmcColumn);//加入合同名称列
		this.panelContract.items.get(0).items.get(1).items.get(0).setWidth('100%');

	},// end of the initUIComponents
	autoLoadData : function(id){
		var panel = this.panelContract;
		this.panelContract.getForm().load({
			deferredRender : false,
			url : __ctxPath + '/contract/seeContractCategoryProcreditContract.do',
			waitMsg : '正在载入数据...',
			scope : this,
			params : {
				categoryId : id!= null?id:this.categoryId
			},
			success : function(form, action) {
				this.getCmpByName('contractCategoryTypeText').setRawValue(action.result.data.contractCategoryTypeText);
				this.getCmpByName('contractCategoryText').setRawValue(action.result.data.contractCategoryText);
				this.contractId = action.result.data.contractId;
				this.categoryId = action.result.data.id;
				this.temptId = action.result.data.temptId;
				panel.items.get(0).items.get(1).items.get(0).setText('重新生成合同');
				panel.items.get(0).items.get(1).items.get(0).setWidth('100%');
			},
			failure : function(form, action) {
			}
		});
		
	},
	//生成合同
	makeContract :function(temId,businessType,piKey,taskId,contractType,categoryId,contractId,a,b,htType,thirdRalationId,isApply,clauseId){
		var cpanel = this.thisPanel;
		var win = this;
		if(temId == null){
			Ext.ux.Toast.msg('状态', '请先选择合同类型和合同名称！');
			return false;
		}else{
			var args;
			if(htType == null){
				args ={
					projId : piKey ,
					businessType : businessType,
					templateId : temId,
					taskId : taskId,
					contractType : contractType,
					categoryId : categoryId,
					contractId : contractId,
					orMake : orMake,
					htlxdName : a,
					htmcdName : b,
					thirdRalationId :thirdRalationId
				}
			}else if(htType =='thirdContract'||htType =='thirdRalationContract'||htType =='ourThirdContract'|| htType=='baozContract' || htType=='otherFiles' || htType=='loanContract' || htType=='extenstionContract'){
				args = {
					projId : piKey ,
					businessType : businessType,
					templateId : temId,
					taskId : taskId,
					contractType : contractType,
					categoryId : categoryId,
					contractId : contractId,
					orMake : orMake,
					htlxdName : a,
					htmcdName : b,
					htType :htType,
					thirdRalationId :thirdRalationId
				}
			}else if(htType =='clauseContract'){
				args = {
					projId : piKey ,
					businessType : businessType,
					templateId : temId,
					taskId : taskId,
					contractType : contractType,
					categoryId : categoryId,
					contractId : contractId,
					orMake : orMake,
					htlxdName : a,
					htmcdName : b,
					htType :htType,
					thirdRalationId :thirdRalationId,
					isApply : isApply,
					clauseId :clauseId
				}
			}else if(htType=='DunningLetter'){
				args ={
					projId : piKey ,
					businessType : businessType,
					templateId : temId,
					taskId : taskId,
					contractType : contractType,
					categoryId : categoryId,
					contractId : contractId,
					orMake : orMake,
					htlxdName : a,
					htmcdName : b,
					thirdRalationId :thirdRalationId
				}
			}else{
				args ={
					projId : piKey ,
					businessType : businessType,
					templateId : temId,
					taskId : taskId,
					contractType : contractType,
					categoryId : categoryId,
					contractId : contractId,
					orMake : orMake,
					htlxdName : a,
					htmcdName : b,
					thirdRalationId :thirdRalationId
				}
			}
			var orMake = contractId == null || contractId  == 'undefined'||contractId == ''? 'make':'reMake';
			if(orMake == 'reMake'){
				Ext.Msg.confirm("提示!", '重新生成将会删除掉您之前上传的合同！是否继续？', function(btn) {
					if (btn == "yes") {
						var pbar = Ext.MessageBox.wait('合同生成中，可能需要较长时间，请耐心等待...','请等待',{
							interval:200,
					    	increment:15
						});
						
						Ext.Ajax.request({
							url : __ctxPath+'/contract/makeContractProduceHelper.do',
							method : 'POST',
							scope : this,
							success : function(response, request) {
								var obj = Ext.util.JSON.decode(response.responseText);
								if(obj.success == true){
									win.autoLoadData(obj.data.id);//重新加载
									pbar.getDialog().close();
									var gridPanel = cpanel;
									if (gridPanel != null) {
										gridPanel.getStore().reload();
									}
									Ext.ux.Toast.msg('状态', '合同生成成功！');
									
								}else{
									Ext.ux.Toast.msg('状态', '合同生成失败，可能未上传合同模板，请重试！');
									pbar.getDialog().close();
								}
							},
							failure : function(response) {
								Ext.ux.Toast.msg('状态', '合同生成失败，请重试！');
								pbar.getDialog().close();
							},
							params : args
						})
					}
				})
			}else if(orMake == 'make'){
			
				var pbar = Ext.MessageBox.wait('合同生成中，可能需要较长时间，请耐心等待...','请等待',{
							interval:200,
					    	increment:15
				});
				
				Ext.Ajax.request({
					url : __ctxPath+'/contract/makeContractProduceHelper.do',
					method : 'POST',
					scope : this,
					success : function(response, request) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if(obj.success == true){
							this.autoLoadData(obj.data.id);//重新加载
							window.open(__ctxPath+"/contract/downloadProduceHelper.do?categoryId="+obj.data.id,'_blank');
							pbar.getDialog().close();
							var gridPanel = cpanel;
							if (gridPanel != null) {
								gridPanel.getStore().reload();
							}
							Ext.ux.Toast.msg('状态', '合同生成成功！');
							
						}else{
							pbar.getDialog().close();
							Ext.ux.Toast.msg('状态', '合同生成失败，可能未上传合同模板，请重试！');
						}
					},
					failure : function(response) {
						Ext.ux.Toast.msg('状态', '合同生成失败，请重试！');
						pbar.getDialog().close();
					},
					params : args
				})
			}
		}
		
	},
	//查看要素
	lookElement :function(title,businessType,tempId,piKey,conId,cType){
		if(tempId == null){
			Ext.ux.Toast.msg('状态','请先选择相应的模板！');
		}else{
			var pbar = Ext.MessageBox.wait('数据读取中','请等待',{
				interval:200,
		    	increment:15
			});
			var myMask = new Ext.LoadMask(Ext.getBody(), {
				msg : "加载数据中······,请稍后······"
			});
			Ext.Ajax.request({
				url : __ctxPath+'/contract/validateExistDocumentTemplet.do',
				method : 'POST',
				success : function(response, request){
					var elementCodeStore = new Ext.data.JsonStore( {
						url : __ctxPath+'/contract/findElementProduceHelper.do',
						root : 'topics',
						fields : [ {name : 'code'},{name : 'value'}, {name : 'depict'}],
						listeners : {
							load : function(){
								elementWin.show();
								pbar.getDialog().close();
							}
						}
					});
					elementCodeStore.load({
						params : {documentId: tempId ,projId : piKey ,businessType : businessType,conId : conId, contractType : cType},
						callback :function(r,o,s){
							if(s == false){
								pbar.getDialog().close();
								Ext.ux.Toast.msg('状态','加载错误，请检查模板是否存在');
								return ;
							}
						}
					});
					var elementCodeModel = new Ext.grid.ColumnModel([
						new Ext.grid.RowNumberer({header:'序'}),
						{
							header : "要素描述",
							width : 200,
							sortable : true,
							dataIndex : 'depict'
						},{
							header : "要素值",
							width : 170,
							sortable : true,
							dataIndex : 'value'
						}
					])
					var elementCodePanel = new Ext.grid.GridPanel( {
						store : elementCodeStore,
						autoWidth : true,
						loadMask : true ,
						stripeRows : true ,
						loadMask : myMask,
						height:440,
						colModel : elementCodeModel,
						autoExpandColumn : 2,
						listeners : {}
					});
					var elementWin = new Ext.Window({
						id : 'elementWin',
						layout : 'fit',
						title : title,
						width : 430,
						height : 400,
						minimizable : true,
						buttonAlign :'center',
						modal : true,
						items :[elementCodePanel],
						tbar : [new Ext.Button({text:'下载合同',tooltip : '下载生成的合同',
							scope : this,
							handler : function(){
								window.open(__ctxPath+"/contract/lookUploadContractProduceHelper.do?conId="+conId,'_blank');
							}}
						)]
					});
				},
				failure : function(response, request) {
					Ext.ux.Toast.msg('状态', '加载错误');
				},
				params: { id : tempId}
			})
		}
		
	},
	//上传合同
	uploadContractWin : function(fun,businessType,projId,temId,categoryId,contractId,a,b,htType,thirdRalationId,isApply,clauseId){
		var cpanel = this.thisPanel;
		var window = this;
		if(temId == null){
			Ext.ux.Toast.msg('提示','操作失败，请先选择合同类型和合同名称！');
		}else{
			new Ext.Window({
				id : 'uploadContractWin',
				title : '上传合同',
				layout : 'fit',
				width : (screen.width-180)*0.6,
				height : 130,
				closable : true,
				resizable : true,
				plain : false,
				bodyBorder : false,
				border : false,
				modal : true,
				constrainHeader : true ,
				bodyStyle:'overflowX:hidden',
				buttonAlign : 'right',
				items:[new Ext.form.FormPanel({
					id : 'uploadContractFrom',
					url : __ctxPath+'/contract/uploadContractProduceHelper.do',
					monitorValid : true,
					labelAlign : 'right',
					buttonAlign : 'center',
					enctype : 'multipart/form-data',
					fileUpload: true, 
					layout : 'column',
					frame : true ,
					items : [{
						columnWidth : 1,
						layout : 'form',
						labelWidth : 70,
						defaults : {anchor : '95%'},
						items :[{
							xtype : 'textfield',
							fieldLabel : '合同文件',
							allowBlank : false,
							blankText : '文件不能为空',
							id : 'fileUpload',
							name: 'fileUpload',
		    				inputType: 'file'
						},{
							xtype : 'hidden',
							name: 'conId',
							value : contractId
						},{
							id :'fileUploadContentType',
							xtype : 'hidden',
							name: 'fileUploadContentType'
						},{
							xtype : 'hidden',
							name: 'templateId',
							value: temId
						},{
							xtype : 'hidden',
							name: 'businessType',
							value: businessType
						},{
							xtype : 'hidden',
							name: 'projId',
							value: projId
						},{
							xtype : 'hidden',
							name: 'categoryId',
							value: categoryId
						},{
							xtype : 'hidden',
							name: 'htlxdName',
							value: a
						},{
							xtype : 'hidden',
							name: 'htmcdName',
							value: b
						},{
							xtype : 'hidden',
							name: 'htType',
							value: htType
						},{
							xtype : 'hidden',
							name: 'thirdRalationId',
							value: thirdRalationId
						},{
							xtype : 'hidden',
							name: 'isApply',
							value: isApply
						},{
							xtype : 'hidden',
							name: 'clauseId',
							value: clauseId
						}]
					}],
					buttons : [{
						text : '上传',
						iconCls : 'uploadIcon',
						formBind : true,
						handler : function() {
							var str=Ext.getCmp("fileUpload").getValue();
						    str=str.substring(str.lastIndexOf("."),str.length)
							Ext.getCmp('uploadContractFrom').getForm().submit({
								method : 'POST',
								waitTitle : '连接',
								waitMsg : '消息发送中...',
								params:{extendName:str},
								success : function(form ,action) {
									Ext.ux.Toast.msg('提示','上传成功！',
									Ext.getCmp('uploadContractWin').destroy(),
										function(btn, text) {
		//									
									});
									window.autoLoadData(action.result.categoryId);//重新加载
									cpanel.getStore().reload();
								},
								failure : function(form, action) {
									Ext.ux.Toast.msg('提示','上传失败！');		
								}
							});
						}
					}]
				})]
			}).show();
		}
		
	},
	//下载合同
	downloadContract : function(conId){
		if(conId == null || conId == 'undefined' || conId == ''){
			Ext.ux.Toast.msg('提示','操作失败，请先生成合同！');
		}else{
			var pbar = Ext.MessageBox.wait('数据读取中','请等待',{
				interval:200,
		    	increment:15
			});
			window.open(__ctxPath+"/contract/lookUploadContractProduceHelper.do?conId="+conId,'_blank');
			pbar.getDialog().close();
		}
		
	},
	//上传附件
	upLoadContractFiles : function(id,piKey,contractName,contractId,mortgageId,piKey,businessType){
		if(contractId == null || contractId == 'undefined' || contractId == ''){
			Ext.ux.Toast.msg('提示','操作失败，请先生成合同！');
		}else{
			var mark = "cs_procredit_contract."+contractId;
			uploadfileContract('上传附件',mark,15,null,null,contractId,null,piKey,businessType);
		}
	},
	//下载附件
	DownFiles : function(id,piKey,contractName,contractId,mortgageId){
		if(contractId == null || contractId == 'undefined' || contractId == ''){
			Ext.ux.Toast.msg('提示','操作失败，请先生成合同！');
		}else{
			var mark = "cs_procredit_contract."+contractId;
			uploadfile('下载附件',mark,0,null,null,null);
		}
	},
	//在线编辑合同
	RunNtkOfficePanel : function(contract_Id){
		if(contract_Id == null || contract_Id == 'undefined' || contract_Id == ''){
			Ext.ux.Toast.msg('提示','操作失败，请先生成合同！');
		}else{
			Ext.Ajax.request({
				url : __ctxPath+'/creditFlow/fileUploads/getFileAttachContractFileForm.do',
				method : 'GET',
				success : function(response, request) {
					var objfile = Ext.util.JSON.decode(response.responseText);
					if(objfile.success == true){
						var file_id =objfile.fileId;
						if(objfile.ext=="pdf"){
							   new PdfTemplateView(file_id,objfile.filePath,null,null)
							}else{
								new OfficeTemplateView(file_id,null,null,null);
							}
					}else{
						Ext.ux.Toast.msg('状态', '合同未生成或上传成功，请先生成或上传合同！');
					}
					
				},
				failure : function(response) {
					Ext.ux.Toast.msg('状态', '合同未上传，请先上传合同');
				},
				params : {
					contractId :contract_Id
				}
			})
		}
		
	}
})
