'use strict';

describe('network sign up page', function(){
    beforeEach(function() {
        browser.get('http://localhost:8000/'); // loads the page before each
    });
    
    // puts invalid email in the email box and checks to see if its valid
    it('should be invalid on invalid email', function(){
        var email = element(by.id('Email'));
        email.sendKeys('missingat'); // types in the wrong format for an email,
        expect(email.getAttribute('class')).toMatch('ng-invalid'); // checks if it is invalid
        expect(element(by.name('newForm')).getAttribute('class')).toMatch('ng-invalid'); // checks if the form is invalid
        expect(element(by.model('submitting')).getAttribute('disabled')).toBe('true'); // checks if the button is disabled
    });


    // puts email in the email box, and then checks to see if its valid
    it('should be valid on valid email', function(){
        var email = element(by.id('Email')); 
        email.sendKeys('thereisan@here.com'); // correct email format is typed
        expect(email.getAttribute('class')).toMatch('ng-valid'); // checks if it is valid
    });

    // fills form and then clears name, checks if invalid and button disabled
    it('should be invalid on dirty and empty last name', function(){
        var name = element(by.id('lastName')); 
        name.sendKeys('validnamehere');  // sends a valid last name
        name.clear(); // then clears name
        var fname = element(by.id('fName'));
        fname.sendKeys('random');
        var email = element(by.id('Email'));
        email.sendKeys('random@email.com');
        var birth = element(by.id('bDay'));
        birth.sendKeys('01/01/1990');
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('same');
        password2.sendKeys('same');
        expect(name.getAttribute('class')).toMatch('ng-invalid');
        expect(element(by.name('newForm')).getAttribute('class')).toMatch('ng-invalid');
        expect(element(by.model('submitting')).getAttribute('disabled')).toBe('true');
    });

    // puts a correctly formatted birthday into the birthday box, checks to see if valid
    it('should be valid birthday on right format, right age', function(){
        var birth = element(by.id('bDay'));
        birth.sendKeys('01/01/1996');
        expect(birth.getAttribute('class')).toMatch('ng-valid');
    });

    // puts an properly formatted birthday into the birthday box under age 16, checks to see if valid
    it('should be invalid birthday age under 16', function(){
        var birth = element(by.id('bDay'));
        birth.sendKeys('01/01/2000');
        expect(birth.getAttribute('class')).toMatch('ng-invalid');
    });

    // puts an improperly formatted birthdya into the birthday box, checks to see if invalid
    it('should be invalid birthday on wrong format', function(){
        var birth = element(by.id('bDay'));
        birth.sendKeys('hahahwrongformathere');
        expect(birth.getAttribute('class')).toMatch('ng-invalid');
        expect(element(by.model('submitting')).getAttribute('disabled')).toBe('true');
    });

    // puts two unmatching passwords into the password boxes, checks if invalid and button disabled
    it('should be invalid on nonmatching pw', function(){
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('test');
        password2.sendKeys('notthesameastheother');
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-invalid');
        expect(element(by.name('newForm')).getAttribute('class')).toMatch('ng-invalid');
        expect(element(by.model('submitting')).getAttribute('disabled')).toBe('true');

    });

    // checks if matching passwords are valid
    it('should be valid on matching pw', function(){
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('same');
        password2.sendKeys('same');
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-valid');
    });

    // checks if not valid when nothing entered
    it('should be invalid when nothing entered in password', function(){
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-invalid');
    });

    // checks if invalid when matching, then empty.
    it('should be invalid when password dirty, empty', function(){
        var password1 = element(by.id('psw'));
        var password = element(by.id('psw2'));
        password.sendKeys('test');
        password1.sendKeys('test');
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-valid');
        password.clear();
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-invalid');
    });

    // checks if button disabled when nothing is entered
    it('should disable register button when all pristine', function(){
        expect(element(by.model('submitting')).getAttribute('disabled')).toBe('true');
    });

    // checks if submit button is enabled on completed form
    it('should allow submit when all valid', function() {
        var fname = element(by.id('fName'));
        fname.sendKeys('random');
        var email = element(by.id('Email'));
        email.sendKeys('random@email.com');
        var birth = element(by.id('bDay'));
        birth.sendKeys('01/01/1990');
        expect(birth.getAttribute('class')).toMatch('ng-valid');
        var name = element(by.id('lastName'));
        name.sendKeys('validnamehere');
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('test');
        password2.sendKeys('test');
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-valid');
        expect(element(by.model('submitting')).isEnabled()).toBe(true);
    });

    // checks if the reset button works and resets all help-blocks, all to pristine,untouched
    it('should have functionality for reset button', function() {
        var rest = element(by.id('resetButton'));
        var fname = element(by.id('fName'));
        fname.sendKeys('random');
        var email = element(by.id('Email'));
        email.sendKeys('random@email.com');
        var birth = element(by.id('bDay'));
        birth.sendKeys('01/01/1990');
        expect(birth.getAttribute('class')).toMatch('ng-valid');
        var name = element(by.id('lastName'));
        name.sendKeys('validnamehere');
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('test');
        password2.sendKeys('test');
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-valid');
        rest.click();
        expect(email.getAttribute('class')).toMatch('ng-untouched'); // checks if all are untouched
        expect(name.getAttribute('class')).toMatch('ng-untouched');
        expect(birth.getAttribute('class')).toMatch('ng-untouched');
        expect(password2.getAttribute('class')).toMatch('ng-untouched');
        expect(password1.getAttribute('class')).toMatch('ng-untouched');
        expect(email.getAttribute('class')).toMatch('ng-pristine'); // checks if all are pristine
        expect(name.getAttribute('class')).toMatch('ng-pristine');
        expect(birth.getAttribute('class')).toMatch('ng-pristine');
        expect(password2.getAttribute('class')).toMatch('ng-pristine');
        expect(password1.getAttribute('class')).toMatch('ng-pristine');
        expect(element(by.name('newForm')).getAttribute('class')).toMatch('ng-pristine');
        expect(element(by.model('submitting')).isEnabled()).toBe(false);
    });
})



