const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]


let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,

    feed: () => links,

    link: (root, args) => searchLinkById(args.id),
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link);
      return link;
    },

    updateLink: (root,  args) => {
        link = searchLinkById(args.id);
        link.id = args.id;
        link.url = args.url;
        link.description = args.description;
        return link
    },

    deleteLink: (root, args) => {
      link = searchLinkById(args.id);
      let index = links.indexOf(link);
      console.log(`Item a borrar en la posicion: ${index}`);
      links.splice(index);
      return link;
    }
  },
  
  Link: {
    id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
  }
}


const searchLinkById = (id) => links.find((link) => link.id == id);


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))