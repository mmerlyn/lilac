use('User');

const userId = new ObjectId('64e6f8c2bf609d2492688fea');

db.m_user.aggregate([
  {
    $match: {
      _id: userId,
    },
  },
  {
    $lookup: {
      from: 'm_user_data',
      localField: '_id',
      foreignField: 'userId',
      as: 'result',
    },
  },
  {
    $unwind: '$result',
  },
]);
