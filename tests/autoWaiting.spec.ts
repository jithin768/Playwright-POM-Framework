import {expect, test} from '@playwright/test'

test.beforeEach('Before Each for URL', async({page})=>{
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()

})

test('Auto waiting Section', async({page})=>{

    const successButton=page.locator('.bg-success')
    //await successButton.click()

    /* const buttontext=await successButton.textContent()
    expect(buttontext).toEqual('Data loaded with AJAX get request.') */

    await successButton.waitFor({state:'attached'})
    const buttontext1=await successButton.allTextContents()
    await expect(buttontext1).toContain('Data loaded with AJAX get request.')

})
test('Auto waiting', async({page})=>{

    const successButton=page.locator('.bg-success')
    //__wait for element
    //await page.waitForSelector('.bg-success')

    //Wait for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //Wait for network calls to be completed
    await page.waitForLoadState('networkidle')


    const buttontext1=await successButton.allTextContents()
    await expect(buttontext1).toContain('Data loaded with AJAX get request.')
})


test('Timeouts', async({page})=>{
    //test.setTimeout(2000)
    test.slow()
    const successButton=page.locator('.bg-success')
    await successButton.click({timeout:16000})

})


