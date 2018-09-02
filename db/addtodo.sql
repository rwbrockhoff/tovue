update todolist
set items = (select array_cat(items, ARRAY[$2]));


