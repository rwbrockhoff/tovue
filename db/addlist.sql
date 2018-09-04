insert into todolist(user_id, list, items, itemscompleted)
VALUES($1, $2, $3, $4);

select list, items, itemscompleted from todolist
where user_id = $1 and list =$2;

