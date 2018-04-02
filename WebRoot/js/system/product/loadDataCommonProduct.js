function fillProductData(mainObj, alarm_fields, idDefinition,productId) {
	var isInterestByOneTimeObj = mainObj.getCmpByName('isInterestByOneTimeCheck');
	var isInterestByOneTime = alarm_fields.data.isInterestByOneTime;
	if(idDefinition==null||idDefinition==""){
		idDefinition="_productDefination_"
	}
	if (isInterestByOneTime == 1) {
		if (null != isInterestByOneTimeObj){
			isInterestByOneTimeObj.setValue(true);
		}
	} else {
		if (null != isInterestByOneTimeObj){
			isInterestByOneTimeObj.setValue(false);
		}
	}
	var isPreposePayConsultingCheckObj = mainObj.getCmpByName('isPreposePayAccrualCheck');
	var isPreposePayConsultingCheck = alarm_fields.data.isPreposePayAccrual;
	if (isPreposePayConsultingCheck == 1) {
		if (null != isPreposePayConsultingCheckObj)
		{
			isPreposePayConsultingCheckObj.setValue(true);
		}
	} else {
		if (null != isPreposePayConsultingCheckObj){
			isPreposePayConsultingCheckObj.setValue(false);
		}
	}
	var accrualtype = alarm_fields.data.accrualtype;
	if (accrualtype == "sameprincipal") {
		Ext.getCmp("jixifs1"+idDefinition+productId).setValue(true);
		Ext.getCmp("jixifs3"+idDefinition+productId).setValue(false);

		Ext.getCmp("jixizq1"+idDefinition+productId).setDisabled(true);
		Ext.getCmp("jixizq2"+idDefinition+productId).setDisabled(true);
		Ext.getCmp("jixizq3"+idDefinition+productId).setDisabled(true);
		Ext.getCmp("jixizq4"+idDefinition+productId).setDisabled(true);
	} else if (accrualtype == "sameprincipalandInterest") {
		Ext.getCmp("jixifs2"+idDefinition+productId).setValue(true);
		Ext.getCmp("jixifs3"+idDefinition+productId).setValue(false);

		Ext.getCmp("jixizq1"+idDefinition+productId).setDisabled(true);
		Ext.getCmp("jixizq2"+idDefinition+productId).setDisabled(true);
		Ext.getCmp("jixizq3"+idDefinition+productId).setDisabled(true);
		Ext.getCmp("jixizq4"+idDefinition+productId).setDisabled(true);
		
	}else if (accrualtype == "sameprincipalsameInterest") {
		if(Ext.getCmp("jixifs5"+idDefinition+productId)!=null){
			Ext.getCmp("jixifs5"+idDefinition+productId).setValue(true);
		}
		if(Ext.getCmp("jixifs3"+idDefinition+productId)!=null){
			Ext.getCmp("jixifs3"+idDefinition+productId).setValue(false);
		}
	} else if (accrualtype == "singleInterest") {
		Ext.getCmp("jixifs3"+idDefinition+productId).setValue(true);

	} else if (accrualtype == "ontTimeAccrual") {
		Ext.getCmp("jixifs4"+idDefinition+productId).setValue(true);
		Ext.getCmp("jixifs3"+idDefinition+productId).setValue(false);

		Ext.getCmp("jixizq1"+idDefinition+productId).setDisabled(true);
		Ext.getCmp("jixizq2"+idDefinition+productId).setDisabled(true);
		Ext.getCmp("jixizq3"+idDefinition+productId).setDisabled(true);
		Ext.getCmp("jixizq4"+idDefinition+productId).setDisabled(true);
	} else if (accrualtype == "otherMothod") {
		Ext.getCmp("jixifs6"+idDefinition+productId).setValue(true);
		Ext.getCmp("jixifs3"+idDefinition+productId).setValue(false);
	}
	
	var payaccrualType = alarm_fields.data.payaccrualType;
	if(mainObj.getCmpByName('bpProductParameter.dayOfEveryPeriod')){
		mainObj.getCmpByName('bpProductParameter.dayOfEveryPeriod').setDisabled(true);// 默认为不可用
	}
	if (payaccrualType == "dayPay") {
		Ext.getCmp("jixizq1"+idDefinition+productId).setValue(true);

	} else if (payaccrualType == "monthPay") {
		Ext.getCmp("jixizq2"+idDefinition+productId).setValue(true);
	} else if (payaccrualType == "seasonPay") {
		Ext.getCmp("jixizq3"+idDefinition+productId).setValue(true);
	} else if (payaccrualType == "yearPay") {
		Ext.getCmp("jixizq4"+idDefinition+productId).setValue(true);
	} else if (payaccrualType == "owerPay") {
		Ext.getCmp("jixizq6"+idDefinition+productId).setValue(true);
	}
	
	var isStartDatePay = alarm_fields.data.isStartDatePay;
	if (isStartDatePay == "1") {
		Ext.getCmp("meiqihkrq1"+idDefinition+productId).setValue(true);
		Ext.getCmp("meiqihkrq2"+idDefinition+productId).setValue(false);
		Ext.getCmp("meiqihkrq1"+idDefinition+productId).setDisabled(false);
		Ext.getCmp("meiqihkrq1"+idDefinition+productId).setDisabled(true);
		mainObj.getCmpByName('bpProductParameter.isStartDatePay').setValue("1");
	} else {
		Ext.getCmp("meiqihkrq1"+idDefinition+productId).setDisabled(true);
		Ext.getCmp("meiqihkrq2"+idDefinition+productId).setValue(true);
		Ext.getCmp("meiqihkrq1"+idDefinition+productId).setDisabled(false);
		if(mainObj.getCmpByName('bpProductParameter.payintentPerioDate')!=null){
			mainObj.getCmpByName('bpProductParameter.payintentPerioDate').setDisabled(true);
		}
		if(mainObj.getCmpByName('bpProductParameter.isStartDatePay')!=null){
			mainObj.getCmpByName('bpProductParameter.isStartDatePay').setValue("2");
		}
	}
	var isStartDatePay = alarm_fields.data.overdueReceiveWay;
	if (isStartDatePay == "1") {
		Ext.getCmp("yqsqfs2"+idDefinition+productId).setValue(true);
		Ext.getCmp("yqsqfs1"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.overdueReceiveWay').setValue("1");
	} else {
		Ext.getCmp("yqsqfs1"+idDefinition+productId).setValue(true);
		Ext.getCmp("yqsqfs2"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.overdueReceiveWay').setValue("0");
	}
	var isStartDatePay = alarm_fields.data.penaltyReceiveWay;
	if (isStartDatePay == "1") {
		Ext.getCmp("fxsqfs2"+idDefinition+productId).setValue(true);
		Ext.getCmp("fxsqfs1"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.penaltyReceiveWay').setValue("1");
	} else {
		Ext.getCmp("fxsqfs1"+idDefinition+productId).setValue(true);
		Ext.getCmp("fxsqfs2"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.penaltyReceiveWay').setValue("0");
	}
	var isStartDatePay = alarm_fields.data.depositsReleaseWay;
	if (isStartDatePay == "1") {
		Ext.getCmp("release2"+idDefinition+productId).setValue(true);
		Ext.getCmp("release1"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.depositsReleaseWay').setValue("1");
	} else {
		Ext.getCmp("release1"+idDefinition+productId).setValue(true);
		Ext.getCmp("release2"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.depositsReleaseWay').setValue("0");
	}
	//提前还款违约金收取方式
	var prepayMoney = alarm_fields.data.prepayMoney;
	if (prepayMoney == "1") {
		Ext.getCmp("tqhkje2"+idDefinition+productId).setValue(true);
		Ext.getCmp("tqhkje1"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.prepayMoney').setValue("1");
	} else {
		Ext.getCmp("tqhkje1"+idDefinition+productId).setValue(true);
		Ext.getCmp("tqhkje2"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.prepayMoney').setValue("0");
	}
	//保证金释放方式
	var depositsReleaseWay = alarm_fields.data.depositsReleaseWay;
	if (depositsReleaseWay == "1") {
		Ext.getCmp("release2"+idDefinition+productId).setValue(true);
		Ext.getCmp("release1"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.depositsReleaseWay').setValue("1");
	} else {
		Ext.getCmp("release1"+idDefinition+productId).setValue(true);
		Ext.getCmp("release2"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.depositsReleaseWay').setValue("0");
	}
	//授信释放方式
	var creditfreedType = alarm_fields.data.creditfreedType;
	if (creditfreedType == "1") {
		Ext.getCmp("credit2"+idDefinition+productId).setValue(true);
		Ext.getCmp("credit1"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.creditfreedType').setValue("1");
	} else {
		Ext.getCmp("credit1"+idDefinition+productId).setValue(true);
		Ext.getCmp("credit2"+idDefinition+productId).setValue(false);
		mainObj.getCmpByName('bpProductParameter.creditfreedType').setValue("0");
	}
	
}