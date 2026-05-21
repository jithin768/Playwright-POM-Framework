import {expect, test} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datepickerPage'


test.beforeEach('Before Each for URL', async({page})=>{
    await page.goto('http://localhost:4200/pages/iot-dashboard')
    

})

test('navigate to form page', async({page})=>{

    const navigateTo=new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePicketPage()
    await navigateTo.SmartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooTipPage()
})

test('Form layout page', async({page})=>{
    const navigateTo=new NavigationPage(page)
    const formLayoutsPage=new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('jithin@test.com','1234','option 1')
    await formLayoutsPage.submitUsingInlineFormWithCredentialsANDCheckbox('jithin','test@test.com',false)

})

test('date picket test', async({page})=>{
    const navigateTo=new NavigationPage(page)
    const datePickerPage=new DatePickerPage(page)

    await navigateTo.datePicketPage()
    await datePickerPage.datePickeingFromCommonDatePicker(10)


})