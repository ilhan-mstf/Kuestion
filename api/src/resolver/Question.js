module.exports = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt + '',
  text: (parent) => parent.text,
  voteCount: (parent) => parent.voteCount
}
