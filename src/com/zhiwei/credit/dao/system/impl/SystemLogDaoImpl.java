package com.zhiwei.credit.dao.system.impl;
/*
 *  北京互融时代软件有限公司    -- http://www.hurongtime.com
 *  Copyright (C) 2008-2011 JinZhi WanWei Software Limited company.
*/
import com.zhiwei.core.dao.impl.BaseDaoImpl;
import com.zhiwei.credit.dao.system.SystemLogDao;
import com.zhiwei.credit.model.system.SystemLog;

public class SystemLogDaoImpl extends BaseDaoImpl<SystemLog> implements SystemLogDao{

	public SystemLogDaoImpl() {
		super(SystemLog.class);
	}

}