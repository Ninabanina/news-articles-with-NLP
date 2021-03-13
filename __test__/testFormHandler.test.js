import { checkPolarity } from "../src/client/js/formHandler"

describe('testing Polarity Checking function', () => {
    test('P should be Positive', () => {
        expect(checkPolarity('P')).toBe('Positive')
    })
})

describe('testing Polarity Checking function', () => {
    test('N should be Negative', () => {
        expect(checkPolarity('N')).toBe('Negative')
    })
})

describe('testing Polarity Checking function', () => {
    test('NEU should be Neutral', () => {
        expect(checkPolarity('NEU')).toBe('Neutral')
    })
})

describe('testing Polarity Checking function', () => {
    test('except P+, P, N+, N and NEU, should be Non Sentimental', () => {
        expect(checkPolarity('undefine')).toBe('Non Sentimental')
    })
})
