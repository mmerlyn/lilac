// see here
use('Products');

// lets write the query first Okay? what we need to do?
// what is the requirment? only one or many?

const productIds = [
  new ObjectId('64ca4eab174a5c559db9529f'),
  new ObjectId('64ca4eab174a5c559db952a0'),
  new ObjectId('64ca4eab174a5c559db952a1'),
  new ObjectId('64ca4eab174a5c559db952a2'),
];

db.m_products.find(
  { _id: { $in: productIds } },
  {
    specifications: 0,
  },
);
