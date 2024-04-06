from pymongo import MongoClient

class LinkManager:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['links']
        self.collection = self.db['links']

    def add_link_pair(self, link_pair):
        """Add a link pair to the collection."""
        try:
            self.collection.insert_one(link_pair)
            # Equivalent SQL: INSERT INTO links (key, value) VALUES ('key_from_link_pair', 'value_from_link_pair');
            return {'status': 'success', 'message': 'Link pair added successfully.'}
        except Exception as e:
            return {'status': 'error', 'message': str(e)}

    def get_link_pair(self, any_link):
        """Retrieve a link pair from the collection by any link."""
        try:
            result = self.collection.find_one({'$or': [{'key': any_link}, {'value': any_link}]})
            # Equivalent SQL: SELECT * FROM links WHERE key = 'any_link' OR value = 'any_link';
            if result:
                return {'status': 'success', 'data': result}
            else:
                return {'status': 'error', 'message': 'Link pair not found.'}
        except Exception as e:
            return {'status': 'error', 'message': str(e)}

    def delete_link(self, short_link):
        """Delete a link pair from the collection by short link."""
        try:
            result = self.collection.delete_one({'key': short_link})
            # Equivalent SQL: DELETE FROM links WHERE key = 'short_link';
            if result.deleted_count > 0:
                return {'status': 'success', 'message': 'Link pair deleted successfully.'}
            else:
                return {'status': 'error', 'message': 'Link pair not found.'}
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
