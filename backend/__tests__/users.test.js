const { userAddLinkPair, userGetLinkPair, userDeleteLink } = require('../models/user');

describe('Link Manager API Tests', () => {
  let testUser = "testUser";
  let testKey = "testKey";
  let testValue = "testValue";

  beforeAll(async () => {
    await userAddLinkPair({
      user: testUser,
      key: testKey,
      value: testValue
    });
  });

  test('Add link pair', async () => {
    const newLinkPair = { user: testUser, key: "newKey", value: "newValue" };
    const addResult = await userAddLinkPair(newLinkPair);
    expect(addResult.status).toBe('success');

    const getResult = await userGetLinkPair(testUser, "newKey");
    expect(getResult.status).toBe('success');
    expect(getResult.data).toEqual(expect.objectContaining(newLinkPair));
  });

  test('Get link pair', async () => {
    const getResult = await userGetLinkPair(testUser, testKey);
    expect(getResult.status).toBe('success');
    expect(getResult.data).toEqual(expect.objectContaining({
      user: testUser,
      key: testKey,
      value: testValue
    }));

    const getNonExisting = await userGetLinkPair(testUser, "nonExistingKey");
    expect(getNonExisting.status).toBe('error');
  });

  test('Delete link pair', async () => {
    const deleteResult = await userDeleteLink(testUser, testKey);
    expect(deleteResult.status).toBe('success');

    const getDeletedResult = await userGetLinkPair(testUser, testKey);
    expect(getDeletedResult.status).toBe('error');

    const deleteNonExisting = await userDeleteLink(testUser, "nonExistingKey");
    expect(deleteNonExisting.status).toBe('error');
  });

  afterAll(async () => {
    // Clean up the database
    await userDeleteLink(testUser, "newKey");
  });
});
