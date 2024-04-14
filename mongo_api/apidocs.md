# mongo_api Docs

## Flask port
found at port.py


## Content-Type
"application/json"


## Routes

### POST /add_link_pair
#### Payload
{"user": <user_id>, "key": <short_link>, "value": <long_link>}
#### Response
success:    {"status": "success", "message": "Link pair added successfully."}<br>
error:      {"status": "error", "message": <err_msg>}

### GET /get_link_pair/<user>/<any_link>
#### Response
success:    {"status": "success", "data": {"_id": <entry_id>, "user": <user_id>, "key": <short_link>, "value": <long_link>}}<br>
error:      {"status": "error", "message": <err_msg>}

### DELETE /delete_link/<user>/<short_link>
#### Response
success:    {"status": "success", "message": "Link pair deleted successfully."}<br>
error:      {"status": "error", "message": <err_msg>}
