function loyalTo(parent, args, context) {
  return context.prisma.race.findMany().loyalTo()
}

function leader(parent, args, context) {
  return context.prisma.race.findOne({ where: { id: parent.id } }).leader()
}

function racials(parent, args, context) {
  return context.prisma.race.findMany({ where: { id: parent.id } }).racials()
}



module.exports = {
  loyalTo,
  leader,
  racials
}