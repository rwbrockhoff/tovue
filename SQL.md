##Create Table with jsonb
create table todolist ( 
id serial primary key,
user_id text,
data jsonb
)

##Setting Up Initial Data Structure
insert into todolist (user_id, data)
VALUES ('google-oauth2|55555555555555', '{
    "inbox": [{"todo": "run", "todo_id": 4}, {"todo": "breathe", "todo_id": 6}, {"todo": "try", "todo_id": 55}],
    "inboxcomp": [{"todo": "ran", "todo_id": 8}, {"todo": "breathed", "todo_id": 9}, {"todo": "tried", "todo_id": 10}]
}')

##Query DB for Specific Lists
SELECT data->>'inbox' FROM todolist;

insert into todolist (user_id, data)
VALUES ('google-oauth2|103947273324697076686', '{
    "inbox": [{"todo": "run", "todo_id": 4}, {"todo": "breathe", "todo_id": 6}, {"todo": "try", "todo_id": 55}],
    "inboxcomp": [{"todo": "ran", "todo_id": 8}, {"todo": "breathed", "todo_id": 9}, {"todo": "tried", "todo_id": 10}]}')



##Delete from Array

update todolist
set items = (select array_remove(items, items[1]) from todolist)

update todolist
set items = (select array_cat(items, ARRAY[$2]));

update todolist
set items = (select array_remove(items, items[1]) from 
(select * from todolist where user_id='google-oauth2|103947273324697076686' and list='inbox' limit 1) as filtered
)


##Remove Item from Specific List
update todolist
set items 
= (select array_remove((select items from todolist where user_id = 'google-oauth2|103947273324697076686' and list = 'inbox' ), items[1])
)
where user_id = 'google-oauth2|103947273324697076686' and list = 'inbox'

