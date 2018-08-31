insert into todolist (user_id, todo)
VALUES($1, $2);

select todo, todo_id, category from todolist
where user_id = $1
order by todo_id desc
limit 1;