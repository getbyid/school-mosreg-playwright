require('dotenv').config()
const { chromium, devices } = require('playwright')
const { LoginPage } = require('./models/login')
const { MarksPage } = require('./models/marks')
const { ImgBox } = require('./models/imgbox')
const { currentFilenames } = require('./models/filenames')
// const fs = require('fs')

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

  const names = currentFilenames()
  const marksPage = new MarksPage(page2)
  await marksPage.saveWeek(names.week, names.next)
  await marksPage.savePeriod(names.period)

  // Save storage state into the file.
  // await context.storageState({ path: storageState })
  // await context.storageState({ path: current + '-state.json' })

  const imgBoxLogin = process.env.IMGBOX_LOGIN
  if (imgBoxLogin) {
    const page3 = await context.newPage()
    const imgBox = new ImgBox(page3)
    await imgBox.login(imgBoxLogin, process.env.IMGBOX_PASSWORD)
    const link = await imgBox.upload(names.next || names.week, process.env.IMGBOX_GALLERY)
    console.log('weekImage', link)
    await imgBox.logout()
  }

  await context.close()
  await browser.close()
}

saveMarks()
