const sortChats = (a, b) => {
  a.updatedAt >= b.updatedAt ? -1 : 1;
};

const sortMessages = (a, b) => {
  a.creationDate >= b.creationDate ? 1 : -1;
};

const checkIdMatch = (id, userId) => id === userId;

export { sortChats, sortMessages, checkIdMatch };
