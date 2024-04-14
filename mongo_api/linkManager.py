from pymongo import MongoClient


class LinkManager:
    def __init__(self):
        self.client = MongoClient("mongodb://localhost:27017/")
        self.db = self.client["links"]
        self.collection = self.db["links"]

    def add_link_pair(self, payload):
        """Add a link pair with associated user to the collection."""
        # Ensure link_pair dictionary includes 'user', 'key', 'value'
        if "key" not in payload or "value" not in payload or "user" not in payload:
            return {
                "status": "error",
                "message": "Missing field(s)",
            }

        try:
            # Equivalent SQL: INSERT INTO links (user, key, value) VALUES ('user', 'key', 'value');
            self.collection.insert_one(payload)
            return {"status": "success", "message": "Link pair added successfully."}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def get_link_pair(self, user, any_link):
        """Retrieve a link pair from the collection by any link and associated user."""
        try:
            # Equivalent SQL: SELECT * FROM links WHERE user = 'user' AND (key = 'any_link' OR value = 'any_link');
            result = self.collection.find_one(
                {
                    "$and": [
                        {"user": user},
                        {"$or": [{"key": any_link}, {"value": any_link}]},
                    ]
                }
            )
            if result:
                return {"status": "success", "data": result}
            else:
                return {"status": "error", "message": "Link pair not found."}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def delete_link(self, user, short_link):
        """Delete a link pair from the collection by short link and associated user."""
        try:
            # Equivalent SQL: DELETE FROM links WHERE user = 'user' AND key = 'short_link';
            result = self.collection.delete_one({"user": user, "key": short_link})
            if result.deleted_count > 0:
                return {
                    "status": "success",
                    "message": "Link pair deleted successfully.",
                }
            else:
                return {"status": "error", "message": "Link pair not found."}
        except Exception as e:
            return {"status": "error", "message": str(e)}
