//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.11.24 at 11:56:32 ���� CST 
//


package com.zhiwei.credit.service.thirdPay.fuiou.model.ntfrsp.payfor;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.fuiou.mer.model.ntfrsp.payfor package. 
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

    private final static QName _Payforntfrsp_QNAME = new QName("", "payforntfrsp");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.fuiou.mer.model.ntfrsp.payfor
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link PayForNtfRspType }
     * 
     */
    public PayForNtfRspType createPayForNtfRspType() {
        return new PayForNtfRspType();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link PayForNtfRspType }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "payforntfrsp")
    public JAXBElement<PayForNtfRspType> createPayforntfrsp(PayForNtfRspType value) {
        return new JAXBElement<PayForNtfRspType>(_Payforntfrsp_QNAME, PayForNtfRspType.class, null, value);
    }

}
