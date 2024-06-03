export default class LocalStorage {
  constructor() {
    this.piadas = JSON.parse(localStorage.getItem('piadas')) || [];
  }

  create(bit) {
    bit.token = this.token;

    this.piadas.push(bit);

    localStorage.setItem('piadas', JSON.stringify(this.piadas));
  }

  update(bit) {
    let index = this.getIndexByToken(bit.token);

    if (index !== -1) {
      this.piadas[index] = bit;

      localStorage.setItem('piadas', JSON.stringify(this.piadas));
    }
  }

  delete(bit) {
    let index = this.getIndexByToken(bit.token);

    console.log(bit.token);
    console.log(this.piadas);

    if (index !== -1) {
      this.piadas.splice(index, 1);

      localStorage.setItem('piadas', JSON.stringify(this.piadas));
    }
  }

  getIndexByToken(token) {
    for (let i = 0; i < this.piadas.length; i++) {
      if (this.piadas[i].token === token) {
        return i;
      }
    }

    return -1;
  }

  get token() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
};
