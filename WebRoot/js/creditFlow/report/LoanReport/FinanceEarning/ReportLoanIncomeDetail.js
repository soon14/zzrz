/**
 * @extends Ext.Panel
 * @description 贷款本息实收明细表
 */
ReportLoanIncomeDetail = Ext.extend(Ext.Panel, {
	panel:null,
	url:'',
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ReportLoanIncomeDetail.superclass.constructor.call(this, {
			id : 'ReportLoanIncomeDetail'+this.reportKey,
			title : this.title,
			region : 'center',
			layout : 'anchor',
			iconCls : 'btn-tree-team39',
			items : [searchPanel,this.toolbar,{
				id : this.reportKey,
				autoHeight : false,
				autoWidth : false,
				autoScroll : true,
				border : false,
				xtype : 'panel',
				height : 478
			}],
			listeners : {
				'afterrender' : function(v) {
		 			commomClick(this.panel,this.url,this.reportKey,'');
		 		}
			}
		});
	},
	// 初始化组件
	initUIComponents : function() {
		var firstDate = new Date();
		firstDate.setDate(1);
		var endDate = new Date(firstDate);
		endDate.setMonth(firstDate.getMonth()+1);
		endDate.setDate(0);

		var reportKey=this.reportKey;
		
		var pdfButton = new Ext.Button({
			text : 'pdf',
			iconCls : 'btn-pdf'
		});
		var htmlButton = new Ext.Button({
			text : 'html',
			iconCls : 'btn-ie'
		});
		var xlsButton = new Ext.Button({
			text : 'excel',
			iconCls : 'btn-xls'
		});
		
		this.toolbar = new Ext.Toolbar({
			autoWidth : true,
			layout : 'hbox',
			defaults : {
				anchor : '10%,10%'
			},
			items : [pdfButton,xlsButton, htmlButton]
		});

		searchPanel = new HT.SearchPanel({
			id : 'reportSearchPanel' + reportKey,
			layout : 'column',
			region : 'north',
			height : 20,
			anchor : '100%',
			keys : [{
				key : Ext.EventObject.ENTER,
				fn : this.search,
				scope : this
			}, {
				key : Ext.EventObject.ESC,
				fn : this.reset,
				scope : this
			}],
			layoutConfig: {
               align:'middle'
            },
			items : [{ 
				columnWidth : .2,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				items : [ {
					labelWidth:70,    
					fieldLabel : '起始时间',
					name : 'intentDate_GE',
					xtype :'datefield',
					anchor : '100%',
					format : 'Y-m-d',
					value:firstDate
				}] 
			},{ 
				columnWidth : .18,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				style : 'padding-left:15px;',
				labelWidth:60,
				items : [{
					fieldLabel : '至',
					name : 'intentDate_LE',
					xtype :'datefield',
					anchor : '100%',
					format : 'Y-m-d',
					value:endDate
				}] 
			},{ 
				columnWidth : .2,
				layout : 'form',
				border : false,
				labelAlign : 'right',
				labelWidth:60,    
				items : [ {
					fieldLabel : '借款人',
					name : 'customerName',
					xtype :'textfield',
					anchor : '100%'
				}] 
			},{
				columnWidth : .15,
				layout : 'form',
				border : false,
				labelWidth:70,    
				labelAlign : 'right',
				items : [ {
					name : 'customerManagerName',
					xtype : 'combo',
					fieldLabel : '项目经理',
					submitValue : true,
					triggerClass : 'x-form-search-trigger',
					readOnly : this.isReadOnly,
					editable : false,
					scope : this,
					anchor : '100%',
					onTriggerClick : function() {
						var obj = this;
						if ("" == obj.getValue()) {
							userIds = "";
						}
						new UserDialog({
							userName : obj.getValue(),
							single : true,
							title : "选择客户经理",
							callback : function(uId, uname) {
								obj.setValue(uname);
							}
						}).show();
					}
				}] 
			},{
				columnWidth : .07,
				xtype : 'container',
				layout : 'form',
				defaults : {
					xtype : 'button'
				},
				style : 'padding-left:10px;',
				items : [{
					text : '查询',
					scope : this,
					iconCls : 'btn-search',
					handler:function(){
						commomClick(this.panel,this.url,this.reportKey,'');
					}
				}]
			},{
				columnWidth : .07,
				xtype : 'container',
				layout : 'form',
				defaults : {
					xtype : 'button'
				},
				style : 'padding-left:10px;',
				items : [{
					text : '重置',
					scope : this,
					iconCls : 'reset',
					handler:function(){
						Ext.getCmp('reportSearchPanel'+this.reportKey).getForm().reset();
					}
				}]
			}]
		});
		
		this.panel=Ext.getCmp('reportSearchPanel'+reportKey);
		this.url=__ctxPath + '/system/getLoanIncomeDetail2LoanReport.do';
		
		pdfButton.on('click', function(xlsButton) {
			commomClick(this.panel,this.url,reportKey,'pdf');
		}, this);
			
		htmlButton.on('click', function(htmlButton) {
		 	commomClick(this.panel,this.url,reportKey,'html');
		 }, this);
			
		 xlsButton.on('click', function(xlsButton) {
		 	commomClick(this.panel,this.url,reportKey,'xls');
		 }, this);
	}
});