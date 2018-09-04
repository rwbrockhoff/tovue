-- [sub, item, list]

update todolist
set itemscompleted 
= (select array_cat((select itemscompleted from todolist where user_id = $1 and list = $3 ), ARRAY[$2])
)
where user_id = $1 and list = $3

