import {Page} from '@playwright/test'


export class NavigationPage{

    readonly page:Page

    constructor(page:Page){
        this.page=page
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datePicketPage(){
         await this.selectGroupMenuItem('Forms')
         await this.page.getByText('Datepicker').click()

    }

    async SmartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    } 

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }
    async tooTipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(GroupItemTitle:string){
        const groupMenuItemTitle=this.page.getByTitle(GroupItemTitle)
        const expandState=await groupMenuItemTitle.getAttribute('aria-expanded')

        if(expandState=='false')
            await groupMenuItemTitle.click()

    }

}

