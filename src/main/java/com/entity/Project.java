package com.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity // This tells Hibernate to make a table out of this class
@Table(name="projects")
public class Project implements Serializable {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="projectid")
	private Integer projectId;
	
	@Column(name="owneruserid")
	private Integer ownerUserId;
	
	@Column(name="title")
	private String title;
	
	@Column(name="description")
	private String description;
	
	@Column(name="budgetlow")
	private Integer budgetLow;
	
	@Column(name="budgethigh")
	private Integer budgethigh;
	
	@Column(name="skills")
	private String skills;
	
	@Column(name="status")
	private byte status;

	public byte getStatus() {
		return status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public Integer getOwnerUserId() {
		return ownerUserId;
	}

	public void setOwnerUserId(Integer ownerUserId) {
		this.ownerUserId = ownerUserId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getBudgetLow() {
		return budgetLow;
	}

	public void setBudgetLow(Integer budgetLow) {
		this.budgetLow = budgetLow;
	}

	public Integer getBudgethigh() {
		return budgethigh;
	}

	public void setBudgethigh(Integer budgethigh) {
		this.budgethigh = budgethigh;
	}

	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}
}
