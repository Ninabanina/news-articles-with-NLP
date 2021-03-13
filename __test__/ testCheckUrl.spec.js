import { checkUrl } from '../src/client/js/checkUrl'

describe('testing URL Checking function', () => {
    test('https://www.udacity.com/ is a valid url', () => {
        expect(checkUrl('https://www.udacity.com/')).toBeTruthy();
    })
})

describe('testing URL Checking function', () => {
    test('udacity.com/ is a valid url', () => {
        expect(checkUrl('udacity.com/')).toBeTruthy();
    })
})

describe('testing URL Checking function', () => {
    test('testinghttps://www.udacity.com/ is not a valid url', () => {
        expect(checkUrl('testinghttps://www.udacity.com/')).toBeFalsy();
    })
})