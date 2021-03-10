import gql from "graphql-tag";
const CharactersQuery = gql`
  query Characters($page: Int! = 1, $filterValue: String) {
    characters(page: $page, filter: { name: $filterValue }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        gender
        species
        image
        episode {
          id
          name
          air_date
          episode
          created
        }
      }
    }
  }
`;

export default CharactersQuery;
