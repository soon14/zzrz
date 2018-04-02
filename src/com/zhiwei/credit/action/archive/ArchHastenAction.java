package com.zhiwei.credit.action.archive;
/*
 *  北京互融时代软件有限公司    -- http://www.hurongtime.com
 *  Copyright (C) 2008-2011 JinZhi WanWei Software Limited company.
*/
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.model.archive.ArchHasten;
import com.zhiwei.credit.service.archive.ArchHastenService;
/**
 * 
 * @author 
 *
 */
public class ArchHastenAction extends BaseAction{
	@Resource
	private ArchHastenService archHastenService;
	private ArchHasten archHasten;
	
	private Long record;

	public Long getRecord() {
		return record;
	}

	public void setRecord(Long record) {
		this.record = record;
	}

	public ArchHasten getArchHasten() {
		return archHasten;
	}

	public void setArchHasten(ArchHasten archHasten) {
		this.archHasten = archHasten;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ArchHasten> list= archHastenService.getAll(filter);
		
		Type type=new TypeToken<List<ArchHasten>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				archHastenService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		ArchHasten archHasten=archHastenService.get(record);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(archHasten));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		archHastenService.save(archHasten);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
