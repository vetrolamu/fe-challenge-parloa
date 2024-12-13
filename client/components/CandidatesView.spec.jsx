import React from "react"
import '@testing-library/jest-dom'
import { render, screen, getByText, cleanup, getByLabelText } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock'
import CandidatesView from './CandidatesView';

const data = [{
    id: 'PPAF8OJP',
    name: 'Henderson Satterfield',
    motto: 'Velit nobis culpa deleniti eos reprehenderit in nisi et qui.',
    lair_location: '42063 Lonnie Pike, South Chanelleton, 75462-8477',
    lair_secret_password: 'quantify array',
    classname: 'Rogue',
    race: 'Dwarf',
    level: 7,
    height: "4'3",
    image: 'http://localhost:3003/images/Dwarf.png',
    dob: '1904-12-11',
    strength: 14,
    dexterity: 14,
    constitution: 15,
    intelligence: 8,
    wisdom: 14,
    charisma: 11
}]

describe('candidates table', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
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