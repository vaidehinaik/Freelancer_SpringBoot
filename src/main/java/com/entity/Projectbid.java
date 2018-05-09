//package com.entity;
//
//import java.io.Serializable;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//
//@Entity  // This tells Hibernate to make a table out of this class
//@Table(name="projectbids")
//public class Projectbid implements Serializable{
//	@Id
//	@GeneratedValue(strategy=GenerationType.AUTO)
//	@Column(name="bidid")
//	private Integer bidId;
//	
//	@Column(name="projectid")
//	private Integer projectId;
//	
//	@Column(name="userid")
//	private Integer userId;
//	
//	@Column(name="bidamount")
//	private Integer bidAmount;
//	
//	@Column(name="periodindays")
//	private Integer periodInDays;
//	
//	public Integer getBidId() {
//		return bidId;
//	}
//	public void setBidId(Integer bidId) {
//		this.bidId = bidId;
//	}
//	
//	public Integer getProjectId() {
//		return projectId;
//	}
//
//	public void setProjectId(Integer projectId) {
//		this.projectId = projectId;
//	}
//	
//	public Integer getUserId() {
//		return userId;
//	}
//	public void setUserId(Integer userId) {
//		this.userId = userId;
//	}
//	public Integer getBidAmount() {
//		return bidAmount;
//	}
//	public void setBidAmount() {
//		this.bidAmount = bidAmount;
//	}
//	public Integer getPeriodInDays() {
//		return periodInDays;
//	}
//	public void setPeriodInDays(Integer periodInDays) {
//		this.periodInDays = periodInDays;
//	}	
//}
