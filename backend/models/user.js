const mongoAxios = require('./mongo_axios');

const userAddLinkPair = async (payload) => {
  try {
    const response = await mongoAxios.post('/add_link_pair', payload);
    console.log('Link pair added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add link pair:', error.message);
    throw new Error('Failed to add link pair via API');
  }
};

const userGetLinkPair = async (user, anyLink) => {
  try {
    const response = await mongoAxios.get(`/get_link_pair/${user}/${anyLink}`);
    console.log('Retrieved link pair:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to retrieve link pair for ${user} and ${anyLink}:`, error.message);
    throw new Error('Failed to retrieve link pair via API');
  }
};

const userDeleteLink = async (user, shortLink) => {
  try {
    const response = await mongoAxios.delete(`/delete_link/${user}/${shortLink}`);
    console.log('Deleted link pair:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete link pair for ${user} and ${shortLink}:`, error.message);
    throw new Error('Failed to delete link pair via API');
  }
};

module.exports = {
  userAddLinkPair,
  userGetLinkPair,
  userDeleteLink
};

