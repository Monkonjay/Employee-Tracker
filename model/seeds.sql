USE DATABASE employees_db;

INSERT INTO department (name)
VALUES  ('Marketing'), 
        ('Infomation Technology'), 
        ('Human Resources');


INSERT INTO role (title, salary, department_id)
VALUES  ('Director of Marketing', 85000, 2), 
        ('Systems Analyst', 78000, 3), 
        ('Lead Recruiter', 69700, 4),
        ('Field Area Manager', 77700, 1);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Motima', 'Vorkpor', 1, null), 
        ('Jewel', 'Wondergirl', 2, null), 
        ('Judy', 'Computech', 3, null),
        ('Lawuo', 'Grandmany', 4, null);
