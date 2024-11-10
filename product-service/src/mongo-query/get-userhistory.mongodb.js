use('Products');

const page = 1;
const size = 2;

db.m_userhistory.aggregate([
  {
    $match: {
      userId: ObjectId('64e6f8c2bf609d2492688fea'),
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
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
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
    $facet: {
      productList: [
        {
          $skip: page * size,
        },
        {
          $limit: size,
        },
      ],
      total: [
        {
          $count: 'count',
        },
      ],
    },
  },
  {
    $unwind: '$total',
  },
]);
