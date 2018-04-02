package com.zhiwei.credit.service.creditFlow.fund.project;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.core.web.paging.PageBean;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.model.creditFlow.fund.project.BpFundProject;

/**
 * 
 * @author 
 *
 */
public interface BpFundProjectService extends BaseService<BpFundProject>{

	public BpFundProject getByProjectId(Long projectId, Short type);
	

	/**
	 * 通过标id 修改 项目状态
	 * @param bidid
	 * s 状态
	 */
	public void updateState(Long bidid,Short s);

	/**
	 * 通过标id 获取 项目信息
	 * @param bidid
	 * @return
	 */
	public BpFundProject getByBidid(Long bidid);
	
	/**
	 * 项目列表查询
	 * @param pageBean
	 * @param map
	 */
	public void projectList(PageBean<BpFundProject> pageBean,Map<String,String> map);
	
	public Long projectCount(String userIdsStr,Short []projectStatus,HttpServletRequest request);
	//合同管理的列表
	public List<BpFundProject> fundProjectList(String userIdsStr,int start,int limit,HttpServletRequest request);
	public Long fundProjectCount(String userIdsStr,HttpServletRequest request);
	public List<BpFundProject> getProject(Long projectId,String businessType);
	public List<BpFundProject> projectLoanList(String userIdsStr,Short []projectStatus,PagingBean pb,HttpServletRequest request);
	public Long projectLoanCount(String userIdsStr,Short []projectStatus,HttpServletRequest request);
	public List<BpFundProject> bpProjectList(Short []projectStatus,PagingBean pb,HttpServletRequest request);
	public Long bpProjectCount(Short []projectStatus,HttpServletRequest request);
	public List<BpFundProject> overdueProjectList(Short []projectStatus,PagingBean pb,HttpServletRequest request);
	public Long overdueProjectCount(Short []projectStatus,HttpServletRequest request);
	public List<BpFundProject> IndustryProjectList(Short []projectStatus,PagingBean pb,HttpServletRequest request);
	public Long IndustryProjectCount(Short []projectStatus,HttpServletRequest request);
	public List<BpFundProject> personBrowerProjectList(PagingBean pb,HttpServletRequest request);
	public Long personBrowerProjectCount(HttpServletRequest request);
	//线上放款
	public List<BpFundProject> personBrowerOnlineProjectList(PagingBean pb,HttpServletRequest request);
	public Long personBrowerOnlineProjectCount(HttpServletRequest request);
	
	//保证人线下放款
	public List<BpFundProject> personAssureProjectList(PagingBean pb,HttpServletRequest request);
	public Long personAssureProjectCount(HttpServletRequest request);
	//保证人线上放款
	public List<BpFundProject> personAssureOnlineProjectList(PagingBean pb,HttpServletRequest request);
	public Long personAssureOnlineProjectCount(HttpServletRequest request);
	//法人线下放款
	public List<BpFundProject> personLegalProjectList(PagingBean pb,HttpServletRequest request);
	public Long personLegalProjectCount(HttpServletRequest request);
	//法人线上放款
	public List<BpFundProject> personLegalOnlineProjectList(PagingBean pb,HttpServletRequest request);
	public Long personLegalOnlineProjectCount(HttpServletRequest request);
}


