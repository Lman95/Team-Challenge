'use strict';

describe('network sign up page', function(){
    beforeEach(function() {
        browser.get('http://localhost:8000/');
    });
    
    it('should be invalid on invalid email', function(){
        var email = element(by.id('Email'));
        email.sendKeys('missingat');
        expect(email.getAttribute('class')).toMatch('ng-invalid');
        expect(element(by.name('newForm')).getAttribute('class')).toMatch('ng-invalid');
        expect(element(by.model('submitting')).getAttribute('disabled')).toBe('true');
    });

    it('should be valid on valid email', function(){
        var email = element(by.id('Email'));
        email.sendKeys('thereisan@here.com');
        expect(email.getAttribute('class')).toMatch('ng-valid');
        expect(element(by.name('newForm')).getAttribute('class')).toMatch('ng-valid');
    });

    it('should be invalid on dirty and empty last name', function(){
        var name = element(by.id('lastName'));
        name.sendKeys('validnamehere');
        name.clear(); // clears name
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

    it('should be valid birthday on right format, right age', function(){
        var birth = element(by.id('bDay'));
        birth.sendKeys('01/01/1996');
        expect(birth.getAttribute('class')).toMatch('ng-valid');
    });

    it('should be invalid birthday age under 16', function(){
        var birth = element(by.id('bDay'));
        birth.sendKeys('01/01/2000');
        expect(birth.getAttribute('class')).toMatch('ng-invalid');
    });

    it('should be invalid birthday on wrong format', function(){
        var birth = element(by.id('bDay'));
        birth.sendKeys('hahahwrongformathere');
        expect(birth.getAttribute('class')).toMatch('ng-invalid');
        expect(element(by.model('submitting')).getAttribute('disabled')).toBe('true');
    });

    it('should be invalid on nonmatching pw', function(){
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('test');
        password2.sendKeys('notthesameastheother');
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-invalid');
        expect(element(by.name('newForm')).getAttribute('class')).toMatch('ng-invalid');
        expect(element(by.model('submitting')).getAttribute('disabled')).toBe('true');

    });

    it('should be valid on matching pw', function(){
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('same');
        password2.sendKeys('same');
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-valid');
    });

    it('should be invalid when nothing entered in password', function(){
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-invalid');
    });

    it('should be invalid when password dirty, empty', function(){
        var password1 = element(by.id('psw'));
        var password = element(by.id('psw2'));
        password.sendKeys('test');
        password1.sendKeys('test');
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-valid');
        password.clear();
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-invalid');
    });

    it('should disable register button when all pristine', function(){
        expect(element(by.model('submitting')).getAttribute('disabled')).toBe('true');
    });

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
        expect(element(by.name('newForm')).getAttribute('class')).toMatch('ng-pristine');
        expect(element(by.model('submitting')).isEnabled()).toBe(false);
    });
})



