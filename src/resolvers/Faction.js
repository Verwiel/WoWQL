function races(parent, args, context) {
  return context.prisma.faction.findOne({ where: { id: parent.id } }).races()
}

module.exports = {
  races
}