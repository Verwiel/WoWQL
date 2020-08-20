function race(parent, args, context) {
  return context.prisma.race.findMany().race()
}

module.exports = {
  race
}