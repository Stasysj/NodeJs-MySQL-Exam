
SELECT * FROM `accounts` 
LEFT JOIN groups ON accounts.group_id=groups.id
WHERE user_id=6