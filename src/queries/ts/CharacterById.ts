import gql from "graphql-tag";
const CharacterByIdQuery = gql`
  query CharacterById($filterValue: ID!) {
    character(id: $filterValue) {
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
`;

export default CharacterByIdQuery;
