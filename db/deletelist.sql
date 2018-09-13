delete from todolist
where user_id = $1
and id = $2;
