select id, list, items, itemscompleted from todolist
where user_id=$1
order by id;
