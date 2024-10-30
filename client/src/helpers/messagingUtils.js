const sortChats = (a, b) => {
  a.updatedAt >= b.updatedAt ? -1 : 1;
};

const checkIdMatch = (id, userId) => id === userId;

export { sortChats, checkIdMatch };
