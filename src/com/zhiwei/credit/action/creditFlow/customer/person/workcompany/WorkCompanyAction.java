package com.zhiwei.credit.action.creditFlow.customer.person.workcompany;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.zhiwei.core.command.QueryFilter;
import com.zhiwei.core.util.BeanUtil;
import com.zhiwei.core.web.action.BaseAction;
import com.zhiwei.credit.core.commons.CreditBaseDao;
import com.zhiwei.credit.core.creditUtils.JsonUtil;
import com.zhiwei.credit.model.creditFlow.customer.person.workcompany.WorkCompany;
import com.zhiwei.credit.service.creditFlow.customer.person.workcompany.WorkCompanyService;
/**
 * 
 * @author 
 *
 */
public class WorkCompanyAction extends BaseAction{
	@Resource
	private WorkCompanyService workCompanyService;
	@Resource
	private CreditBaseDao creditBaseDao;
	private WorkCompany workCompany;
	
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public WorkCompany getWorkCompany() {
		return workCompany;
	}

	public void setWorkCompany(WorkCompany workCompany) {
		this.workCompany = workCompany;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<WorkCompany> list= workCompanyService.getAll(filter);
		
		Type type=new TypeToken<List<WorkCompany>>(){}.getType();
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
				workCompanyService.remove(new Long(id));
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
		WorkCompany workCompany=workCompanyService.get(id);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(workCompany));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(workCompany.getId()==null){
			workCompanyService.save(workCompany);
		}else{
			WorkCompany orgWorkCompany=workCompanyService.get(Long.valueOf(workCompany.getId()));
			try{
				BeanUtil.copyNotNullProperties(orgWorkCompany, workCompany);
				workCompanyService.save(orgWorkCompany);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	public String getWorkCompanyInfo(){
		String personId=this.getRequest().getParameter("personId");
		workCompany = workCompanyService.getWorkCompanyByPersonId(Integer.valueOf(personId));
		JsonUtil.jsonFromObject(workCompany, true);
		return SUCCESS;
	}
	public String saveOrUpdate(){
		try {
			creditBaseDao.saveOrUpdateDatas(workCompany);
			JsonUtil.responseJsonSuccess();
		} catch (Exception e) {
			e.printStackTrace();
			//logger.error("保存个人工作单位出错！:"+e.getMessage());
		}
		return SUCCESS;
	}
}
