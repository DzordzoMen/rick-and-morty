import gql from "graphql-tag";
const CharactersByEpisodeQuery = gql`
  query CharactersByEpisode($page: Int! = 1, $filterValue: String) {
    episodes(page: $page, filter: { episode: $filterValue }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        characters {
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
  }
`;

export default CharactersByEpisodeQuery;
