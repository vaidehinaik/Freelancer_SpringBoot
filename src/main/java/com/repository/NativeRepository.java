package com.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;
import javax.transaction.Transaction;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.beans.factory.annotation.Autowired;

import com.entity.Project;
import com.entity.User;

public class NativeRepository {

	@Autowired
	private EntityManagerFactory entityManagerFactory;

	public List<HashMap> getUserProjects(String userName) {
		EntityManager session = entityManagerFactory.createEntityManager();
		try {

			String projectQuery = "SELECT projects.projectId, MAX(projects.title) as title," +
					"MAX(projects.description) as description, MAX(projects.budgetLow) as budgetLow," +
					"MAX(projects.budgetHigh) as budgetHigh, MAX(projects.skills) as skills," +
					"MAX(users.username) AS employer, COUNT(projectbid.projectId) AS bidsCount," +
					"(CASE WHEN AVG(projectbid.bidAmount) IS NULL THEN 0 ELSE AVG(projectbid.bidamount) END) " +
					"AS averageBidAmount FROM projects LEFT OUTER JOIN projectbid ON " +
					"projects.projectId = projectbid.projectId INNER JOIN users ON projects.ownerUserId =  users.userId " +
					"WHERE projects.status = 0 AND projects.owneruserid = (" +
					"select userId from users where username = :userName) " +
					"GROUP BY projects.projectId";
			Query query = session.createNativeQuery(projectQuery);
			query = query.setParameter("userName", userName);
			List<Object[]> results = query.getResultList();
			List<HashMap> ob_list = new ArrayList<HashMap>();
			for (Object[] record : results) {
				HashMap prj_info = new HashMap();
				prj_info.put("projectId", record[0]);
				prj_info.put("title", record[1]);
				prj_info.put("description", record[2]);
				prj_info.put("budgetLow", record[3]);
				prj_info.put("budgetHigh", record[4]);
				prj_info.put("skills", record[5]);
				prj_info.put("employer", record[6]);
				prj_info.put("bidsCount", record[7]);
				prj_info.put("averageBidAmount", record[8]);
				ob_list.add(prj_info);
			}
			return ob_list;
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		finally {
			if(session.isOpen()) session.close();
		}

		return null;
	}
	public List<HashMap> getAllProjects() {
		EntityManager session = entityManagerFactory.createEntityManager();
		try {
			String projectQuery = "SELECT projects.projectId, MAX(projects.title) as title," +
					"MAX(projects.description) as description, MAX(projects.budgetLow) as budgetLow," +
					"MAX(projects.budgetHigh) as budgetHigh, MAX(projects.skills) as skills," +
					"MAX(projects.status) as status, MAX(users.username) AS employer," +
					"COUNT(projectbid.projectId) AS bidsCount," +
					"(CASE WHEN AVG(projectbid.bidAmount) IS NULL THEN 0 ELSE AVG(projectbid.bidAmount) END) " +
					"AS averageBidAmount FROM projects LEFT OUTER JOIN projectbid "  +
					"ON projects.projectId = projectbid.projectId " +
					"INNER JOIN users ON projects.ownerUserId =  users.userId WHERE projects.status = 0 " +
					"GROUP BY projects.projectId";
			Query query = session.createNativeQuery(projectQuery);
			List<Object[]> results = query.getResultList();
			List<HashMap> ob_list = new ArrayList<HashMap>();
			for (Object[] record : results) {
				HashMap prj_info = new HashMap();
				prj_info.put("projectId", record[0]);
				prj_info.put("title", record[1]);
				prj_info.put("description", record[2]);
				prj_info.put("budgetLow", record[3]);
				prj_info.put("budgetHigh", record[4]);
				prj_info.put("skills", record[5]);
				prj_info.put("employer", record[6]);
				prj_info.put("bidsCount", record[7]);
				prj_info.put("averageBidAmount", record[8]);
				ob_list.add(prj_info);
			}
			return ob_list;
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		finally {
			if(session.isOpen()) session.close();
		}
		return null;

	}

	public List<HashMap> getUserBidProjects(String userName) {
		EntityManager session = entityManagerFactory.createEntityManager();
		try {

			String projectQuery = "SELECT A.projectId, A.title, A.employer, A.averageBidAmount, A.budgetLow, A.budgetHigh," +
					"A.status, projectbid.bidAmount, projectbid.periodInDays FROM projectbid INNER JOIN (" +
					"SELECT projects.projectId," +
					"MAX(projects.title) as title," +
					"MAX(projects.description) as description," +
					"MAX(projects.budgetLow) as budgetLow," +
					"MAX(projects.budgetHigh) as budgetHigh," +
					"MAX(projects.skills) as skills," +
					"MAX(users.username) AS employer," +
					"COUNT(projectbid.projectId) AS bidsCount," +
					"AVG(projectbid.bidAmount) AS averageBidAmount," +
					"MAX(projects.status) as Status " +
					"FROM projects INNER JOIN projectbid ON projects.projectId = projectbid.projectId " +
					"INNER JOIN users ON projects.ownerUserId =  users.userId " +
					"WHERE projects.status = 0 " +
					"GROUP BY projects.projectId) AS A ON projectbid.projectId = A.projectId " +
					"WHERE projectbid.userId = (select userId from users where username =:userName)";

			Query query = session.createNativeQuery(projectQuery);
			query = query.setParameter("userName", userName);
			List<Object[]> results = query.getResultList();
			List<HashMap> ob_list = new ArrayList<HashMap>();
			for (Object[] record : results) {
				HashMap prj_info = new HashMap();
				prj_info.put("projectId", record[0]);
				prj_info.put("title", record[1]);
				prj_info.put("description", record[2]);
				prj_info.put("budgetLow", record[3]);
				prj_info.put("budgetHigh", record[4]);
				prj_info.put("skills", record[5]);
				prj_info.put("employer", record[6]);
				prj_info.put("bidsCount", record[7]);
				prj_info.put("averageBidAmount", record[8]);
				ob_list.add(prj_info);
			}
			return ob_list;
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		finally {
			if(session.isOpen()) session.close();
		}

		return null;
	}

	public HashMap getProjectAndBids(Integer projectId) {
		EntityManager session = entityManagerFactory.createEntityManager();
		try {
			HashMap finalData = new HashMap();
			String projectQuery = "select u.userId, u.name, u.username, u.contact, "
					+ "p.projectId, p.title, p.description, "
					+ "p.budgetLow, p.budgetHigh, p.skills, p.status From users "
					+ " as u INNER JOIN projects as p on u.userId = p.ownerUserId "
					+ "AND p.projectId = :projectId";

			Query query = session.createNativeQuery(projectQuery);
			query = query.setParameter("projectId", projectId);
			List<Object[]> results = query.getResultList();
			for (Object[] record : results) {
				HashMap prj_info = new HashMap();
				prj_info.put("userId", record[0]);
				prj_info.put("name", record[1]);
				prj_info.put("username", record[2]);
				prj_info.put("contact", record[3]);
				prj_info.put("projectId", record[4]);
				prj_info.put("title", record[5]);
				prj_info.put("description", record[6]);
				prj_info.put("budgetLow", record[7]);
				prj_info.put("budgetHigh", record[8]);
				prj_info.put("skills", record[9]);
				prj_info.put("status", record[10]);
				finalData.put("projectDetails", prj_info);
			}
			List<HashMap> ob_list = new ArrayList<HashMap>();
			String bidQuery = "select u.userId, u.name, u.username, u.contact, u.aboutMe, "
					+ "u.skills, pb.projectId, pb.bidAmount, pb.periodInDays From " + 
					" users as u INNER JOIN projectbid as pb on u.userId = pb.userId "
					+ " AND pb.projectId = " + projectId + " AND u.userId IN "
					+ "(SELECT userId from projectbid where projectId = " + projectId + ")";

			Query query2 = session.createNativeQuery(bidQuery);
			List<Object[]> bidResults = query2.getResultList();
			for (Object[] record : bidResults) {
				HashMap prj_info = new HashMap();
				prj_info.put("userId", record[0]);
				prj_info.put("name", record[1]);
				prj_info.put("username", record[2]);
				prj_info.put("contact", record[3]);
				prj_info.put("aboutMe", record[4]);
				prj_info.put("skills", record[5]);
				prj_info.put("projectId", record[6]);
				prj_info.put("bidAmount", record[7]);
				prj_info.put("periodInDays", record[8]);
				ob_list.add(prj_info);
			}
			finalData.put("userProfilesWithBids", ob_list);
			return finalData;
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		finally {
			if(session.isOpen()) session.close();
		}

		return null;
	}
	
	public void updateUserInfo(User user) {
		EntityManager session = entityManagerFactory.createEntityManager();
        try {
        	session.getTransaction().begin();
        	String updateQuery = "UPDATE freelancer.users SET name = '" + user.getName() + "', "
                    + "contact = '" + user.getContact() + "', " + "skills = '" + user.getSkills() + "', "
                    + "aboutMe = '" + user.getAboutMe() + "' where userId = " + user.getUserId();        	
            Query query = session.createNativeQuery(updateQuery);
        	int result = query.executeUpdate();
        	session.getTransaction().commit();
        	System.out.println("update query: " + updateQuery);
            System.out.println("result: " + result);
        } catch (Exception ex) {
        	System.out.println(ex.getMessage());
        }
        finally {
            if(session.isOpen()) session.close();
        }
	}
}
