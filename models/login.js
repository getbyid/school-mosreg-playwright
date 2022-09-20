class LoginPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor (page) {
    this.page = page
    this.form = page.locator('tile-carousel .school__login-form')
    this.btnPrev = page.locator('.b-carousel-pin-btn__prev')
  }

  async navigate () {
    await this.page.goto('https://uslugi.mosreg.ru/')

    for (let attempt = 1; attempt <= 10; attempt += 1) {
      const box = await this.form.boundingBox()
      console.log('attempt', attempt, box)
      if (box.x > 0) break

      await this.btnPrev.click()
      await this.page.waitForTimeout(2000)
    }
  }

  async submit (login, password) {
    await this.form.locator('.school__login-form_input[name="login"]').fill(login)
    await this.form.locator('.school__login-form_input[name="password"]').fill(password)
    await this.form.locator('.school__login-form_button').click()
    await this.page.waitForTimeout(2000)

    // await this.form.locator('button:has-text("Перейти")').click()
    // await this.form.locator('.school__login-form_button').click()

    // Click button:has-text("Перейти")
    const [nextPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator('button:has-text("Перейти")').click()
    ])

    await this.page.waitForTimeout(2000)
    console.log('nextPage', nextPage.url())
    return nextPage
  }

  async logout () {
    // Click button:has-text("Выйти")
    await this.page.locator('button:has-text("Выйти")').click()
  }
}

module.exports = { LoginPage }
