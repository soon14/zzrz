package com.zhiwei.credit.dao.creditFlow.gps;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.dao.BaseDao;
import com.zhiwei.credit.model.creditFlow.gps.CsGps;

/**
 * 
 * @author 
 *
 */
public interface CsGpsDao extends BaseDao<CsGps>{
	public List <CsGps>  getByMortgageId(Long mortgageId);
}