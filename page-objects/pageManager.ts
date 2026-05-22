import {Page} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datepickerPage'

export class PageManager {
  readonly page: Page
  readonly navigationPage: NavigationPage
  readonly formLayoutsPage: FormLayoutsPage
  readonly datePickerPage: DatePickerPage

  constructor(page: Page) {
    this.page = page
    this.navigationPage = new NavigationPage(page)
    this.formLayoutsPage = new FormLayoutsPage(page)
    this.datePickerPage = new DatePickerPage(page)
  }

  navigateTo(){
    return this.navigationPage
  }

  onFormLayoutsPage(){
    return this.formLayoutsPage
  }

  onDatepicketPage(){
    return this.datePickerPage
  }


}
