import {expect, test} from '@playwright/test'


test('drag and drop to iframe',async({page})=>{

    //draganddrop first method
    
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    const frame=page.frameLocator('[rel-title="Photo Manager"] iframe')

    await frame.locator('li',{hasText:"High Tatras 3"}).dragTo(frame.locator('#trash'))

    //draganddrop second menthod

    await frame.locator('li',{hasText:"High Tatras 2"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 3","High Tatras 2"])


})