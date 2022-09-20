/**
 * Выгрузка изображения на сервис imgbox.com
 */
class ImgBox {
  /**
   * @param {import('playwright').Page} page
   */
  constructor (page) {
    this.page = page
    this.base = 'https://imgbox.com'
  }

  async login (login, password) {
    await this.page.goto(this.base + '/')
    await this.page.locator('text=Login').click()
    await this.page.waitForURL(this.base + '/login')

    await this.page.locator('#user_login').fill(login)
    await this.page.locator('#user_password').fill(password)
    await this.page.locator('input:has-text("Login")').click()
    await this.page.waitForURL(this.base + '/')
  }

  async upload (fileName, gallery) {
    const fileInput = this.page.locator('#upload-form .no-files-selected input[type="file"]')
    // await fileInput.click()
    await fileInput.setInputFiles(fileName)

    // выбрать галерею по названию из списка
    await this.page.locator('#existing-gallery-option-btn .filter-option').click()
    await this.page.locator(`#select-search-list li[data-title="${gallery}"] a`).click()

    await this.page.locator('#fake-submit-button').click()
    const imageLink = await this.page.locator('#code-link-thumb').inputValue()
    return imageLink
  }

  async logout () {
    await this.page.goto(this.base + '/logout')
  }
}

module.exports = { ImgBox }
