package com.credit.proj.entity;


/**
 * CsProcreditMortgageHouse entity. @author MyEclipse Persistence Tools
 */

public class ProcreditMortgageHouse implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer mortgageid;
	private String houseaddress;
	private Integer propertyrightid;
	private String certificatenumber;
	private String propertyperson;
	private String mutualofperson;
	private Integer constructiontypeid;
	private Integer constructionframeid;
	private Integer housetypeid;
	private Integer descriptionid;
	private Double buildacreage;
	private java.util.Date buildtime;
	private Double residualyears;
	private Integer registerinfoid;
	private Double mortgagesbalance;
	private Double exchangepriceone;
	private Double exchangepricetow;
	private Double exchangepricethree;
	private Double exchangefinalprice;
	private Double modelrangeprice;
	private String type;
	private String objectType;//类型  典当物品:pawn,抵质押物:mortgage
	// Constructors


	/** default constructor */
	public ProcreditMortgageHouse() {
	}

	/** full constructor */
	public ProcreditMortgageHouse(Integer mortgageid, String houseaddress,
			Integer propertyrightid, String certificatenumber,
			String propertyperson, String mutualofperson,
			Integer constructiontypeid, Integer constructionframeid,
			Integer housetypeid, Integer descriptionid, Double buildacreage,
			java.util.Date buildtime, Double residualyears, Integer registerinfoid,
			Double mortgagesbalance, Double exchangepriceone,
			Double exchangepricetow, Double exchangepricethree,
			Double exchangefinalprice, Double modelrangeprice,String type) {
		this.mortgageid = mortgageid;
		this.houseaddress = houseaddress;
		this.propertyrightid = propertyrightid;
		this.certificatenumber = certificatenumber;
		this.propertyperson = propertyperson;
		this.mutualofperson = mutualofperson;
		this.constructiontypeid = constructiontypeid;
		this.constructionframeid = constructionframeid;
		this.housetypeid = housetypeid;
		this.descriptionid = descriptionid;
		this.buildacreage = buildacreage;
		this.buildtime = buildtime;
		this.residualyears = residualyears;
		this.registerinfoid = registerinfoid;
		this.mortgagesbalance = mortgagesbalance;
		this.exchangepriceone = exchangepriceone;
		this.exchangepricetow = exchangepricetow;
		this.exchangepricethree = exchangepricethree;
		this.exchangefinalprice = exchangefinalprice;
		this.modelrangeprice = modelrangeprice;
		this.type=type;
	}
	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMortgageid() {
		return this.mortgageid;
	}

	public void setMortgageid(Integer mortgageid) {
		this.mortgageid = mortgageid;
	}

	public String getHouseaddress() {
		return this.houseaddress;
	}

	public void setHouseaddress(String houseaddress) {
		this.houseaddress = houseaddress;
	}

	public Integer getPropertyrightid() {
		return this.propertyrightid;
	}

	public void setPropertyrightid(Integer propertyrightid) {
		this.propertyrightid = propertyrightid;
	}

	public String getCertificatenumber() {
		return this.certificatenumber;
	}

	public void setCertificatenumber(String certificatenumber) {
		this.certificatenumber = certificatenumber;
	}

	public String getPropertyperson() {
		return this.propertyperson;
	}

	public void setPropertyperson(String propertyperson) {
		this.propertyperson = propertyperson;
	}

	public String getMutualofperson() {
		return this.mutualofperson;
	}

	public void setMutualofperson(String mutualofperson) {
		this.mutualofperson = mutualofperson;
	}

	public Integer getConstructiontypeid() {
		return this.constructiontypeid;
	}

	public void setConstructiontypeid(Integer constructiontypeid) {
		this.constructiontypeid = constructiontypeid;
	}

	public Integer getConstructionframeid() {
		return this.constructionframeid;
	}

	public void setConstructionframeid(Integer constructionframeid) {
		this.constructionframeid = constructionframeid;
	}

	public Integer getHousetypeid() {
		return this.housetypeid;
	}

	public void setHousetypeid(Integer housetypeid) {
		this.housetypeid = housetypeid;
	}

	public Integer getDescriptionid() {
		return this.descriptionid;
	}

	public void setDescriptionid(Integer descriptionid) {
		this.descriptionid = descriptionid;
	}

	public Double getBuildacreage() {
		return this.buildacreage;
	}

	public void setBuildacreage(Double buildacreage) {
		this.buildacreage = buildacreage;
	}



	public java.util.Date getBuildtime() {
		return buildtime;
	}

	public void setBuildtime(java.util.Date buildtime) {
		this.buildtime = buildtime;
	}

	public Double getResidualyears() {
		return this.residualyears;
	}

	public void setResidualyears(Double residualyears) {
		this.residualyears = residualyears;
	}

	public Integer getRegisterinfoid() {
		return this.registerinfoid;
	}

	public void setRegisterinfoid(Integer registerinfoid) {
		this.registerinfoid = registerinfoid;
	}

	public Double getMortgagesbalance() {
		return this.mortgagesbalance;
	}

	public void setMortgagesbalance(Double mortgagesbalance) {
		this.mortgagesbalance = mortgagesbalance;
	}

	public Double getExchangepriceone() {
		return this.exchangepriceone;
	}

	public void setExchangepriceone(Double exchangepriceone) {
		this.exchangepriceone = exchangepriceone;
	}

	public Double getExchangepricetow() {
		return this.exchangepricetow;
	}

	public void setExchangepricetow(Double exchangepricetow) {
		this.exchangepricetow = exchangepricetow;
	}

	public Double getExchangepricethree() {
		return this.exchangepricethree;
	}

	public void setExchangepricethree(Double exchangepricethree) {
		this.exchangepricethree = exchangepricethree;
	}

	public Double getExchangefinalprice() {
		return this.exchangefinalprice;
	}

	public void setExchangefinalprice(Double exchangefinalprice) {
		this.exchangefinalprice = exchangefinalprice;
	}

	public Double getModelrangeprice() {
		return this.modelrangeprice;
	}

	public void setModelrangeprice(Double modelrangeprice) {
		this.modelrangeprice = modelrangeprice;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}