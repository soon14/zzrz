package com.zhiwei.credit.service.hrm;
/*
 *  北京互融时代软件有限公司    -- http://www.hurongtime.com
 *  Copyright (C) 2008-2011 JinZhi WanWei Software Limited company.
*/
import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.model.hrm.EmpProfile;

public interface EmpProfileService extends BaseService<EmpProfile>{

	public boolean checkProfileNo(String profileNo);
	
}


