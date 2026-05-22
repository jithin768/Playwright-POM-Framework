import {expect, test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'



test.beforeEach('Before Each for URL', async({page})=>{
    await page.goto('http://localhost:4200/pages/iot-dashboard')
    

})

test('navigate to form page', async({page})=>{

    const pm=new PageManager(page)

    
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePicketPage()
    await pm.navigateTo().SmartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooTipPage()
})

test('Form layout page', async({page})=>{
    const pm=new PageManager(page)
   

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('jithin@test.com','1234','option 1')
    await pm.onFormLayoutsPage().submitUsingInlineFormWithCredentialsANDCheckbox('jithin','test@test.com',true)

})

test('date picket test', async({page})=>{
    const pm=new PageManager(page)

    await pm.navigateTo().datePicketPage()
    await pm.onDatepicketPage().datePickeingFromCommonDatePicker(10)


})