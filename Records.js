/** Класс-запись */
class Record {
    constructor(title, description) {
        this.title = title; // Заголовок
        this.description = description; // Описание
        this.creationTime = new Date().toISOString(); // Время создания
        this.modificationTime = new Date().toISOString(); // Время изменения
        this.isCompleted = false; // Маркер выполнения
    }
}

/** Класс для работы с записями */
class RecordManager {
    constructor() {
        this.recordsKey = 'Records';
        this.loadRecords();
    }

    loadRecords() {
        const recordsJSON = localStorage.getItem(this.recordsKey);
        this.records = recordsJSON ? JSON.parse(recordsJSON) : {};
    }

    saveRecords() {
        localStorage.setItem(this.recordsKey, JSON.stringify(this.records));
    }

    addRecord(title, description) {
        const record = new Record(title, description);
        this.records[title] = record;
        this.saveRecords();
    }

    removeRecord(title) {
        delete this.records[title];
        this.saveRecords();
    }

    getAllRecords() {
        return Object.values(this.records);
    }

    getRecord(title) {
        return this.records[title];
    }

    changeRecord(title, newDescription, isCompleted) {
        const record = this.records[title];
        if (record) {
            record.description = newDescription;
            record.isCompleted = isCompleted;
            record.modificationTime = new Date().toISOString();
            this.saveRecords();
        }
    }
}

// Пример использования
const manager = new RecordManager();
manager.addRecord("Спорт", "Утренняя пробежка");
manager.addRecord("Бизнес-встреча", "Обсуждение новых векторов развития фирмы");
manager.addRecord("Друзья", "Идём с лучшим другом на футбольный матч");

console.log('Список записей: ', manager.getAllRecords());

const meetingRecord = manager.getRecord('Бизнес-встреча');
console.log('Запись о бизнес-встрече: ', meetingRecord);

manager.changeRecord('Спорт', 'Утренняя пробежка и отжимания', true);
console.log('Обновлённая запись о спорте: ', manager.getRecord('Спорт'));

manager.removeRecord('Друзья');
console.log('Обновлённый список записей (удалена последняя): ', manager.getAllRecords());