//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.12.14 at 01:17:56 ���� CST 
//


package com.zhiwei.credit.service.thirdPay.fuiou.model.req.refundresend;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ReFundResendReqType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ReFundResendReqType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="ver" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="merdt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="orderno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="srcmerdt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="srcorderno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="bankno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="cityno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="branchnm" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="accntno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="accntnm" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="entseq" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="memo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="mobile" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ReFundResendReqType", propOrder = {
    "ver",
    "merdt",
    "orderno",
    "srcmerdt",
    "srcorderno",
    "bankno",
    "cityno",
    "branchnm",
    "accntno",
    "accntnm",
    "entseq",
    "memo",
    "mobile"
})
public class ReFundResendReqType {

    protected String ver;
    protected String merdt;
    protected String orderno;
    protected String srcmerdt;
    protected String srcorderno;
    protected String bankno;
    protected String cityno;
    protected String branchnm;
    protected String accntno;
    protected String accntnm;
    protected String entseq;
    protected String memo;
    protected String mobile;

    /**
     * Gets the value of the ver property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVer() {
        return ver;
    }

    /**
     * Sets the value of the ver property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVer(String value) {
        this.ver = value;
    }

    /**
     * Gets the value of the merdt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMerdt() {
        return merdt;
    }

    /**
     * Sets the value of the merdt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMerdt(String value) {
        this.merdt = value;
    }

    /**
     * Gets the value of the orderno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrderno() {
        return orderno;
    }

    /**
     * Sets the value of the orderno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrderno(String value) {
        this.orderno = value;
    }

    /**
     * Gets the value of the srcmerdt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSrcmerdt() {
        return srcmerdt;
    }

    /**
     * Sets the value of the srcmerdt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSrcmerdt(String value) {
        this.srcmerdt = value;
    }

    /**
     * Gets the value of the srcorderno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSrcorderno() {
        return srcorderno;
    }

    /**
     * Sets the value of the srcorderno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSrcorderno(String value) {
        this.srcorderno = value;
    }

    /**
     * Gets the value of the bankno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBankno() {
        return bankno;
    }

    /**
     * Sets the value of the bankno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBankno(String value) {
        this.bankno = value;
    }

    /**
     * Gets the value of the cityno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCityno() {
        return cityno;
    }

    /**
     * Sets the value of the cityno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCityno(String value) {
        this.cityno = value;
    }

    /**
     * Gets the value of the branchnm property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBranchnm() {
        return branchnm;
    }

    /**
     * Sets the value of the branchnm property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBranchnm(String value) {
        this.branchnm = value;
    }

    /**
     * Gets the value of the accntno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccntno() {
        return accntno;
    }

    /**
     * Sets the value of the accntno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccntno(String value) {
        this.accntno = value;
    }

    /**
     * Gets the value of the accntnm property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAccntnm() {
        return accntnm;
    }

    /**
     * Sets the value of the accntnm property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAccntnm(String value) {
        this.accntnm = value;
    }

    /**
     * Gets the value of the entseq property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEntseq() {
        return entseq;
    }

    /**
     * Sets the value of the entseq property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEntseq(String value) {
        this.entseq = value;
    }

    /**
     * Gets the value of the memo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMemo() {
        return memo;
    }

    /**
     * Sets the value of the memo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMemo(String value) {
        this.memo = value;
    }

    /**
     * Gets the value of the mobile property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMobile() {
        return mobile;
    }

    /**
     * Sets the value of the mobile property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMobile(String value) {
        this.mobile = value;
    }

}
