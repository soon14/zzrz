package com.zhiwei.credit.dao.creditFlow.leaseFinance.leaseobject.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.creditFlow.leaseFinance.leaseobject.FlLeaseObjectManageOwnerDao;
import com.zhiwei.credit.model.creditFlow.leaseFinance.leaseobject.FlLeaseObjectManageOwner;
import com.zhiwei.credit.model.creditFlow.leaseFinance.leaseobject.FlLeaseObjectManagePlace;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class FlLeaseObjectManageOwnerDaoImpl extends BaseDaoImpl<FlLeaseObjectManageOwner> implements FlLeaseObjectManageOwnerDao{

	public FlLeaseObjectManageOwnerDaoImpl() {
		super(FlLeaseObjectManageOwner.class);
	}
	@Override
	public List<FlLeaseObjectManageOwner> getListByLeaseObjectId(Long leaseObjectId) {
		String hql="from FlLeaseObjectManageOwner as p where p.leaseObjectId=?"; 
		return getSession().createQuery(hql).setParameter(0, leaseObjectId).list();
	}
}