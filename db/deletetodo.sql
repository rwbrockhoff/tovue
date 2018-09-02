update todolist
set items 
= (select array_remove((select items from todolist where user_id = $1 and list = $3 ), items[$2 + 1])
)
where user_id = $1 and list = $3


