const path = require('path')

/**
 * @typedef {Object} Filenames Справочник имен файлов
 * @property {string} week Расписание и оценки на текущей неделе
 * @property {string} next Расписание на следующую неделю
 * @property {string} period Оценки по всем предметам за период
 */

/**
 * Имена файлов для сохранения снимков на текущее время, вида "2022-12/2022-12-31T12-34-56-week.png"
 * @returns {Filenames}
 */
function currentFilenames () {
  const now = new Date()
  const dt = now.toISOString().substring(0, 19).replaceAll(':', '-')
  const current = path.join(process.env.RESULT_DIR, dt.substr(0, 7), dt)
  const names = {
    week: current + '-week.png',
    period: current + '-period.png'
  }

  // в пятницу и на выходных нужны задания на следующую неделю
  if ([5, 6, 0].includes(now.getDay())) {
    names.next = current + '-next.png'
  }

  return names
}

module.exports = { currentFilenames }
