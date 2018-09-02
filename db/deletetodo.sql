update todolist
set items = (select array_remove(items, items[$2 + 1]) from todolist)
where user_id=$1;
