package com.zhiwei.credit.service.creditFlow.gps;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.model.creditFlow.gps.CsGps;

/**
 * 
 * @author 
 *
 */
public interface CsGpsService extends BaseService<CsGps>{
	public List <CsGps>  getByMortgageId(Long mortgageId);
}


