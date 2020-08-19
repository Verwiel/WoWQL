function loyalTo(parent, args, context) {
  return context.prisma.race.findMany().loyalTo()
}

module.exports = {
  loyalTo
}