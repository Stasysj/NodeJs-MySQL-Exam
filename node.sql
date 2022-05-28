
SELECT * FROM `accounts` 
LEFT JOIN groups ON accounts.group_id=groups.id
WHERE user_id=25

'SELECT * FROM accounts LEFT JOIN groups ON accounts.group_id=groups.id WHERE  NOT(user_id = ? )'


'SELECT DISTINCT groups.name FROM groups LEFT JOIN accounts ON groups.id=accounts.group_id WHERE  NOT(user_id = ? )';

SELECT DISTINCT groups.name, groups.id FROM groups LEFT JOIN accounts ON groups.id=accounts.group_id WHERE  NOT(user_id = 25 )