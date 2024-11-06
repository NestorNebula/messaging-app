const updateAreaHeight = (e) => {
  e.target.style.height =
    e.target.scrollHeight > e.target.clientHeight
      ? e.target.scrollHeight + 'px'
      : 'auto';
};

const updateAreaMinHeight = (e) => {
  e.target.style.minHeight =
    e.target.scrollHeight > e.target.clientHeight
      ? e.target.scrollHeight + 'px'
      : '5rem';
};

export { updateAreaHeight, updateAreaMinHeight };
