//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.12.14 at 01:17:56 ���� CST 
//


package com.zhiwei.credit.service.thirdPay.fuiou.model.req.refundresend;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.zhiwei.credit.service.thirdPay.fuiou.model.req.refundresend package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _Refundresendreq_QNAME = new QName("", "refundresendreq");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.zhiwei.credit.service.thirdPay.fuiou.model.req.refundresend
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link ReFundResendReqType }
     * 
     */
    public ReFundResendReqType createReFundResendReqType() {
        return new ReFundResendReqType();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ReFundResendReqType }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "refundresendreq")
    public JAXBElement<ReFundResendReqType> createRefundresendreq(ReFundResendReqType value) {
        return new JAXBElement<ReFundResendReqType>(_Refundresendreq_QNAME, ReFundResendReqType.class, null, value);
    }

}
