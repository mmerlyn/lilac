const { count } = require('console');

use('Products');

config.set('displayBatchSize', 300);

const title = 'samsung';
const page = 7;
const size = 10;

const exp = generateTitleRegex(title);

function generateTitleRegex(title) {
  // Escape special characters in the title
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Split the title into words
  const words = escapedTitle.split(' ');

  // Create a regex pattern for each word
  const wordPatterns = words.map((word) => `(?=.*\\b${word}\\b)`);

  // Combine the word patterns into a single regex
  const regexPattern = new RegExp(wordPatterns.join(''), 'i');

  return regexPattern;
}

db.m_products.aggregate([
  {
    $match: {
      title: {
        $regex: exp,
      },
    },
  },
  {
    $project: {
      title: 1,
      listPrice: 1,
      discount: 1,
      imageUrl: 1,
      categoryId: 1,
      subCategoryId: 1,
      brand: 1,
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
