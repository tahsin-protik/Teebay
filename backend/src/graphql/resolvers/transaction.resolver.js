const resolvers = {
    Query: {
        myTransactions: async (parent, args, context) => {
            const userId = context.req.user.userId;
            const data = context.prisma.user.findFirst({
                where: { id: userId },
                include: {
                    bought: {
                        include: {
                            product: true,
                            
                        },
                    },
                    sold: {
                        include: {
                            product: true,
                            
                        },
                    },
                    lent: {
                        include: {
                            product: true,
                            
                        },
                    },
                    borrowed: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            return data;
        },
    },
    Mutation: {
        buyProduct: async (parent, { product_id }, context) => {
            const userId = context.req.user.userId;
            const product = await context.prisma.product.findFirst({
                where: { id: product_id },
            });
            if (!product) throw new Error('Product not found');
            const purchase = await context.prisma.purchase.create({
                data: {
                    product_id: product_id,
                    buyer_id: userId,
                    seller_id: product.author_id, 
                },
            });
            return purchase;
        },
        rentProduct: async (parent, { product_id, date_from, date_to }, context) => {
            const userId = context.req.user.userId;
            const product = await context.prisma.product.findUnique({
                where: { id: product_id },
            });
            if (!product) throw new Error('Product not found');
            const rent = await context.prisma.rent.create({
                data: {
                    productId: product_id,
                    lenderId: product.authorId,
                    borrowerId: userId,
                    dateFrom: new Date(date_from),
                    dateTo: new Date(date_to),
                },
            });
            return rent;
        },
    },
};

module.exports = resolvers;
