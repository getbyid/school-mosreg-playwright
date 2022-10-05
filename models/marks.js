class MarksPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor (page) {
    this.page = page
  }

  async saveWeek (path, nextPath = null) {
    // Click text=Успеваемость >> nth=0
    await this.page.locator('text=Успеваемость').first().click()
    await this.page.waitForTimeout(2000)
    console.log('URL', this.page.url())
    await this.page.locator('#diarydays').screenshot({ path })

    if (nextPath) {
      await this.page.locator('.player .pF a').click()
      await this.page.waitForTimeout(2000)
      console.log('URL', this.page.url())
      await this.page.locator('#diarydays').screenshot({ path: nextPath })
    }
  }

  async savePeriod (path) {
    // Click text=Успеваемость >> nth=0
    await this.page.locator('text=Успеваемость').first().click()

    await this.page.locator('#TabPeriod').click()
    await this.page.waitForTimeout(2000)
    console.log('URL', this.page.url())

    await this.page.locator('#journal').screenshot({ path })
  }
}

module.exports = { MarksPage }
