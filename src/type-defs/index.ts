const rootTypeDefs = `#graphql

type Book {
    title: String
    author: String
}

type Query {
    book: [Book]
}
`;

export default rootTypeDefs;
