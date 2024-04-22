const { mongoAxios } = require('./mongo_axios');

const getAllLinks = async () => {
  const response = await mongoAxios.get('/get_all_links');
  console.log('Retrieved all links from the API');
  return response.data;
};

const findLinkById = async (id) => {
  const response = await apiClient.get(`/get_link_by_id/${id}`);
  console.log(`Retrieved link with ID ${id} from the API`);
  return response.data;
};

const createNewLink = async (link) => {
  const response = await apiClient.post('/add_link_pair', link);
  console.log('New link added to the database via the API');
  return response.data;
};

const findLinkByOriginalUrl = async (originalUrl) => {
  const encodedUrl = encodeURIComponent(originalUrl);
  const response = await apiClient.get(`/find_link_by_original_url/${encodedUrl}`);
  console.log(`Retrieved link with original URL ${originalUrl} from the API`);
  return response.data;
};

const emptyDatabase = async () => {
  const response = await apiClient.delete('/empty_database');
  console.log(`${response.data.deletedCount} documents deleted via the API`);
  return response.data.deletedCount;
};

module.exports = {
  getAllLinks, findLinkById, createNewLink, findLinkByOriginalUrl, emptyDatabase
};
