SELECT * 
FROM project 
JOIN ticket ON ticket.project_id = project.id 
JOIN user ON project.owner_id = user.id;

SELECT * FROM user
JOIN project ON project.owner_id = user.id
JOIN ticket on ticket.project_id = project.id
WHERE project.owner_id = user.id
