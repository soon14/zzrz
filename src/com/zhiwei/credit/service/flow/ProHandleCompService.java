package com.zhiwei.credit.service.flow;
/*
 *  北京互融时代软件有限公司    -- http://www.hurongtime.com
 *  Copyright (C)  JinZhi WanWei Software Limited Company.
*/
import java.util.List;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.credit.model.flow.ProHandleComp;

public interface ProHandleCompService extends BaseService<ProHandleComp>{
	/**
	 * 取得某个流程的某个节点的各事件及监听对应的列表
	 * @param deployId
	 * @param activityName
	 * @return
	 */
	public List<ProHandleComp> getByDeployIdActivityName(String deployId,String activityName);
	/**
	 * 
	 * @param deployId
	 * @param activityName
	 * @param handleType
	 * @return
	 */
	public List<ProHandleComp> getByDeployIdActivityNameHandleType(String deployId,String activityName,Short handleType);
	
	/**
	 * 
	 * @param deployId
	 * @param activityName
	 * @param eventName
	 * @return
	 */
	public ProHandleComp getProHandleComp(String deployId,String activityName,String eventName);
	
	/**
	 * 拷贝原流程的配置至新流程中
	 * @param oldDeployId
	 * @param newDeployId
	 */
	public void copyNewConfig(String oldDeployId,String newDeployId);
}


