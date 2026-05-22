import {expect, test} from '@playwright/test'
import { filter } from 'rxjs-compat/operator/filter'


test.beforeEach('Before Each for URL', async({page})=>{
    await page.goto('http://localhost:4200/pages/iot-dashboard')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})

test.describe.skip('Forms Test',()=>{

    test('Test Forms Layout', async({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    })

    test('Test Datepicker Section', async({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    })


}) 

test('User facing locators', async({page})=>{
    // await page.getByText('Forms').click()
    // await page.getByText('Form Layouts').click()
    await page.getByRole('textbox',{name:'Email'}).first().click()

    await page.getByLabel('Email').first().click()
})

test('child Elements', async({page})=>{
    // await page.getByText('Forms').click()
    // await page.getByText('Form Layouts').click()
    await page.locator('nb-card nb-radio :text-is("Option 1") ').click()

    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button',{name:'Sign in'}).first().click()
})

test('Parent Elements', async({page})=>{
    // await page.getByText('Forms').click()
    // await page.getByText('Form Layouts').click()
    await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:'Email'}).click()
    await page.locator('nb-card').filter({hasText:"Using the Grid"}).getByRole('textbox',{name:'Password'}).click()

    await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).click()
    await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox',{name:'password'}).click()
})

test('Reusing the Elements', async({page})=>{
     
    const basicForm = page.locator('nb-card',{hasText:"Basic form"})
    const EmailField= basicForm.getByRole('textbox',{name:'Email'})
    await EmailField.fill("test@test.com")
    await basicForm.getByRole('textbox',{name:'Password'}).fill("test")
    await basicForm.locator("nb-checkbox").click()
    await basicForm.getByRole("button",{name:'submit'}).click()

    await expect(EmailField).toHaveValue("test@test.com")

})

test('Extracting Value from WebElements', async({page})=>{

    //extract value from button
    const basicForm = page.locator('nb-card',{hasText:"Basic form"})
    const buttonText=await basicForm.getByRole("button",{name:'submit'}).textContent()

    await expect(buttonText).toEqual('Submit')


    //Extract value from all values -> select a value

    const UsingTheGrid=page.locator('nb-card',{hasText:"Using the Grid"})
    const UsingTheGridradio=await UsingTheGrid.locator('nb-radio').allTextContents()

    await expect(UsingTheGridradio).toContain('Option 1')

    //get value from Input value
    const EmailField=basicForm.getByRole('textbox',{name:'Email'})
    await EmailField.fill("test@test.com")
    const EmailvalueText=await basicForm.getByRole("textbox",{name:'Email'}).inputValue()
    expect(EmailvalueText).toEqual('test@test.com')

    //Placeholder value Checking

    const placeHoldervalue=await EmailField.getAttribute('placeholder')
    expect(placeHoldervalue).toEqual('Email')
})


test('Assertions', async({page})=>{

    //general Assrtions

    const value=5
    expect(value).toEqual(5)

    //Locator Assertions
    const basicForm = page.locator('nb-card',{hasText:"Basic form"}).getByRole("button",{name:'SUBMIT'})
    await expect(basicForm).toContainText('Submit')

    //Soft Assertions
    await expect.soft(basicForm).toContainText('Submit')
    await basicForm.click()

})





