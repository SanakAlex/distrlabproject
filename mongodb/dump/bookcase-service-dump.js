/**
 * Creates pre-filled demo account
 */

print('dump start');

iptstud.books.update(
    [
        {
            "id": 1,
            "title": "Awesome book",
            "shortDescription": "Some description",
            "author": "Some A.",
            "genre": "criminal",
            "price": 100,
            "availableCount": 10,
            "orderedCount": 0
        },
        {
            "id": 2,
            "title": "The Hunger Games (part 1)",
            "shortDescription": "about games",
            "author": "Suzanne Collins",
            "genre": "criminal",
            "price": 1000,
            "availableCount": 15,
            "orderedCount": 0
        },
        {
            "id": 3,
            "title": "The Hunger Games (part 2)",
            "shortDescription": "about games",
            "author": "Suzanne Collins",
            "genre": "criminal",
            "price": 999,
            "availableCount": 20,
            "orderedCount": 0
        },
        {
            "id": 4,
            "title": "Harry Potter",
            "shortDescription": "about Harry Potter",
            "author": "J. K. Rowling.",
            "genre": "fantasy",
            "price": 99,
            "availableCount": 100,
            "orderedCount": 0
        }
    ]
);

print('dump complete');