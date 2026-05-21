import {Page,expect} from '@playwright/test'

export class DatePickerPage{

    private readonly page:Page

    constructor(page:Page){
        this.page=page
    }

    async datePickeingFromCommonDatePicker (numberofDaysFromToday:number){

        const calendarInput= this.page.getByPlaceholder("Form Picker")
            await calendarInput.click()
        
            let date =new Date()
            date.setDate(date.getDate()+numberofDaysFromToday)
            const expectedDate=date.getDate().toString()
            const expectedMonthShot=date.toLocaleDateString('En-us', {month:'short'})
            const expectedMonthLong=date.toLocaleDateString('En-us', {month:'long'})
            const expectedYear=date.getFullYear()
            const dateToAssert=`${expectedMonthShot} ${expectedDate}, ${expectedYear}`
        
            let calendarMonthYear=await this.page.locator('nb-calendar-view-mode').textContent()
            const ExpectedMonthYear=` ${expectedMonthLong} ${expectedYear} `
        
            while(!calendarMonthYear?.includes(ExpectedMonthYear)){
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
                calendarMonthYear=await this.page.locator('nb-calendar-view-mode').textContent()
            }
        
        
            await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact:true}).click()
            await expect(calendarInput).toHaveValue(dateToAssert)

    }



}