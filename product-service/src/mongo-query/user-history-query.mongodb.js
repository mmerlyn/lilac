use('Products');

const page = 1;
const size = 2;

db.m_userhistory.aggregate([
  {
    $match: {
      userId: ObjectId('64c0f3b8b4429e95e7b39caa'),
    },
  },
  {
    $lookup: {
      from: 'm_products',
      let: {
        ids: '$productIds',
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ['$_id', '$$ids'],
            },
          },
        },
      ],
      as: 'productInfo',
    },
  },
  {
    $project: {
      productIds: 0,
      userId: 0,
      testId: 0,
      _id: 0,
    },
  },
  {
    $unwind: '$productInfo',
  },
  {
    $replaceRoot: {
      newRoot: '$productInfo',
    },
  },
  {
    $skip: page * size,
  },
  {
    $limit: size,
  },
]);
