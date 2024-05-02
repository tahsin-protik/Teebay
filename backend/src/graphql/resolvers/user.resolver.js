const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      const foundUser = await context.prisma.user.findUnique({
        where:{
          id: parseInt(args.id)
        }
      })
      
      return foundUser ?? null;
    },
    myProfile: async (parent, args, context, info) => {
      if (!context.req.user) {
        throw new Error('Not authenticated')
      }
      const foundUser = await context.prisma.user.findUnique({
        where:{
          id: context.req.user.userId
        }
      })
      
      return foundUser ?? null;
    }
  },
  Mutation: {
    async signup(parent, args, context) {
      // console.log(context.prisma)
      const password = await bcrypt.hash(args.password, 10)
      args.password = password
      const user = await context.prisma.user.create({ data: args })
      console.log(user)
      return {
        token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
        user,
      }
    },

    async login(parent, { email, password }, context) {
      const user = await context.prisma.user.findUnique({ where: { email }})
      if (!user) {
        throw new Error(`No user found for email: ${email}`)
      }
      const passwordValid = await bcrypt.compare(password, user.password)
      if (!passwordValid) {
        throw new Error('Invalid password')
      }
      return {
        token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
        user,
      }
    },
  }

};

module.exports = resolvers;
