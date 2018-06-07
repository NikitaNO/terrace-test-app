const state = {
  itemChangeIndex: -1,
  isAddingNewItem: false,
  isShowingDuplicate: false,
  history: {
    list: [],
    cursor: -1,
  },
  items: [
    { name: 'Apples', cost: 20 },
    { name: 'Oranges', cost: 30 },
  ],
};

export default state;
