'use strict';

describe('network sign up page', function(){
    beforeEach(function() {
        browser.get('http://localhost:8000/');
    });
    it('should be invalid on nonmatching pw', function(){
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('test');
        password2.sendKeys('notthesameastheother');
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-invalid');
    });

    it('should be valid on matching pw', function(){
        var password1 = element(by.id('psw'));
        var password2 = element(by.id('psw2'));
        password1.sendKeys('same');
        password2.sendKeys('same');
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-valid');
    });

    it('should be invalid on invalid email', function(){
        var email = element(by.id('Email'));
        email.sendKeys('missingat');
        expect(element(by.name('newForm')).getAttribute('class')).toMatch('ng-invalid');
    });

    it('should be valid on valid email', function(){
        var email = element(by.id('Email'));
        email.sendKeys('thereisan@here.com');
        expect(element(by.name('newForm')).getAttribute('class')).toMatch('ng-valid');
    });

    it('should be invalid when nothing entered', function(){
        expect(element(by.id('psw2')).getAttribute('class')).toMatch('ng-invalid');
    });



})



