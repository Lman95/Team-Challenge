'use strict';

describe('network sign up page', function(){

    it('should throw an error on invalid email', function(){
        browser.get('http://localhost:8000/');
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('test');
        password2.sendKeys('notthesameastheother');
        var hint = element(by.css('.help-block'));
        expect(hint.isPresent()).toEqual(false);
    });

    it('should not throw an error on valid email', function(){
        browser.get('http://localhost:8000/');
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('same');
        password2.sendKeys('same');
        var hint = element(by.css('.help-block'));
        expect(hint.isPresent()).toEqual(true);
    });

    it('form should be invalid on invalid email', function(){
        browser.get('http://localhost:8000/');
        var emailinput = element(by.id('Email'));
        email.sendKeys('missingat');
        expect(hasClass(element(by.name('newForm')), 'ng-invalid')).toBe(true);
    });

    it('form should be valid on valid email', function(){
        browser.get('http://localhost:8000/');
        var emailinput = element(by.id('Email'));
        email.sendKeys('thereisan@here');
        expect(hasClass(element(by.name('newForm')), 'ng-invalid')).toBe(false);
    });


})



