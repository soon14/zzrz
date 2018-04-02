package com.zhiwei.credit.dao.creditFlow.leaseFinance.leaseobject;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.dao.BaseDao;
import com.zhiwei.credit.model.creditFlow.leaseFinance.leaseobject.FlLeaseFinanceInsuranceInfo;

/**
 * 
 * @author 
 *
 */
public interface FlLeaseFinanceInsuranceInfoDao extends BaseDao<FlLeaseFinanceInsuranceInfo>{
	public List<FlLeaseFinanceInsuranceInfo> getListByLeaseObjectId(Long leaseObjectId);
	public void deleteByLeaseObjectId(Long leaseObjectId);
}