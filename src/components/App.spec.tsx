import 'vitest-fetch-mock';
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import { screen, render, cleanup } from '@testing-library/react'
import CandidatesView from './App'

const data = [{
    id: 'PPAF8OJP',
    name: 'Henderson Satterfield',
    motto: 'Velit nobis culpa deleniti eos reprehenderit in nisi et qui.',
    lair_location: '42063 Lonnie Pike, South Chanelleton, 75462-8477',
    lair_secret_password: 'quantify array',
    classname: 'Rogue',
    race: 'Dwarf',
    level: 7,
    height: 142, // cm
    image: 'http://localhost:3003/images/Dwarf.png',
    dob: '1904-12-11',
}]

describe('candidates table', () => {
    beforeEach(() => {
        fetchMock.doMock();
        fetchMock.mockResponseOnce(JSON.stringify(data));
    })

    afterEach(() => {
        cleanup();
    })

    it('should load the candidates table and show the character details', async () => {
        render(<CandidatesView />)
        const row = await screen.findByTestId(`candidate-row-${data[0].id}`)
        expect(row).toHaveTextContent('Henderson Satterfield');
        expect(row).toHaveTextContent('Dwarf')
        expect(row).toHaveTextContent('Rogue')
    })
})