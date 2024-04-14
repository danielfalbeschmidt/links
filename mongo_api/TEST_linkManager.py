import unittest
from linkManager import LinkManager


class TestLinkManager(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.link_manager = LinkManager()
        # Insert a known link pair with user information for testing purposes
        cls.test_user = "testUser"
        cls.test_link_pair = {
            "user": cls.test_user,
            "key": "testKey",
            "value": "testValue",
        }
        cls.link_manager.add_link_pair(cls.test_link_pair)

    def testA_add_link_pair(self):
        # Test adding a new link pair with user association
        new_link_pair = {"user": self.test_user, "key": "newKey", "value": "newValue"}
        result = self.link_manager.add_link_pair(new_link_pair)
        self.assertEqual(result["status"], "success")
        # Ensure it's added; also need to include user in the get_link_pair method call
        added_pair = self.link_manager.get_link_pair(self.test_user, "newKey")["data"]
        # Remove the '_id' field from the result before comparing
        if "data" in added_pair:
            del added_pair["_id"]
        self.assertEqual(added_pair, new_link_pair)

    def testB_get_link_pair(self):
        # Test retrieving an existing link pair by key
        result = self.link_manager.get_link_pair(self.test_user, "testKey")
        self.assertEqual(result["status"], "success")
        result_data = result["data"]
        # Remove the '_id' field from the result before comparing
        del result_data["_id"]
        self.assertEqual(
            result_data,
            {"user": self.test_user, "key": "testKey", "value": "testValue"},
        )

        # Test retrieving an existing link pair by value
        result = self.link_manager.get_link_pair(self.test_user, "testValue")
        self.assertEqual(result["status"], "success")
        result_data = result["data"]
        # Remove the '_id' field from the result before comparing
        del result_data["_id"]
        self.assertEqual(
            result_data,
            {"user": self.test_user, "key": "testKey", "value": "testValue"},
        )

        # Test retrieving a non-existing link pair
        result = self.link_manager.get_link_pair(self.test_user, "nonExistingKey")
        self.assertEqual(result["status"], "error")

    def testZ_delete_link(self):
        # Test deleting an existing link by key with associated user
        result = self.link_manager.delete_link(self.test_user, "testKey")
        self.assertEqual(result["status"], "success")

        # Ensure it's deleted
        result = self.link_manager.get_link_pair(self.test_user, "testKey")
        self.assertEqual(
            result["status"], "error", "Link should be deleted but still exists."
        )

        # Test deleting a non-existing link
        result = self.link_manager.delete_link(self.test_user, "nonExistingKey")
        self.assertEqual(
            result["status"],
            "error",
            "Attempting to delete a non-existing link should return an error.",
        )

    @classmethod
    def tearDownClass(cls):
        # Clean up the database
        cls.link_manager.delete_link("testUser", "newKey")


if __name__ == "__main__":
    unittest.main()
