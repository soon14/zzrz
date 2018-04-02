package com.zhiwei.credit.dao.creditFlow.financingAgency.impl;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;
import java.util.Map;

import org.hibernate.Session;

import com.hurong.credit.model.creditFlow.financingAgency.business.PlBusinessDirProKeep;
import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.creditFlow.financingAgency.PlBidInfoDao;
import com.zhiwei.credit.model.creditFlow.financingAgency.PlBidInfo;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class PlBidInfoDaoImpl extends BaseDaoImpl<PlBidInfo> implements PlBidInfoDao{

	public PlBidInfoDaoImpl() {
		super(PlBidInfo.class);
	}

	@Override
	public PlBidInfo getByOrderNo(String orderNum) {
		String hql="from PlBidInfo as bidInfo where bidInfo.orderNo =?";
		Object[] params = {orderNum};
		return (PlBidInfo)findUnique(hql, params);
	}

	@Override
	public List<PlBidInfo> queryUserName(Map<String, String> map) {
		String userName=map.get("userName");
		Short state=Short.valueOf(map.get("state"));
		String hql="from PlBidInfo as bidInfo where bidInfo.userName=? and bidInfo.state=? and bidInfo.isToObligatoryRightChildren is null";
		return findByHql(hql, new Object[]{userName,state});
	}

	@Override
	public List<PlBidInfo> getInfo(Map<String, String> map) {
		String bidId=map.get("bidId");
		String state=map.get("state");
		Session session=this.getSession();
		String sql="select * from pl_bid_info as bidInfo where bidInfo.bidId=? and bidInfo.state in (?)";
		List<PlBidInfo> listInfo = session.createSQLQuery(sql).addEntity(PlBidInfo.class).setParameter(0, bidId).setParameter(1, state).list();
		releaseSession(session);
		return listInfo;
	}

}