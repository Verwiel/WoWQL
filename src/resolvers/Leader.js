function people(parent, args, context) {
  return context.prisma.leader.findMany().people()
}

module.exports = {
  people
}