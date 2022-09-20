require('dotenv').config()
const { chromium, devices } = require('playwright')
const { LoginPage } = require('./models/login')
const { MarksPage } = require('./models/marks')
const { ImgBox } = require('./models/imgbox')
const path = require('path')
// const fs = require('fs')

/**
 * Часть пути для сохранения результатов, вида "2022-12/2022-12-31T12-34-56"
 */
function currentFilename () {
  const dt = new Date().toISOString().substring(0, 19).replaceAll(':', '-')
  return path.join(process.env.RESULT_DIR, dt.substr(0, 7), dt)
}

async function saveMarks () {
  // const storageState = path.join(process.env.RESULT_DIR, 'state.json')
  const contextOptions = {
    ...devices['Desktop Edge'],
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow'
  }
  // if (fs.existsSync(storageState)) {
  //   contextOptions.storageState = storageState
  // }

  // const browser = await chromium.launch({ headless: false })
  const browser = await chromium.launch()
  const context = await browser.newContext(contextOptions)
  const page1 = await context.newPage()

  const loginPage = new LoginPage(page1)
  await loginPage.navigate()
  const page2 = await loginPage.submit(process.env.CHILDREN_LOGIN, process.env.CHILDREN_PASSWORD)

  const current = currentFilename()

  // в пятницу и на выходных нужны задания на следующую неделю
  const goToNext = [5, 6, 0].includes(new Date().getDay())

  const marksPage = new MarksPage(page2)
  await marksPage.saveWeek(current + '-week.png', goToNext)
  await marksPage.savePeriod(current + '-period.png')

  // Save storage state into the file.
  // await context.storageState({ path: storageState })
  // await context.storageState({ path: current + '-state.json' })

  const imgBoxLogin = process.env.IMGBOX_LOGIN
  if (imgBoxLogin) {
    const page3 = await context.newPage()
    const imgBox = new ImgBox(page3)
    await imgBox.login(imgBoxLogin, process.env.IMGBOX_PASSWORD)
    const link = await imgBox.upload(current + '-week.png', process.env.IMGBOX_GALLERY)
    console.log('weekImage', link)
    await imgBox.logout()
  }

  await context.close()
  await browser.close()
}

saveMarks()
