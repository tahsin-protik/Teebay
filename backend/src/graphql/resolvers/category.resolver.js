const resolvers = {
    Query: {
        getAllCategories: async (parent, args, context) => {
            return await context.prisma.category.findMany({
                include: { products: true }
            });
        },
        getCategoryById: async (parent, { id }, context) => {
            return await context.prisma.category.findUnique({
                where: { id: parseInt(id) },
            });
        },
    },
    Mutation: {
        createCategory: async (parent, { name }, context) => {
            category = await context.prisma.category.findFirst({
                where: { name }
            });
            if (category) {
                throw new Error("Category already exists");
            }
            return await context.prisma.category.create({
                data: { name },
            });
        }
    },
};

module.exports = resolvers;
