update todolist
set items 
= (select array_cat((select items from todolist where user_id = $1 and list = $3 ), ARRAY[$2])
)
where user_id = $1 and list = $3

