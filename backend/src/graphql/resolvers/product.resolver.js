const resolvers = {
    Query: {
        getAllProducts: async (parent, args, context) => {
            return await context.prisma.product.findMany({
                include: { categories: true },
            });
        },
        getProductById: async (parent, { id }, context) => {
            return await context.prisma.product.findUnique({
                where: { id: parseInt(id) },
            });
        },
        listMyProducts: async (parent, args, context) => {
            if (!context.req.user) {
                throw new Error("Not authenticated");
            }
            return await context.prisma.product.findMany({
                where: { author_id: context.req.user.userId },
                include: { categories: true },
            });
        }
    },
    Mutation: {
        createProduct: async (parent, args, context) => {
            console.log(context.req.user);
            if (!context.req.user) {
                throw new Error("Not authenticated");
            }

            data = {
                name: args.name,
                description: args.description,
                price: args.price,
                rent_price: args.rent_price,
                author_id: context.req.user.userId,
            };
            
            if (args.categories) {
                data.categories = {
                    connect: args.categories.map((id) => ({ id })),
                };
            }
        
            args.author_id = context.req.user.userId;
            return await context.prisma.product.create({
                data: data,
            });
        },
        updateProduct: async (parent, { id, ...args }, context) => {
            const userId = context.req.user.userId;
            is_exist = await context.prisma.product.findUnique({
                where: { id: parseInt(id), author_id: userId },
            });
            if (!is_exist) {
                throw new Error("Product not found");
            }

            return await context.prisma.product.update({
                where: { id: parseInt(id) },
                data: args,
            });
        },
        deleteProduct: async (parent, { id }, context) => {
            if (!context.req.user) {
                throw new Error("Not authenticated");
            }
            const author_id = context.req.user.userId;
            await context.prisma.product.delete({
                where: { id: parseInt(id), author_id },
            });
            return "Product deleted successfully";
        },
    },
};

module.exports = resolvers;
