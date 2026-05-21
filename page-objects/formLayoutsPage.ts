import {Page} from '@playwright/test'


export class FormLayoutsPage{

    private readonly page:Page

    constructor(page:Page){
        this.page=page
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email:string,password:string,optionText:string){
        const usingtheGridForm=this.page.locator('nb-card').filter({hasText:'Using the Grid'})
            await usingtheGridForm.getByRole('textbox',{name:'Email'}).fill(email)
            await usingtheGridForm.getByRole('textbox',{name:'Password'}).fill(password)
            await usingtheGridForm.getByRole('radio',{name:optionText}).check({force:true}) 
            await usingtheGridForm.getByRole('button').click()

    }
    /**
     * This method will fill out inline form with the user details
     * @param name - should be first name and last name
     * @param email - valid user email
     * @param rememberMe - true or false
     */

    async submitUsingInlineFormWithCredentialsANDCheckbox(name:string,email:string,rememberMe:boolean){
        const usingtheInlineForm=this.page.locator('nb-card').filter({hasText:'Inline form'})
        await usingtheInlineForm.getByRole('textbox',{name:'Jane Doe'}).fill(name)
        await usingtheInlineForm.getByRole('textbox',{name:'Email'}).fill(email)

        if(rememberMe)
            await usingtheInlineForm.getByRole('checkbox').check({force:true}) 
            await usingtheInlineForm.getByRole('button').click()
    }

}

