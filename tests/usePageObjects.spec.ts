import {expect, test} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'


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