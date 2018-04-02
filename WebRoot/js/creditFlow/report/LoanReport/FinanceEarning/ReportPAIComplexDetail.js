/**
 * @extends Ext.Panel
 * @description 贷款本息实收明细表
 */
ReportPAIComplexDetail = Ext.extend(Ext.Panel, {
	panel:null,
	url:'',
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		ReportPAIComplexDetail.superclass.constructor.call(this, {
			id : 'ReportPAIComplexDetail'+this.reportKey,
			title : this.title,
			layout : 'border',
			iconCls:"btn-tree-team39",
			items : [this.searchPanel,{
				region : 'center',
				id : 'tbar'+this.reportKey,
				border : false,
				items:this.toolbar,
				xtype : 'panel',
				html : '<div id="'+this.reportKey+'"></div>'
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

		this.searchPanel = new HT.SearchPanel({
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
					fieldLabel : this.reportKey=='PAIComplexDetail'?'年份':'日期',
					name : 'factDate',
					xtype :'datefield',
					anchor : '100%',
					format : this.reportKey=='PAIComplexDetail'?'Y':(this.reportKey=='DKFFHZBMonth' || this.reportKey=='DKFFHZBQuarter' || this.reportKey=='FXFLHZBMonth' || this.reportKey=='FXFLHZBQuarter')?'Y-m-d':'Y-m',
					value:new Date()
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
		this.url=__ctxPath + '/system/financeComplex2LoanReport.do';
		
		pdfButton.on('click', function(xlsButton) {
			commomClick(this.panel,this.url,this.reportKey,'pdf');
		}, this);
			
		htmlButton.on('click', function(htmlButton) {
			commomClick(this.panel,this.url,this.reportKey,'html');
		}, this);
			
		 xlsButton.on('click', function(xlsButton) {
		 	commomClick(this.panel,this.url,this.reportKey,'xls');
		 }, this);
	}
});