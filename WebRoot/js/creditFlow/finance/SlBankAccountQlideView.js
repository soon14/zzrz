/**
 * @author
 * @createtime
 * @class SlFundIntentForm
 * @extends Ext.Window
 * @description SlFundIntent表单
 * @company 智维软件
 */
var accountquerty = "";
SlBankAccountQlideView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		SlBankAccountQlideView.superclass.constructor.call(this, {
					id : 'SlBankAccountQlideView',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel],
					modal : true,
					height : 589,
					width : screen.width * 0.95,
					// border : false,
					autoScroll : true,
					maximizable : true,
					iconCls : 'btn-team2',
					title : '银行账户明细'

				});
	},// end of the constructor
	// 初始化组件

	initUIComponents : function() {
		var bankName = "";
		var name = "";
		var account = "";
		this.topbar = new Ext.Toolbar({
					items : [{}]

				});
		var topbar1 = this.topbar;
		var isShow = false;
		if (RoleType == "control") {
			isShow = true;
		}
		this.searchPanel = new HT.SearchPanel({
			layout : 'column',
			border : false,
			region : 'north',
			height : 40,
			anchor : '70%',
			keys : [{
						key : Ext.EventObject.ENTER,
						fn : this.search,
						scope : this
					}, {
						key : Ext.EventObject.ESC,
						fn : this.reset,
						scope : this
					}],
			layoutConfig : {
				align : 'middle'
			},
			items : [{
				columnWidth : 0.25,
				layout : 'form',
				border : false,
				labelWidth : 60,
				labelAlign : 'right',

				items : [{
					fieldLabel : '我方账号',
					// submitValue:false,
					name : 'Q_myAccount_S_EQ',
					id : 'Q_dialAccounts_S_EQqlideview',
					flex : 1,
					triggerAction : 'all',
					editable : false,
					xtype : 'trigger',
					triggerClass : 'x-form-search-trigger',
					scope : this,
					onTriggerClick : function() {
						var selectAccountkqlideview = function(account1,
								bankName1, name1) {
							Ext.getCmp('Q_dialAccounts_S_EQqlideview')
									.setValue(account1);
							bankName = bankName1;
							account = account1;
							name = name1;
							accountquerty = account1;
							topbar1.items
									.last()
									.setText(
											'【<font style="line-height:20px" color=red>我方开户银行：</font>'
													+ bankName1
													+ '<font color=red>&nbsp;&nbsp&nbsp;&nbsp我方账户名称：</font>'
													+ name1
													+ '&nbsp;&nbsp&nbsp;&nbsp<font color=red>我方账号：</font>'
													+ account1 + '】', false);
						}
						selectAccountlForm1(selectAccountkqlideview);
					},
					anchor : '98%'
				}]

			}, {
				columnWidth : 0.18,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [{
							name : 'Q_factDate_D_GE',
							labelSeparator : '',
							xtype : 'datefield',
							format : 'Y-m-d',
							fieldLabel : '起始日期：',
							anchor : '99%'
						}]

			}, {
				columnWidth : 0.18,
				layout : 'form',
				border : false,
				labelWidth : 80,
				labelAlign : 'right',
				items : [{
							name : 'Q_factDate_D_LE',
							labelSeparator : '',
							xtype : 'datefield',
							format : 'Y-m-d',
							fieldLabel : '截止日期',
							anchor : '88%'
						}]

			}, {
				columnWidth : .06,
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
							handler : this.search
						}]
			}, {
				columnWidth : .08,
				xtype : 'container',
				layout : 'form',
				defaults : {
					xtype : 'button'
				},
				style : 'padding-left:10px;',
				items : [{
							text : '重置',
							scope : this,
							iconCls : 'btn-reset',
							handler : this.reset
						}]
			}

			]

		});// end of searchPanel
		var summary = new Ext.ux.grid.GridSummary();
		function totalMoney(v, params, data) {
			return '总计(元)';
		}

		var params1 = {
			myaccount : ""
		};
		this.gridPanel = new HT.GridPanel({
			rowActions : false,
			viewConfig : {
				forceFit : false
			},
			// border : false,
			region : 'center',
			showPaging : false,
			plugins : [summary],
			bodyStyle : "width : 100%",
			width : 1214,
			id : 'SlFundQlideGridcheck',
			tbar : this.topbar,
			url : __ctxPath + "/creditFlow/finance/listbyaccountSlFundQlide.do",
			baseParams : params1,
			fields : [{
						name : 'fundQlideId',
						type : 'int'
					}, 'myAccount', 'dialMoney', 'afterMoney', 'notMoney',
					'factDate', 'opAccount', 'fundType', 'currency',
					'transactionType', 'bankName', 'openName', 'incomeMoney',
					'payMoney', 'opOpenName', 'opBankName', 'isProject',
					'finalMoney', 'bankTransactionTypeName',
					'frozenfinalMoney', 'surplusfinalMoney', 'orgName'],
			columns : [{
						header : "所属分公司",
						sortable : true,
						width : 120,
						hidden : RoleType == "control" ? false : true,
						dataIndex : 'orgName'
					}, {
						header : '币种',
						dataIndex : 'currency',
						width : 62,
						summaryRenderer : totalMoney
					}, {
						header : '到账时间',
						dataIndex : 'factDate',
						sortable : true
					}

					, {
						header : '收入金额',
						dataIndex : 'incomeMoney',
						align : 'right',
						summaryType : 'sum',
						renderer : function(v) {
							if (v != null) {
								return Ext.util.Format.number(v,
										',000,000,000.00')
										+ "元"
							} else {
								return v
							}

						}
					}, {
						header : '支出金额',
						dataIndex : 'payMoney',
						summaryType : 'sum',
						align : 'right',
						renderer : function(v) {
							if (v != null) {
								return Ext.util.Format.number(v,
										',000,000,000.00')
										+ "元"
								return v + "元"
							} else {
								return v
							}

						}
					}

					// ,{
					// header : '可用期末余额',
					// dataIndex : 'surplusfinalMoney',
					// align : 'right',
					// width :120,
					// renderer:function(v){
					// if(v !=null){
					// return Ext.util.Format.number(v,',000,000,000.00')+"元"
					// return v+"元"
					// }else{
					// return v}
					//																			
					// }
					// },{
					// header : '冻结期末余额',
					// dataIndex : 'frozenfinalMoney',
					// align : 'right',
					// width :120,
					// renderer:function(v){
					// if(v !=null){
					// return Ext.util.Format.number(v,',000,000,000.00')+"元"
					// return v+"元"
					// }else{
					// return v}
					//																			
					// }
					// }
					, {
						header : '已对账金额',
						align : 'right',
						dataIndex : 'afterMoney',
						summaryType : 'sum',
						renderer : function(v) {
							if (v != null) {
								return Ext.util.Format.number(v,
										',000,000,000.00')
										+ "元"
							} else {
								return v
							}

						}

					}

					, {
						header : '未对账金额',
						align : 'right',
						dataIndex : 'notMoney',
						summaryType : 'sum',
						renderer : function(v) {
							if (v != null) {
								return Ext.util.Format.number(v,
										',000,000,000.00')
										+ "元"
							} else {
								return v
							}

						}

					}, {
						header : '期末总余额',
						dataIndex : 'finalMoney',
						align : 'right',
						width : 120,
						renderer : function(v) {
							if (v != null) {
								return Ext.util.Format.number(v,
										',000,000,000.00')
										+ "元"
								return v + "元"
							} else {
								return v
							}

						}
					}, {
						header : "对方开户银行",
						dataIndex : "opBankName"

					}, {
						header : "对方账户名称",
						dataIndex : "opOpenName"

					}, {
						header : "对方账号",
						dataIndex : "opAccount"

					}, {
						header : "银行交易类型",
						dataIndex : "bankTransactionTypeName"

					}, {
						header : "是否项目相关",
						dataIndex : "isProject"

					}, {
						header : '交易摘要',
						dataIndex : 'transactionType'
					}]
				// end of columns
		});

		// this.gridPanel.addListener('rowdblclick',this.rowClick);

	},

	reset : function() {
		this.searchPanel.getForm().reset();
		//充值后查询
		
		var gridstore = this.gridPanel.getStore();
		var o = gridstore.params;
		var factdatege = this.getCmpByName("Q_factDate_D_GE").getValue();
		var factdatele = this.getCmpByName("Q_factDate_D_LE").getValue();
		gridstore.on('beforeload', function(gridstore, o) {
					var new_params = {
						myaccount : accountquerty,
						Q_factDate_D_GE : factdatege,
						Q_factDate_D_LE : factdatele
					};
					Ext.apply(o.params, new_params);
				});
		this.gridPanel.getStore().reload();
	},
	// 按条件搜索
	search : function() {
		var gridstore = this.gridPanel.getStore();
		var o = gridstore.params;
		var factdatege = this.getCmpByName("Q_factDate_D_GE").getValue();
		var factdatele = this.getCmpByName("Q_factDate_D_LE").getValue();
		gridstore.on('beforeload', function(gridstore, o) {
					var new_params = {
						myaccount : accountquerty,
						Q_factDate_D_GE : factdatege,
						Q_factDate_D_LE : factdatele
					};
					Ext.apply(o.params, new_params);
				});
		this.gridPanel.getStore().reload();
	}

})