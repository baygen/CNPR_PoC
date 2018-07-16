class TemporaryStorage {
  constructor() {
    this.whiteListPlates = [
      { id: 1, plate: 'AB5427BC' },
      { id: 2, plate: 'AK9265AK' },
      { id: 3, plate: 'BC9025AX' }
    ];

    this.logs = [];
    this.index = 3;
    this.config = {
      minNumberLength: 8,
      delay: 5000,
      confidence: 87
    }
  }

  addToLog(rec) {
    this.logs.push(rec)
  }

  changePlateStatusById({ id, isAllowed }) {
    console.time('Change status')
    this.whiteListPlates[this.whiteListPlates.findIndex(v => v.id === id)].isAllowed = isAllowed;
    console.timeEnd('Change status')
  }

  addPlate(plate) {
    console.time('ADD PLATE')
    if (!this.whiteListPlates.find(v => v.plate === plate)) {
      this.whiteListPlates.push({ id: ++this.index, plate })
    }
    console.timeEnd('ADD PLATE')
    console.log()
  }

  removePlateByNumber(plate) {
    console.log()
    console.time('Plate removing')
    this.whiteListPlates = this.whiteListPlates.filter(p => p.plate !== plate)
    console.timeEnd('Plate removing')
  }

  get plate() {
    return this.whiteListPlates
  }

  changeConfig({ minNumberLength, delay, confidence }) {
    this.config = { minNumberLength, delay, confidence };
  }

}

// module.exports.createInstance = () => new TemporaryStorage();

module.exports = TemporaryStorage
