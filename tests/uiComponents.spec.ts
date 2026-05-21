import {expect, test} from '@playwright/test'
import { using } from 'rxjs'
import { delay } from 'rxjs-compat/operator/delay'
import { filter } from 'rxjs-compat/operator/filter'
import { timeout } from 'rxjs-compat/operator/timeout'
import { ExtraComponentsComponent } from '../src/app/pages/extra-components/extra-components.component'


test.beforeEach('Before Each for URL', async({page})=>{
    await page.goto('http://localhost:4200/pages/iot-dashboard')
    

})

test('input fields',async({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    const usingtheGridForm=page.locator('nb-card').filter({hasText:'Using the Grid'}).getByRole('textbox',{name:'Email'})
    await usingtheGridForm.fill('test@test.com')
    await usingtheGridForm.clear()
    await usingtheGridForm.pressSequentially("test@test.com",{delay:500})

    //Generic Assertion
    const inputValue=await usingtheGridForm.inputValue()
    expect(inputValue).toEqual("test@test.com")

    //Locator Assertion
    await expect(usingtheGridForm).toHaveValue("test@test.com")
})

test('Radiobuttons test', async({page})=>{

    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    const usingtheGridForm=page.locator('nb-card').filter({hasText:'Using the Grid'})
    await usingtheGridForm.getByRole('radio',{name:'Option 1'}).check({force:true})

    const radioStatus=await usingtheGridForm.getByRole('radio',{name:"Option 1"}).isChecked()
    expect(radioStatus).toBeTruthy()
    await expect(usingtheGridForm.getByRole('radio',{name:"Option 1"})).toBeChecked()

    await usingtheGridForm.getByLabel('Option 2').check({force:true})
    await expect(usingtheGridForm.getByRole('radio',{name:"Option 1"})).not.toBeChecked
    await expect(usingtheGridForm.getByRole('radio',{name:"Option 2"})).toBeChecked()
})


test('Checkboxes test', async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

     //const checkboxsection=page.getByRole('checkbox')
    await page.getByRole('checkbox', {name:'Hide on click'}).uncheck({force:true})
    await page.getByRole('checkbox', {name:'Prevent arising of duplicate toast'}).check({force:true})
    
    const allBoxes=page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force:true})
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('List and dropdowns', async({page})=>{

    const listitem= page.locator('ngx-header nb-select')

    await listitem.click()

    const listItem=page.locator('nb-option-list nb-option')
    await expect(listItem).toHaveText(["Light","Dark","Cosmic","Corporate"])
    await listItem.filter({hasText:"Cosmic"}).click()

})

test('Toottip', async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const TooltipSection=page.locator('nb-card',{hasText:'Tooltip Placements'})
    await TooltipSection.getByRole('button', {name:'Top'}).hover()

    const tooltip=await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})


test('Dialog test', async({page})=>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog =>{
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr',{hasText:'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com")
})


test('Web Table test', async({page})=>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    const targetRow=page.getByRole('row',{name:"twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('45')
    await page.locator('.nb-checkmark').click()

    //2 get the row based on the value in the specific column

    await page.locator(".ng2-smart-pagination").getByText('2').click()
    const targetRowByID=page.getByRole('row',{name:'11'}).filter({has:page.locator('td').nth(1).getByText('11')})
    await targetRowByID.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@testjithin.com')
    await page.locator('.nb-checkmark').click()
    await expect(page.locator('td').nth(5)).toHaveText("test@testjithin.com")

    //3 test filter of the table

    
})

test('Date Picker test', async({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInput= page.getByPlaceholder("Form Picker")
    await calendarInput.click()

    await page.locator('[class="day-cell ng-star-inserted"]').getByText("12",{exact:true}).click()
    await expect(calendarInput).toHaveValue('May 12, 2026')

})


test('Dynamic Date Picker test', async({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInput= page.getByPlaceholder("Form Picker")
    await calendarInput.click()

    let date =new Date()
    date.setDate(date.getDate()+14)
    const expectedDate=date.getDate().toString()
    const expectedMonthShot=date.toLocaleDateString('En-us', {month:'short'})
    const expectedMonthLong=date.toLocaleDateString('En-us', {month:'long'})
    const expectedYear=date.getFullYear()
    const dateToAssert=`${expectedMonthShot} ${expectedDate}, ${expectedYear}`

    let calendarMonthYear=await page.locator('nb-calendar-view-mode').textContent()
    const ExpectedMonthYear=` ${expectedMonthLong} ${expectedYear} `

    while(!calendarMonthYear?.includes(ExpectedMonthYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthYear=await page.locator('nb-calendar-view-mode').textContent()
    }


    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact:true}).click()
    await expect(calendarInput).toHaveValue(dateToAssert)

})

test('Sliders', async({page})=>{

    const tempatureGauge= page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempatureGauge.evaluate(node =>{
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy','232.630')
    })
    await tempatureGauge.click()
})
