import unittest
from linkManager import LinkManager

class TestLinkManager(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.link_manager = LinkManager()
        # Insert a known link pair for testing purposes
        cls.test_link_pair = {'key': 'testKey', 'value': 'testValue'}
        cls.link_manager.add_link_pair(cls.test_link_pair)

    def testA_add_link_pair(self):
        # Test adding a new link pair
        new_link_pair = {'key': 'newKey', 'value': 'newValue'}
        result = self.link_manager.add_link_pair(new_link_pair)
        self.assertEqual(result['status'], 'success')
        # Ensure it's added
        added_pair = self.link_manager.get_link_pair('newKey')['data']
        self.assertEqual(added_pair, new_link_pair)

    def testB_get_link_pair(self):
        # Test retrieving an existing link pair by key
        result = self.link_manager.get_link_pair('testKey')
        self.assertEqual(result['status'], 'success')
        result_data = result['data']
        # Remove the '_id' field from the result before comparing
        del result_data['_id']
        self.assertEqual(result_data, {'key': 'testKey', 'value': 'testValue'})

        # Test retrieving an existing link pair by value
        result = self.link_manager.get_link_pair('testValue')
        self.assertEqual(result['status'], 'success')
        result_data = result['data']
        # Remove the '_id' field from the result before comparing
        del result_data['_id']
        self.assertEqual(result_data, {'key': 'testKey', 'value': 'testValue'})

        # Test retrieving a non-existing link pair
        result = self.link_manager.get_link_pair('nonExistingKey')
        self.assertEqual(result['status'], 'error')


    def testZ_delete_link(self):
        # Test deleting an existing link by key
        result = self.link_manager.delete_link('testKey')
        self.assertEqual(result['status'], 'success')

        # Ensure it's deleted
        result = self.link_manager.get_link_pair('testKey')
        self.assertEqual(result['status'], 'error')

        # Test deleting a non-existing link
        result = self.link_manager.delete_link('nonExistingKey')
        self.assertEqual(result['status'], 'error')

    @classmethod
    def tearDownClass(cls):
        # Clean up the database
        cls.link_manager.delete_link('newKey')

if __name__ == '__main__':
    unittest.main()
