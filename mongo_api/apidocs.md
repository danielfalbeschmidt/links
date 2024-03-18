# mongo_api Docs

## Flask port
found at port.py


## Content-Type
"application/json"


## Routes

### POST /add_link_pair
#### Payload
{"key": <short_link>, "value": <long_link>}
#### Response
success:    {"status": "success", "message": "Link pair added successfully."}
error:      {"status": "error", "message": <err_msg>}

### GET /get_link_pair/<any_link>
#### Response
success:    {"status": "success", "data": {"_id": <entry_id>, "key": <short_link>, "value": <long_link>}}
error:      {"status": "error", "message": <err_msg>}

### DELETE /delete_link/<short_link>
#### Response
success:    {"status": "success", "message": "Link pair deleted successfully."}
error:      {"status": "error", "message": <err_msg>}
